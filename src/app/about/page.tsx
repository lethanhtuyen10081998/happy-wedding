import AboutSection from "@/components/pages/about";
import type { Metadata } from "next";

export default function AboutPage() {
  return <AboutSection />;
}

export const metadata: Metadata = {
  title: "About | Tuyen Le",
  description: "About Tuyen Le",
};
