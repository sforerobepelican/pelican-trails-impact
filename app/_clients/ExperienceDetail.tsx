"use client";
import dynamic from "next/dynamic";

export default dynamic(() => import("@/legacy-pages/ExperienceDetail"), { ssr: false });
