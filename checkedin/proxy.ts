import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const pathName = req.nextUrl.pathname;
  const userCookie = req.cookies.get("user")?.value;

  let user: { id?: string; role?: string } | null = null;

  if (userCookie) {
    try {
      user = JSON.parse(userCookie);
    } catch (error) {
      console.error("Invalid cookie:", error);
      user = null;
    }
  }

  if (!user) {
    if (pathName.startsWith("/dashboard/staff")) {
      return NextResponse.redirect(new URL("/staff", req.url));
    }

    if (pathName.startsWith("/dashboard/man_dash")) {
      return NextResponse.redirect(new URL("/manager", req.url));
    }
  }

  if (user?.role === "staff" && pathName.startsWith("/dashboard/man_dash")) {
    return NextResponse.redirect(new URL("/dashboard/staff", req.url));
  }

  if (user?.role === "manager" && pathName.startsWith("/dashboard/staff")) {
    return NextResponse.redirect(new URL("/dashboard/man_dash", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/staff/:path*", "/dashboard/man_dash/:path*"],
};
