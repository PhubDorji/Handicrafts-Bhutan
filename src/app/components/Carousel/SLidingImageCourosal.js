// === SLidingImageCourosal.js ===
'use client';

import { useEffect, useRef } from 'react';
import styles from './Carousel.module.css';
import Slide from './Slide';
import Thumbnail from './Thumbnail';

const images = [
  {
    image: '/Images/Home Imagees/Bamboo.png',
    title: 'Bamboo Basket',
    topic: 'Handicraft',
    author: 'Craftsman A',
    description: 'Handcrafted traditional bamboo basket made in Bhutan.',
    link: '#',
    thumbnailTitle: 'Bamboo Basket',
    thumbnailDescription: 'Traditional bamboo basket with eco value.',
  },
  {
    image: '/Images/Home Imagees/Bottle.png',
    title: 'Bamboo Bottle',
    topic: 'Eco Product',
    author: 'Craftsman B',
    description: 'Eco-friendly bamboo bottle for everyday use.',
    link: '#',
    thumbnailTitle: 'Bamboo Bottle',
    thumbnailDescription: 'Sustainable and reusable bamboo bottle.',
  },
  {
    image: '/products/bamboo_pen_holder.jpg',
    title: 'Bamboo Pen Holder',
    topic: 'Stationery',
    author: 'Craftsman C',
    description: 'Sleek and stylish pen holder made from bamboo.',
    link: '#',
    thumbnailTitle: 'Bamboo Pen Holder',
    thumbnailDescription: 'Minimalist bamboo pen holder.',
  },
];
const SLidingImageCourosal = () => {
  const carouselRef = useRef(null);
  const slistRef = useRef(null);
  const thumbnailRef = useRef(null);
  const timeRef = useRef(null);
  const autoSlideTimer = useRef(null);

  const timeRunning = 3000;
  const timeAutoNext = 7000;

  useEffect(() => {
    const carousel = carouselRef.current;
    const slist = slistRef.current;
    const thumbnails = thumbnailRef.current;

    const nextSlide = () => {
      const sItems = slist.querySelectorAll(`.${styles.sitem}`);
      const tItems = thumbnails.querySelectorAll(`.${styles.sitem}`);

      slist.appendChild(sItems[0]);
      thumbnails.appendChild(tItems[0]);

      carousel.classList.add('next');
      clearTimeout(timeRef.current);
      timeRef.current = setTimeout(() => {
        carousel.classList.remove('next');
      }, timeRunning);

      resetAutoSlide();
    };

    const prevSlide = () => {
      const sItems = slist.querySelectorAll(`.${styles.sitem}`);
      const tItems = thumbnails.querySelectorAll(`.${styles.sitem}`);

      slist.prepend(sItems[sItems.length - 1]);
      thumbnails.prepend(tItems[tItems.length - 1]);

      carousel.classList.add('prev');
      clearTimeout(timeRef.current);
      timeRef.current = setTimeout(() => {
        carousel.classList.remove('prev');
      }, timeRunning);

      resetAutoSlide();
    };

    const startAutoSlide = () => {
      autoSlideTimer.current = setInterval(() => nextSlide(), timeAutoNext);
    };

    const stopAutoSlide = () => {
      clearInterval(autoSlideTimer.current);
    };

    const resetAutoSlide = () => {
      stopAutoSlide();
      startAutoSlide();
    };

    document.getElementById('snext')?.addEventListener('click', nextSlide);
    document.getElementById('sprev')?.addEventListener('click', prevSlide);

    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', resetAutoSlide);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAutoSlide();
      else resetAutoSlide();
    });

    startAutoSlide();

    return () => {
      stopAutoSlide();
    };
  }, []);

  return (
    <div className={styles.slidingimage}>
      <div ref={carouselRef} className={`${styles.scarousel}`}>
        <div ref={slistRef} className={styles.slist}>
          {images.map((slide, i) => (
            <Slide key={i} slide={slide} />
          ))}
        </div>

        <div className={styles.sarrows}>
          <button id="sprev">&#10094;</button>
          <button id="snext">&#10095;</button>
        </div>

        <div ref={thumbnailRef} className={styles.sthumbnail}>
          {images.map((slide, i) => (
            <Thumbnail key={i} slide={slide} />
          ))}
        </div>

        <div className={styles.stime}></div>
      </div>
    </div>
  );
};

export default SLidingImageCourosal;