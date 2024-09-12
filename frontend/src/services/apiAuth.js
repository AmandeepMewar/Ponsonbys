export async function signup(user) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(
      data.message || 'An Error occurred please try again later.'
    );
  return data;
}

export async function login(user) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || 'An error occurred. Please try again.');

  return data;
}
