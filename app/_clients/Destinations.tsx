"use client";
import dynamic from "next/dynamic";

export default dynamic(() => import("@/pages/Destinations"), { ssr: false });
