"use client";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [isCredentials, setIsCredentials] = useState<boolean>(false);
  const [isGoogle, setIsGoogle] = useState<boolean>(false);
  const { toast } = useToast();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsCredentials(true);
      const res = await signIn("credentials", {
        email,
        password,
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error logging in with your credentials please try again later",
        variant: "destructive",
      });
    } finally {
      setIsCredentials(false);
    }
  };
  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Icons.logo className="mx-auto h-10 w-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Button
              type="button"
              className="bg-black w-full"
              onClick={async () => {
                try {
                  setIsGoogle(true);
                  await signIn("google");
                } catch (error) {
                  toast({
                    title: "Error",
                    description: "There was an error logging in with Google",
                    variant: "destructive",
                  });
                } finally {
                  setIsGoogle(false);
                }
              }}
              disabled={isGoogle}
            >
              {isGoogle ? (
                <Loader2 className="mr-4 h-4 w-4 animate-spin" />
              ) : null}
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
              <Label htmlFor="email"> Email address</Label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block text-sm font-medium leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password"> Password</Label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
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
            {error ? (
              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-red-600">
                    Your email or password were incorrect.
                  </Label>
                </div>
              </div>
            ) : null}
            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                disabled={isCredentials}
              >
                {isCredentials ? (
                  <Loader2 className="mr-4 h-4 w-4 animate-spin" />
                ) : null}
                Sign in
              </Button>
            </div>
            <div className="mt-2">
              <Label>
                {" "}
                No account?{" "}
                <Link href="/registration" className="text-blue-500">
                  Sign Up
                </Link>
              </Label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
