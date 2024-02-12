import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async  function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const session = !!request.cookies.get("authjs.session-token") || !!request.cookies.get("__Secure-authjs.session-token")
    if (!session) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/dashboard/:path*"],
};
