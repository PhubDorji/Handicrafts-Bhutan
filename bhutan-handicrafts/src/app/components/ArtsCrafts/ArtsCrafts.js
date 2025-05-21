"use client";
import { useEffect } from "react";

const ArtsCrafts = () => {
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
    <section id="artsandcrafts" className="bg-[#0a0d14] text-white py-20 px-4">
      <div className="max-w-6xl mx-auto fade-up">
        <h2 className="text-4xl font-extrabold font-serif text-center mb-4">Arts & Crafts</h2>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
          Explore the beauty of handcrafted creations rooted in Bhutanese heritage.
          Discover the timeless mastery of the Zorig Chusum—the thirteen traditional arts of Bhutan.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="bg-[#20242f] rounded-lg overflow-hidden shadow-lg fade-up">
            <img
              src="/Images/Home Imagees/lhazo.jpg"
              alt="Lhazo - Painting"
              className="w-full h-64 object-cover"
            />
            <div className="p-6 -mt-10 relative z-10">
              <h4 className="text-2xl font-bold text-aquamarine mb-2">Lhazo (Painting)</h4>
              <p className="text-sm text-gray-300 mb-4">
                Traditional Bhutanese painting that adorns monasteries, temples, and thangkas with symbolic motifs and vibrant colors.
              </p>
              <a href="/arts" className="inline-block border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition">
                Explore
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#20242f] rounded-lg overflow-hidden shadow-lg fade-up">
            <img
              src="/Images/Home Imagees/jimzho.jpg"
              alt="Jimzo - Clay Art"
              className="w-full h-64 object-cover"
            />
            <div className="p-6 -mt-10 relative z-10">
              <h4 className="text-2xl font-bold text-aquamarine mb-2">Jimzo (Clay Art)</h4>
              <p className="text-sm text-gray-300 mb-4">
                Art of molding clay into religious statues and architectural elements found in dzongs and monasteries.
              </p>
              <a href="/arts" className="inline-block border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition">
                Explore
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#20242f] rounded-lg overflow-hidden shadow-lg fade-up">
            <img
              src="/Images/Home Imagees/dezho.jpg"
              alt="Dezo - Papermaking"
              className="w-full h-64 object-cover"
            />
            <div className="p-6 -mt-10 relative z-10">
              <h4 className="text-2xl font-bold text-aquamarine mb-2">Dezo (Papermaking)</h4>
              <p className="text-sm text-gray-300 mb-4">
                Traditional handmade paper crafted from the bark of the Daphne plant, used in scriptures and artworks.
              </p>
              <a href="/arts#dezo" className="inline-block border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition">
                Explore
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtsCrafts;
