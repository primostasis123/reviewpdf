"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { trpc } from "../_trpc/client";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
export default function page() {
  const [names, setNames] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const { mutate: register } = trpc.createUser.useMutation({
    onError: () => {
      return toast({
        title: "There was problem creating an account",
        description:
          "The email has already been taken. Please try a different email.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.push("/login");
      return toast({
        title: "Successfull",
        description: "Account has been registered!",
      });
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    register({
      names: names,
      email: email,
      password: password,
    });
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Icons.logo className="mx-auto h-10 w-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Button
              type="button"
              onClick={() => {
                signIn("google");
              }}
              className="bg-black w-full"
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="grainy px-2 text-muted-foreground font-semibold">
                  Or continue with
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="names">Name</Label>
              <div className="mt-1">
                <Input
                  id="names"
                  name="names"
                  type="text"
                  className="block text-sm font-medium leading-6"
                  required
                  onChange={(e) => setNames(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email"> Email address</Label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block text-sm font-medium leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password"> Password</Label>
              </div>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                Register
              </Button>
            </div>
            <div>
              <Label>
                {" "}
                Have an account?{" "}
                <Link href="/login" className="text-blue-500">
                  Sign In
                </Link>
              </Label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
