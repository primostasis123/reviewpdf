import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from '@/lib/db'

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.AUTH_FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
      async redirect({ url, baseUrl }) {
      return  "/dashboard";
    },
    async session({ session, user, token }) {
      session.user.id = user?.id
      return session
    },
  }

  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     return true
  //   },
  //   async redirect({ url, baseUrl }) {
  //     return "/dashboard"
  //   },

  //   async jwt({ token, user, account, profile, isNewUser }) {
  //     return token
  //   }
  // }
})
