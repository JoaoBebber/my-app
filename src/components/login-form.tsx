'use client'

import { useFormState, useFormStatus } from "react-dom";

import { signIn } from "../login.action";

const initialState = { message: null }

export default function LoginForm() {
  const [state, formAction] = useFormState(signIn, initialState)
  const { pending } = useFormStatus()

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" required />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" required />
      </div>

      <button type="submit" aria-disabled={pending}>
        Entrar
      </button>

      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
  )
}
