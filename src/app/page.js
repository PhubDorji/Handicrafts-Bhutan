import About from "./components/About/About";
import Carousel from "./components/Carousel/Carousel"; // ✅ Carousel import
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Gallery from "./components/Gallery/Gallery";
import Hero from "./components/Hero/Hero";
import LandingNavbar from "./components/LandingNavbar";
// import Navbar from "./components/Navbar";
import ProductCardSection from "./components/ProductCard/ProductCard";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <LandingNavbar /> 
      {/* <Navbar /> */}
      <Carousel /> {/* ✅ Carousel Component */}
      <About />
      <ProductCardSection />
      <Hero/>
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
