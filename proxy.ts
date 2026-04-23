// Next.js 16 renamed `middleware.ts` → `proxy.ts`. Export name: `proxy`.
export { auth as proxy } from "@/lib/auth";

export const config = {
  // Protect /admin and /admin/* EXCEPT /admin/login.
  // Auth.js v5 enters an infinite redirect loop if the signIn page
  // is itself inside the middleware matcher.
  matcher: [
    "/admin",
    "/admin/((?!login$).+)",
  ],
};
