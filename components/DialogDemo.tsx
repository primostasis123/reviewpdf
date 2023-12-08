import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "./Icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={buttonVariants({
            size: "sm",
          })}
        >
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] ">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4 ">
            <button
              className={buttonVariants({
                size: "lg",
                className: "rounded-full ",
              })}
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Continue with Google
            </button>
          </div>
      
          <div className="grid items-center gap-4 ">
            <button
              className={buttonVariants({
                size: "lg",
                className: "rounded-full ",
              })}
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Continue with Facebook
            </button>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            {/* <Button
              type="button"
              className={buttonVariants({
                size: "lg",
                className: "mt-5 hidden lg:block ",
              })}
            >
              Close
            </Button> */}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
