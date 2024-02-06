import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import { auth } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span>ReviewPDF</span>
          </Link>
          {/** todo : add mobile navbar */}
          <div className="hidden items-center space-x-4 sm:flex">
            <Link
              href="/pricing"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              Pricing
            </Link>
            {!session ? (
              <>
                <Link href="/login">
                  <Button className={buttonVariants({})}>Sign in</Button>
                </Link>
              </>
            ) : (
              <>
                {" "}
                {/* <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Dashboard
                  </Link> */}
                  <UserAccountNav email={session.user.email!} imageUrl={session.user.image!} name={session.user.name!} />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
