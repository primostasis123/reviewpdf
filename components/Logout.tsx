"use client"
import { signOut } from "next-auth/react"
import { Button } from "./ui/button"
import Link from "next/link"
const Logout = () => {
    return <Link href="#" onClick={() => signOut()}>Logout</Link>
}

export default Logout