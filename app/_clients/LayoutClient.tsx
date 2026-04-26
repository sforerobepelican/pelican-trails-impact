"use client";

/**
 * Client-side wrapper that draws the Layout chrome (Navbar + main + Footer)
 * verbatim from the original src/components/Layout.tsx. Marking it 'use client'
 * here pulls all of src/components/{Navbar,Footer,LangSwitcher,NavLink,...}
 * into the client graph without touching any of those source files.
 */
export { Layout as default } from "@/components/Layout";
