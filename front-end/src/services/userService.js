export const login = async (values) => {
  const { email, password } = values;
  const response = await fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const register = async (name, email, password, seller) => {
  const response = await fetch('http://localhost:3001/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name.text,
      email: email.text,
      password: password.text,
      seller,
    }),
  });
  return response.json();
};

export const changeClientName = async (obj, token) => {
  const { name, email } = obj;
  const response = await fetch('http://localhost:3001/update-client-name', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', authorization: token },
    body: JSON.stringify({
      name,
      email,
    }),
  });
  return response.json();
};
