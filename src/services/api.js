import { ADMIN_ENDPOINT, SUPABASE_ANON_KEY } from './config';

export const PHONE_PATTERN = /^[6789][0-9]{9}$/;

async function post(action, body) {
  let response;
  try {
    response = await fetch(ADMIN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY },
      body: JSON.stringify({ action, ...body }),
    });
  } catch {
    throw new Error('Could not reach the server. Please check your connection and try again.');
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong. Please try again.');
    error.status = response.status;
    throw error;
  }
  return data;
}

export async function lookupEntry(contactno) {
  const data = await post('guest-lookup', { contactno });
  return data.entry || null;
}

export async function submitEntry(entry) {
  return post('guest-submit', entry);
}

export async function updateEntry(entry) {
  return post('guest-update', entry);
}
