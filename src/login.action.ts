'use server'

import { redirect } from "next/navigation"
import { cookies } from 'next/headers'
import { z } from 'zod'

import { api } from "./services/api"

const loginSchema = z.object({
  username: z.string(),
  password: z.string()
})

export async function signIn(prevState: any, formData: FormData) {
  // Extrai os dados do formulário
  const rawFormData = {
    username: formData.get('username'),
    password: formData.get('password')
  }

  // Validação com zod schema
  const validatedFields = loginSchema.safeParse(rawFormData)

  if (!validatedFields.success) return { message: 'Data validation failed' }

  // Extrai os dados validados
  const { username, password } = validatedFields.data

  console.log(username + " " + password)

  try {
    const response = await api.post('/auth/login', { username, password })

    const { access_token } = response.data

    cookies().set('my-app.token', access_token)
  } catch (e) {
    return { message: 'Wrong credentials' }
  }

  redirect('/me')
}
