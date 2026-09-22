// lib/route-config.ts

/**
 * Routes where global layout (navbar + footer) should be hidden.
 * Useful for full-screen experiences like chat, auth flows, etc.
 */
export const FULLSCREEN_ROUTES = [
  "/codearn-ai",   // CodEarn AI full-page chat
  "/login",     // ← jab chaho add karo
  "/register",    // ← jab chaho add karo
];

/**
 * Returns true if the given pathname should hide the global
 * layout (navbar + footer).
 */
export function shouldHideGlobalLayout(pathname: string | null): boolean {
  if (!pathname) return false;

  return FULLSCREEN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}