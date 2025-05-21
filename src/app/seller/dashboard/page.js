import About from "@/app/components/About/About";
import Carousel from "@/app/components/Carousel/Carousel"; // ✅ Carousel import
import Contact from "@/app/components/Contact/Contact";
import Footer from "@/app/components/Footer/Footer";
import Gallery from "@/app/components/Gallery/Gallery";
import Hero from "@/app/components/Hero/Hero";
import Navbar from "@/app/components/Navbar";
import ProductCard from "@/app/components/ProductCard/ProductCard";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Carousel /> {/* ✅ Carousel Component */}
      <About />
      <ProductCard />
      <Hero/>
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
