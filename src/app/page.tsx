"use client";
import Cta from "@/components/LandingPage/Cta";
import Faq from "@/components/LandingPage/Faq/Faq";
import Features from "@/components/LandingPage/Features";
import HeroSection from "@/components/LandingPage/HeroSection";
import Testimonials from "@/components/LandingPage/Testimonials/Testimonials";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";
export default function Home() {
  const { isConnected } = useAccount();
  const router = useRouter();
  // const isConnected = false;

  useEffect(() => {
    if (isConnected) {
      router.push(`/creator`);
    }
  }, [isConnected, router]);

  return (
    <>
      {!isConnected && (
        <main>
          <HeroSection />
          <Features />
          <Testimonials />
          <Faq />
          <Cta />
        </main>
      )}
    </>
  );
}
