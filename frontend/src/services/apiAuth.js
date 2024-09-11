export async function signup(user) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Tell the server that you're sending JSON data
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  console.log(data);
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

  const data = response.json();
  console.log(data);
  return data;
}
