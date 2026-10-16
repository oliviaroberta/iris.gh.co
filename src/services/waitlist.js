export async function submitWaitlistEntry(payload) {
  let response;

  try {
    response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('We could not reach the waitlist. Please check your connection and try again.');
  }

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error('The waitlist returned an unexpected response. Please try again in a moment.');
  }

  if (!response.ok || result?.success !== true) {
    throw new Error(result?.error || 'We could not add you to the waitlist. Please try again in a moment.');
  }

  return result;
}
