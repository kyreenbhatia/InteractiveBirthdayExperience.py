import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center font-mono text-terminal">
        <h1 className="text-7xl font-bold text-glow">404</h1>
        <p className="mt-4 text-sm uppercase tracking-widest opacity-70">FILE_NOT_FOUND</p>
        <Link to="/" className="mt-6 inline-block border border-terminal px-4 py-2 text-glow hover:bg-terminal hover:text-background transition">
          &gt; return_home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 font-mono text-terminal">
      <div className="max-w-md text-center">
        <h1 className="text-xl text-glow">SYSTEM ERROR</h1>
        <p className="mt-2 text-sm opacity-70">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 border border-terminal px-4 py-2 text-glow hover:bg-terminal hover:text-background transition">
          &gt; retry
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "HEIZEL.exe — Access Granted" },
      { name: "description", content: "birthday memory vault" },
      { property: "og:title", content: "HEIZEL.exe — Access Granted" },
      { property: "og:description", content: "birthday memory vault" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "HEIZEL.exe — Access Granted" },
      { name: "twitter:description", content: "birthday memory vault" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c1f8d3c2-4364-4682-8cc3-84a1a0835a32/id-preview-6c1c570b--41d38ed6-6660-470f-845a-a75bf14848d2.lovable.app-1778851762025.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c1f8d3c2-4364-4682-8cc3-84a1a0835a32/id-preview-6c1c570b--41d38ed6-6660-470f-845a-a75bf14848d2.lovable.app-1778851762025.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=VT323&family=Share+Tech+Mono&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
