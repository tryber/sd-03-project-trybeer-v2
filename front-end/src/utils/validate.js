export default (name, value) => {
  const nameLength = 12;
  const nameType = /^[a-z ]+$/i;
  const passwordLength = 6;
  const regExrEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  switch (true) {
    case name === 'name':
      return value.length >= nameLength && nameType.test(value);
    case name === 'email':
      return regExrEmail.test(value);
    case name === 'password':
      return value.length >= passwordLength;
    case name === 'seller':
      return true;
    default:
      return false;
  }
};
