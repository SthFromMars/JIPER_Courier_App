import jwtDecode from 'jwt-decode';

export function checkValidity(token) {
  if(!token)
    return false
  const decoded = jwtDecode(token);
  // 15s reserved for time until request reaches backend
  const exp  = new Date((decoded.exp-15) * 1000);
  const current = new Date();
  return current < exp;
}