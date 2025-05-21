"use client";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    const srInit = async () => {
      const ScrollReveal = (await import("scrollreveal")).default;

      ScrollReveal().reveal(".fade-up", {
        distance: "50px",
        origin: "bottom",
        duration: 1000,
        reset: true,
        interval: 200,
      });
    };

    srInit();
  }, []);

  return (
    <section id="about" className="bg-[#0a0d14] text-white py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div className="fade-up">
          <h2 className="text-4xl font-extrabold font-serif mb-6 text-center md:text-left">
            About Us
          </h2>
          <p className="text-base leading-relaxed text-gray-300 mb-8 text-center md:text-left">
            At Bhutan Handicrafts, we celebrate the vibrant artistry and timeless traditions of the Land of the Thunder Dragon.
            Our handcrafted collections embody centuries of Bhutanese heritage—from intricately woven textiles and hand-carved wooden artifacts
            to traditional paintings and clay pottery. Each piece tells a story of spiritual symbolism, cultural depth, and artisanal mastery.
            Whether you're a collector, a cultural enthusiast, or simply looking to take a piece of Bhutan home, our handicrafts offer
            a truly authentic and soulfully crafted experience.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap bg-[#20242f] p-6 rounded-lg mb-6 gap-4 md:gap-6">
            <div className="flex-1 text-center border-r border-[#0a0d14]">
              <h4 className="text-3xl font-bold mb-2">4.9★</h4>
              <p className="text-sm text-gray-300">Average Customer Rating</p>
            </div>
            <div className="flex-1 text-center border-r border-[#0a0d14]">
              <h4 className="text-3xl font-bold mb-2">15,000+</h4>
              <p className="text-sm text-gray-300">Crafts Sold Worldwide</p>
            </div>
            <div className="flex-1 text-center">
              <h4 className="text-3xl font-bold mb-2">98%</h4>
              <p className="text-sm text-gray-300">Repeat Buyers</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="fade-up">
          <img
            src="https://www.handicraftsbhutan.org/wp-content/uploads/2023/02/HAB-MAP-1-1024x531.png"
            alt="Bhutan Handicrafts"
            className="w-full max-w-lg mx-auto rounded-lg shadow-xl transition-all duration-500 transform hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
