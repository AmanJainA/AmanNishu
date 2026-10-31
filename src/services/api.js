const SUPABASE_URL = 'https://wrssvnvagpnvlwhnqqta.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzkxMzA0ODgzLCJleHAiOjIxMDY4ODA4ODN9.c4yG-S54rHPRhuEeohnDoYOYzR7OvR_8CkUH8QRYNQ0';
const ENDPOINT = `${SUPABASE_URL}/functions/v1/amanishu-admin`;

export const PHONE_PATTERN = /^[6789][0-9]{9}$/;

async function post(action, body) {
  let response;
  try {
    response = await fetch(ENDPOINT, {
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

/** Look up a guest's saved stay arrangement by registered contact number. */
export async function lookupEntry(contactno) {
  const data = await post('guest-lookup', { contactno });
  return data.entry || null;
}

/** Save a new guest stay arrangement in Supabase. */
export async function submitEntry(entry) {
  return post('guest-submit', entry);
}

/** Update the guest's existing stay arrangement in Supabase. */
export async function updateEntry(entry) {
  return post('guest-update', entry);
}
