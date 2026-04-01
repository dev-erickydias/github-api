import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Playground from "../components/Playground";
import Docs from "../components/Docs";
import Examples from "../components/Examples";
import UseCases from "../components/UseCases";
import Security from "../components/Security";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Playground />
      <Docs />
      <Examples />
      <UseCases />
      <Security />
      <Footer />
    </main>
  );
}
