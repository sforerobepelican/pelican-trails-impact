"use client";

/**
 * react-router-dom → Next.js App Router compatibility shim.
 *
 * Aliased via next.config.ts so every existing
 *   import { Link, NavLink, useParams, useLocation, useNavigate, Navigate, Outlet }
 *     from "react-router-dom";
 * keeps working without source changes. UI is identical; routing is now
 * Next App Router under the hood.
 */

import {
  forwardRef,
  useEffect,
  type AnchorHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from "react";
import NextLink from "next/link";
import {
  useParams as useNextParams,
  usePathname,
  useRouter,
  useSearchParams,
  redirect,
} from "next/navigation";

/* ───────────── Link ───────────── */

type ToProp = string | { pathname?: string; search?: string; hash?: string };

interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: ToProp;
  replace?: boolean;
  state?: unknown;
  relative?: "route" | "path";
  preventScrollReset?: boolean;
  children?: ReactNode;
}

function toHref(to: ToProp): string {
  if (typeof to === "string") return to;
  const path = to.pathname ?? "";
  const search = to.search ?? "";
  const hash = to.hash ?? "";
  return `${path}${search}${hash}`;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, replace, state: _state, relative: _relative, preventScrollReset: _psr, ...rest },
  ref,
) {
  return <NextLink ref={ref} href={toHref(to)} replace={replace} {...rest} />;
});

/* ───────────── NavLink ───────────── */

type NavLinkRenderState = { isActive: boolean; isPending: boolean; isTransitioning: boolean };
type ClassNameProp = string | ((state: NavLinkRenderState) => string | undefined);
type StyleProp = CSSProperties | ((state: NavLinkRenderState) => CSSProperties | undefined);
type ChildrenProp = ReactNode | ((state: NavLinkRenderState) => ReactNode);

interface NavLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "style" | "children"> {
  to: ToProp;
  end?: boolean;
  caseSensitive?: boolean;
  className?: ClassNameProp;
  style?: StyleProp;
  children?: ChildrenProp;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
  { to, end, caseSensitive, className, style, children, ...rest },
  ref,
) {
  const pathname = usePathname() ?? "/";
  const href = toHref(to);
  const a = caseSensitive ? pathname : pathname.toLowerCase();
  const b = caseSensitive ? href : href.toLowerCase();
  const isActive = end ? a === b : a === b || a.startsWith(`${b}/`);
  const state: NavLinkRenderState = { isActive, isPending: false, isTransitioning: false };

  const computedClassName =
    typeof className === "function" ? className(state) : className;
  const computedStyle = typeof style === "function" ? style(state) : style;
  const computedChildren = typeof children === "function" ? children(state) : children;

  return (
    <NextLink
      ref={ref}
      href={href}
      className={computedClassName}
      style={computedStyle}
      aria-current={isActive ? "page" : undefined}
      {...rest}
    >
      {computedChildren}
    </NextLink>
  );
});

/* ───────────── Hooks ───────────── */

export function useParams<T extends Record<string, string | undefined> = Record<string, string | undefined>>() {
  const p = useNextParams();
  return p as T;
}

export function useLocation() {
  const pathname = usePathname() ?? "/";
  const sp = useSearchParams();
  const search = sp?.toString() ? `?${sp.toString()}` : "";
  return {
    pathname,
    search,
    hash: typeof window !== "undefined" ? window.location.hash : "",
    state: null as unknown,
    key: "default",
  };
}

export function useNavigate() {
  const router = useRouter();
  return (
    to: ToProp | number,
    options?: { replace?: boolean; state?: unknown; preventScrollReset?: boolean },
  ) => {
    if (typeof to === "number") {
      if (typeof window !== "undefined") window.history.go(to);
      return;
    }
    const href = toHref(to);
    if (options?.replace) router.replace(href);
    else router.push(href);
  };
}

export function useSearchParamsCompat() {
  const sp = useSearchParams();
  return sp;
}
export { useSearchParamsCompat as useSearchParams };

/* ───────────── Navigate (declarative redirect) ───────────── */

export function Navigate({ to, replace }: { to: ToProp; replace?: boolean }) {
  const href = toHref(to);
  const router = useRouter();
  useEffect(() => {
    if (replace) router.replace(href);
    else router.push(href);
  }, [href, replace, router]);
  return null;
}

/* ───────────── Outlet (kept for legacy callers; unused after Layout edit) ─ */

export function Outlet({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

/* ───────────── BrowserRouter / Routes / Route (no-op shells) ───────────── */
// These are referenced by src/App.tsx (now obsolete). Kept so legacy imports
// resolve even if the file is left in place.

export function BrowserRouter({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}
export function Routes({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}
export function Route(_props: Record<string, unknown>) {
  return null;
}

/* Server-side hard redirect helper (handy in server components) */
export function redirectTo(href: string): never {
  redirect(href);
}
