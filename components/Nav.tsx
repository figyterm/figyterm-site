"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";
import { navLinks, site } from "@/lib/site";
import { features } from "@/lib/features";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on navigation — the menu is not part of the next page.
  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  // Dismiss the mega menu on an outside click or Escape, the way a menu should.
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen || menuOpen
          ? "border-b border-edge bg-canvas/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="container-page flex h-16 items-center justify-between gap-6"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 font-semibold tracking-tight"
        >
          <Image
            src="/logo-mark.png"
            alt=""
            width={512}
            height={512}
            priority
            className="size-8 rounded-lg"
          />
          <span className="text-[15px]">{site.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) =>
            link.menu ? (
              <li key={link.href} ref={menuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-expanded={menuOpen}
                  aria-haspopup="true"
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5 hover:text-fg ${
                    isActive(link.href) ? "text-fg" : "text-fg-muted"
                  }`}
                >
                  {link.label}
                  <Icon
                    name="chevron-down"
                    className={`size-3.5 transition-transform duration-200 ${
                      menuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {menuOpen && <FeatureMenu />}
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5 hover:text-fg ${
                    isActive(link.href) ? "text-fg" : "text-fg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={site.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-lg border border-edge px-3 py-2 text-sm text-fg-muted transition-colors hover:border-edge-strong hover:text-fg sm:flex"
          >
            <Icon name="github" className="size-4" />
            GitHub
          </a>
          <Link
            href="/download"
            className="rounded-lg bg-brand px-3.5 py-2 text-sm font-medium text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-bright"
          >
            Download
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="-mr-1 rounded-lg p-2 text-fg-muted transition-colors hover:text-fg lg:hidden"
          >
            <Icon name={mobileOpen ? "cross" : "menu"} className="size-5" />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-edge bg-canvas px-5 pb-10 pt-4 lg:hidden"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-subtle">
            Features
          </p>
          <ul className="mt-3 grid gap-1 sm:grid-cols-2">
            {features.map((feature) => (
              <li key={feature.slug}>
                <Link
                  href={`/features/${feature.slug}`}
                  className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-[15px] text-fg-muted transition-colors hover:bg-white/[0.04] hover:text-fg"
                >
                  <span
                    className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-edge bg-panel-2"
                    style={{ color: feature.accent }}
                  >
                    <Icon name={feature.icon} className="size-4" />
                  </span>
                  {feature.navLabel}
                  {feature.badge && (
                    <span className="ml-auto rounded-full border border-edge px-2 py-0.5 text-[10px] uppercase tracking-wider text-fg-subtle">
                      {feature.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-6 border-t border-edge pt-2">
            {navLinks
              .filter((link) => !link.menu)
              .map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block border-b border-edge/60 py-3.5 text-[15px] text-fg-muted"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            <li>
              <Link
                href="/specs"
                className="block border-b border-edge/60 py-3.5 text-[15px] text-fg-muted"
              >
                Command specs
              </Link>
            </li>
            <li>
              <a
                href={site.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-3.5 text-[15px] text-fg-muted"
              >
                <Icon name="github" className="size-4" />
                View source on GitHub
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

/** The features mega menu. Desktop only — mobile gets the same list inline. */
function FeatureMenu() {
  return (
    <div className="absolute left-1/2 top-full z-50 w-[46rem] -translate-x-1/2 pt-3">
      <div className="overflow-hidden rounded-2xl border border-edge bg-panel/95 shadow-2xl shadow-black/60 ring-edge backdrop-blur-xl">
        <ul className="grid grid-cols-2 gap-1 p-2">
          {features.map((feature) => (
            <li key={feature.slug}>
              <Link
                href={`/features/${feature.slug}`}
                className="flex gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.04]"
              >
                <span
                  className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-edge bg-panel-2"
                  style={{ color: feature.accent }}
                >
                  <Icon name={feature.icon} className="size-4.5" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-medium text-fg">
                      {feature.navLabel}
                    </span>
                    {feature.badge && (
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider"
                        style={{
                          color: feature.accent,
                          backgroundColor: `color-mix(in oklab, ${feature.accent} 14%, transparent)`,
                        }}
                      >
                        {feature.badge}
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-fg-subtle">
                    {feature.tagline}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/features"
          className="flex items-center justify-between border-t border-edge px-5 py-3.5 text-sm text-fg-muted transition-colors hover:bg-white/[0.03] hover:text-fg"
        >
          Everything in one place
          <Icon name="arrow-right" className="size-4" />
        </Link>
      </div>
    </div>
  );
}
