export async function submitWaitlistEntry(payload) {
  const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT?.trim();

  if (!endpoint) {
    throw new Error('The waitlist is temporarily unavailable. Please check back soon.');
  }

  let response;

  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('We could not reach the waitlist. Please check your connection and try again.');
  }

  if (!response.ok) {
    throw new Error('We could not add you to the waitlist. Please try again in a moment.');
  }

  return response;
}
