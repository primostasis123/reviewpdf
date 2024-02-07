"use client"
import { signOut } from "next-auth/react"
import { Button } from "./ui/button"
import Link from "next/link"
const Logout = () => {
    return <Link href="#" onClick={() => signOut()} className="w-full">Logout</Link>
}

export default Logout