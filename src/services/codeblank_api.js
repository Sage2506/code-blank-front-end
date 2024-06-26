import axios from "axios";

export const baseURL = 'http://localhost:4200/'
export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const apiGet = args => api.get(`${args.path}?${args.params ? new URLSearchParams(args.params).toString() : ''}`)

export const apiDelete = args => api.delete(`${args.path}/${args.id}`)

export const apiPost = args => api.post(`${args.path}`, args.data);

export const apiPut = args => api.put(`${args.path}/${args.id}`, args.data)

export default api;