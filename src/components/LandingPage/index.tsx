import HeroSection from "./HeroSection";
import Features from "./Features";
import Testimonials from "./Testimonials/Testimonials";
import Faq from "./Faq/Faq";
import Cta from "./Cta";
export default function LandingPage() {
 


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
