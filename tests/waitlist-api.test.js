import assert from 'node:assert/strict';
import test from 'node:test';
import handler from '../api/waitlist.js';

const validEntry = {
  fullName: 'Test Customer',
  email: 'test@example.com',
  whatsapp: '+233 20 000 0000',
  style: 'I love both',
  excitement: 'The quality and finishing',
  priority: 'Comfort',
  size: 'M',
  customSize: '',
  likelihood: 'Very likely',
  consent: true,
};

function responseMock() {
  return {
    headers: {},
    statusCode: 0,
    body: undefined,
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

async function submit(body) {
  const req = { method: 'POST', headers: {}, body };
  const res = responseMock();
  await handler(req, res);
  return res;
}

test.beforeEach(() => {
  process.env.GOOGLE_APPS_SCRIPT_URL = 'https://example.invalid/apps-script';
  delete process.env.WAITLIST_ALLOWED_ORIGINS;
});

test.afterEach(() => {
  global.fetch = undefined;
});

test('rejects missing required fields', async () => {
  const res = await submit({ ...validEntry, fullName: '' });
  assert.equal(res.statusCode, 400);
  assert.equal(res.body.success, false);
  assert.deepEqual(res.body.fields, ['fullName']);
});

test('rejects an invalid email', async () => {
  const res = await submit({ ...validEntry, email: 'not-an-email' });
  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body.fields, ['email']);
});

test('requires explicit marketing consent', async () => {
  const res = await submit({ ...validEntry, consent: false });
  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body.fields, ['consent']);
});

test('requires a custom size when Other is selected', async () => {
  const res = await submit({ ...validEntry, size: 'Other', customSize: '' });
  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body.fields, ['customSize']);
});

test('rejects Apps Script success false', async () => {
  global.fetch = async () => new Response(JSON.stringify({ success: false }), { status: 200 });
  const res = await submit(validEntry);
  assert.equal(res.statusCode, 502);
  assert.equal(res.body.code, 'UPSTREAM_REJECTED');
});

test('returns success only when Apps Script explicitly confirms success', async () => {
  let mappedPayload;
  global.fetch = async (_url, options) => {
    mappedPayload = JSON.parse(options.body);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  };
  const res = await submit(validEntry);
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { success: true });
  assert.equal(mappedPayload.whatsappNumber, validEntry.whatsapp);
  assert.equal(mappedPayload.favouriteStyle, validEntry.style);
  assert.equal(mappedPayload.marketingConsent, true);
  assert.equal('whatsapp' in mappedPayload, false);
});

test('handles an upstream network failure', async () => {
  global.fetch = async () => { throw new TypeError('simulated network failure'); };
  const res = await submit(validEntry);
  assert.equal(res.statusCode, 502);
  assert.equal(res.body.code, 'UPSTREAM_UNAVAILABLE');
});

test('rejects an unexpected upstream response', async () => {
  global.fetch = async () => new Response(JSON.stringify({ ok: true }), { status: 200 });
  const res = await submit(validEntry);
  assert.equal(res.statusCode, 502);
  assert.equal(res.body.code, 'UNEXPECTED_UPSTREAM_RESPONSE');
});
