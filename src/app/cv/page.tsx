import CVClient from "@/components/pages/cv/cv-client";
import { Metadata } from "next";

export default function CVPage() {
  return <CVClient locale="en" />;
}

export const metadata: Metadata = {
  title: "CV | Tuyen Le",
  description: "CV Tuyen Le",
};
