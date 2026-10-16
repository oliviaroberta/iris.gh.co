const MAX_BODY_BYTES = 16 * 1024;
const UPSTREAM_TIMEOUT_MS = 12_000;

const FIELD_LIMITS = {
  fullName: 120,
  email: 254,
  whatsapp: 40,
  style: 180,
  excitement: 240,
  priority: 100,
  size: 40,
  customSize: 80,
  likelihood: 180,
};

function sendJson(res, status, body) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(status).json(body);
}

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function validatePayload(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { error: 'A valid JSON request body is required.' };
  }

  // A passive honeypot. Legitimate clients do not send this field.
  if (cleanString(input.website)) {
    return { error: 'Unable to process this submission.' };
  }

  const data = {};
  for (const [field, limit] of Object.entries(FIELD_LIMITS)) {
    data[field] = cleanString(input[field]);
    if (data[field].length > limit) {
      return { error: `${field} is too long.` };
    }
  }

  const required = ['fullName', 'email', 'style', 'excitement', 'priority', 'size', 'likelihood'];
  const missing = required.filter((field) => !data[field]);
  if (missing.length) {
    return { error: 'Please complete all required fields.', fields: missing };
  }

  if (data.fullName.length < 2) {
    return { error: 'Please enter your full name.', fields: ['fullName'] };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(data.email)) {
    return { error: 'Please enter a valid email address.', fields: ['email'] };
  }

  if (data.size === 'Other' && !data.customSize) {
    return { error: 'Please specify your jeans size.', fields: ['customSize'] };
  }

  const consent = input.consent === true || input.consent === 'true';
  if (!consent) {
    return { error: 'Marketing consent is required.', fields: ['consent'] };
  }

  return {
    data: {
      fullName: data.fullName,
      email: data.email,
      whatsappNumber: data.whatsapp,
      favouriteStyle: data.style,
      whatExcitesYou: data.excitement,
      denimPriority: data.priority,
      jeansSize: data.size,
      otherSize: data.size === 'Other' ? data.customSize : '',
      purchaseLikelihood: data.likelihood,
      marketingConsent: true,
    },
  };
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;

  if (typeof req.body === 'string') {
    if (Buffer.byteLength(req.body) > MAX_BODY_BYTES) throw new Error('BODY_TOO_LARGE');
    return JSON.parse(req.body);
  }

  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (Buffer.byteLength(raw) > MAX_BODY_BYTES) throw new Error('BODY_TOO_LARGE');
  }
  return JSON.parse(raw || '{}');
}

function isAllowedOrigin(req) {
  const configured = process.env.WAITLIST_ALLOWED_ORIGINS?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  const origin = req.headers?.origin;
  return !configured?.length || !origin || configured.includes(origin);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { success: false, error: 'Method not allowed.' });
  }

  if (!isAllowedOrigin(req)) {
    return sendJson(res, 403, { success: false, error: 'Origin not allowed.' });
  }

  const declaredLength = Number(req.headers?.['content-length'] || 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return sendJson(res, 413, { success: false, error: 'Request body is too large.' });
  }

  let input;
  try {
    input = await readBody(req);
  } catch (error) {
    const tooLarge = error.message === 'BODY_TOO_LARGE';
    return sendJson(res, tooLarge ? 413 : 400, {
      success: false,
      error: tooLarge ? 'Request body is too large.' : 'A valid JSON request body is required.',
    });
  }

  const validation = validatePayload(input);
  if (validation.error) {
    return sendJson(res, 400, { success: false, ...validation });
  }

  const upstreamUrl = process.env.GOOGLE_APPS_SCRIPT_URL?.trim();
  if (!upstreamUrl) {
    return sendJson(res, 503, {
      success: false,
      error: 'The waitlist is temporarily unavailable.',
      code: 'SERVICE_NOT_CONFIGURED',
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  let upstream;
  try {
    upstream = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validation.data),
      redirect: 'follow',
      signal: controller.signal,
    });
  } catch (error) {
    const timedOut = error.name === 'AbortError';
    return sendJson(res, timedOut ? 504 : 502, {
      success: false,
      code: timedOut ? 'UPSTREAM_TIMEOUT' : 'UPSTREAM_UNAVAILABLE',
      uncertain: timedOut,
      error: timedOut
        ? 'We could not confirm whether your response was saved. Please wait before trying again.'
        : 'We could not reach the waitlist service. Please try again in a moment.',
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!upstream.ok) {
    return sendJson(res, 502, {
      success: false,
      code: 'UPSTREAM_ERROR',
      error: 'The waitlist service could not save your response.',
    });
  }

  let result;
  try {
    result = await upstream.json();
  } catch {
    return sendJson(res, 502, {
      success: false,
      code: 'UNEXPECTED_UPSTREAM_RESPONSE',
      error: 'The waitlist service returned an unexpected response.',
    });
  }

  if (result?.success !== true) {
    return sendJson(res, 502, {
      success: false,
      code: result?.success === false ? 'UPSTREAM_REJECTED' : 'UNEXPECTED_UPSTREAM_RESPONSE',
      error: 'The waitlist service did not confirm that your response was saved.',
    });
  }

  return sendJson(res, 200, { success: true });
}

export { validatePayload };
