"use client";
import dynamic from "next/dynamic";

export default dynamic(() => import("@/legacy-pages/Contact"), { ssr: false });
