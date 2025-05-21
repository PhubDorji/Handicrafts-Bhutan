'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import styles from '../styles/Gallery.module.css';

const galleryItems = [
  {
    id: 1,
    image: "/images/Home Imagees/g1.jpg",
    alt: "Yathra Weaving",
    title: "Yathra Weaving",
    location: "Bumthang"
  },
  {
    id: 2,
    image: "/images/Home Imagees/g2.jpg",
    alt: "Wood Carving",
    title: "Wood Carving",
    location: "Thimphu"
  },
  {
    id: 3,
    image: "/images/Home Imagees/g3.jpg",
    alt: "Handmade Paper",
    title: "Handmade Paper",
    location: "Punakha"
  },
  {
    id: 4,
    image: "/images/Home Imagees/g4.jpg",
    alt: "Clay Pottery",
    title: "Clay Pottery",
    location: "Lhuentse"
  },
  {
    id: 5,
    image: "/images/Home Imagees/g5.jpg",
    alt: "Bronze Statues",
    title: "Bronze Statue",
    location: "Paro"
  }
];

export default function Gallery() {
  useEffect(() => {
    const initScrollReveal = async () => {
      const ScrollReveal = (await import('scrollreveal')).default;

      const scrollRevealOption = {
        distance: "50px",
        origin: "bottom",
        duration: 1000,
        easing: 'ease-in-out',
        opacity: 0,
        reset: false
      };

      ScrollReveal().reveal(`.${styles.section__header}`, {
        ...scrollRevealOption,
        delay: 100
      });

      ScrollReveal().reveal(`.${styles.section__subheader}`, {
        ...scrollRevealOption,
        delay: 300
      });

      ScrollReveal().reveal(`.${styles.gallery__card}`, {
        ...scrollRevealOption,
        interval: 200
      });

      ScrollReveal().reveal(`.${styles.gallery__image}`, {
        ...scrollRevealOption,
        interval: 200
      });

      ScrollReveal().reveal(`.${styles.gallery__content}`, {
        ...scrollRevealOption,
        delay: 200,
        interval: 200
      });
    };

    initScrollReveal();
  }, []);

  return (
    <section className={styles.gallery} id="gallery">
      <div className={styles.gallery__container}>
        <h2 className={styles.section__header}>Bhutanese Handicrafts</h2>
        <p className={styles.section__subheader}>
          Discover the intricate and timeless beauty of traditional Bhutanese crafts.
        </p>
        <div className={styles.gallery__grid}>
          {galleryItems.map((item) => (
            <div className={styles.gallery__card} key={item.id}>
              <div className={styles.image__wrapper}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className={styles.gallery__image}
                  priority={item.id <= 2}
                />
              </div>
              <div className={styles.gallery__content}>
                <h4>{item.title}</h4>
                <p>{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
