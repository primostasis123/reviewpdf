
import { AppRouter } from "@/trpc";
import { inferRouterOutputs } from "@trpc/server";

type RouterOutPut = inferRouterOutputs<AppRouter>

type Messages = RouterOutPut["getFileMessages"]["messages"]

type OmitText = Omit<Messages[number], "text">

type ExtendedText = {
    text : string | JSX.Element
}

export type ExtendedMessage = OmitText & ExtendedText