import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Encargos from "@/components/Encargos";
import About from "@/components/About";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#1a1a1f] via-[#2a1f33] to-[#3b1d4a]">
      <Header />
      <Hero />
      <Gallery />
      <Encargos />
      <About />
      <Footer />
    </main>    
  );
}
