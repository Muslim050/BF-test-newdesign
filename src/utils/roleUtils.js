export const hasRole = (requiredRoles) => {
  const role = localStorage.getItem('role')
  return requiredRoles.includes(role)
}
