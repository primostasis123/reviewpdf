'use server'
import { signIn } from "next-auth/react"

export async function authenticate(formData: FormData) {
    try {
        const res = await signIn('credentials', { email: 'appetitedestruction@yahoo.com', password: '12345678' })
      } catch (error) {
        console.log(error)
      }
}