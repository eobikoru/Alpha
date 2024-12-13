
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import HeroSection from "./HeroSection";
import Features from "./Features";
import Testimonials from "./Testimonials/Testimonials";
import Faq from "./Faq/Faq";
import Cta from "./Cta";
export default function LandingPage() {
  const { isConnected } = useAccount();
  const router = useRouter();


  useEffect(() => {
    if (isConnected) {
      router.push(`/creators-registration`);
    }
  }, []);

  return (
    <>
        <main>
          <HeroSection />
          <Features />
          <Testimonials />
          <Faq />
          <Cta />
        </main>
    </>
  );
}
