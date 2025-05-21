"use client";
import { useEffect } from "react";
import styles from "../../components/styles/home.module.css"; // adjust the path if needed

const Hero = () => {
  useEffect(() => {
    const initScrollReveal = async () => {
      const ScrollReveal = (await import("scrollreveal")).default;
      ScrollReveal().reveal(`.${styles.heroContainerText}`, {
        distance: "50px",
        origin: "bottom",
        duration: 1000,
        reset: true,
        interval: 200,
      });
    };
    initScrollReveal();
  }, []);

  return (
    <section className="hero bg-[#0a0d14] text-white py-20 px-4">
      <div className="section__container max-w-6xl mx-auto text-center">
        <p className={styles.heroContainerText}>
          Zhora
        </p>
      </div>
    </section>
  );
};

export default Hero;
