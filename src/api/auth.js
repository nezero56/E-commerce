import client from './client'

export const register = (data) =>
  client.post('/api/auth/users/register', data).then((r) => r.data)

export const login = (data) =>
  client.post('/api/auth/users/login', data).then((r) => r.data)


