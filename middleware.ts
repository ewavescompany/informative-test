import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "ar", "es"],
  defaultLocale: "en",
  localePrefix: "always",
});

export const config = {
  matcher: [
    "/((?!api|_next|.*\\.[^/]*$|_not-found).*)",
    "/", // Root path
  ],
};

// Look for any handling of _not-found paths
