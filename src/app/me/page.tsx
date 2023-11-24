import { cookies } from "next/headers"

import { api } from "../../services/api"

export default async function Me() {
  const token = cookies().get('my-app.token')?.value

  api.defaults.headers['Authorization'] = `Bearer ${token}`

  const response = await api.get('/auth/profile')

  const { username } = response.data

  return (
    <div>
      <h1>Hey! I&apos;m {username}</h1>
      <h3>This is my personal homepage</h3>
    </div>
  )
}
