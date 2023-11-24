import { cookies } from 'next/headers'
import axios from 'axios'

const token = cookies().get('my-app.token')?.value

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${token}`
  }
});
