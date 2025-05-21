'use client';
import { useEffect, useRef } from 'react';
import styles from './Carousel.module.css';
import Slide from './Slide';
import Thumbnail from './Thumbnail';

const slidesData = [
  {
    image: '/Images/Home Imagees/Textile.png',
    author: 'Bhutan',
    title: 'TEXTILE',
    topic: 'PRODUCTS',
    description: 'Bhutanese textiles are famous for their intricate weaves, vibrant colors, and unique patterns. From the elegant Kishuthara of Lhuntse to the warm woolen Mathra and Yathra of Bumthang, these handwoven fabrics are cherished for their beauty and cultural significance.',
    link: '/Arts',
    thumbnailTitle: 'Textile',
    thumbnailDescription: 'Exquisite handwoven fabrics showcasing Bhutanese heritage and craftsmanship.',
  },
  {
    image: '/Images/Home Imagees/painting.png',
    author: 'Bhutan',
    title: 'ART AND PAINTING',
    topic: 'PRODUCTS',
    description: 'Traditional Bhutanese art, including Thangka paintings, follows sacred Buddhist principles. These religious artworks are believed to purify the soul and bring blessings, making them valuable for both spiritual and decorative purposes.',
    link: '/Arts',
    thumbnailTitle: 'Art and Painting',
    thumbnailDescription: 'Traditional Thangka paintings and intricate artworks reflecting Bhutanese culture.',
  },
  {
    image: '/Images/Home Imagees/Bamboo.png',
    author: 'Bhutan',
    title: 'CAN AND BAMBOO',
    topic: 'PRODUCTS',
    description: 'Bhutanese artisans craft a variety of eco-friendly cane and bamboo products, including baskets, mats, containers, and musical instruments. These handcrafted items reflect Bhutan\'s sustainable craftsmanship and cultural heritage.',
    link: '/Arts',
    thumbnailTitle: 'Can and Bamboo',
    thumbnailDescription: 'Eco-friendly handcrafted baskets, furniture, and home decor made from bamboo.',
  },
  {
    image: '/Images/Home Imagees/wood.png',
    author: 'Bhutan',
    title: 'WOODS',
    topic: 'PRODUCTS',
    description: 'Exquisite Bhutanese wood products include bowls, plates, cups, and religious artifacts made from special wood burls. These handcrafted items are often passed down as family heirlooms and are known for their durability and craftsmanship.',
    link: '/Arts',
    thumbnailTitle: 'Woods',
    thumbnailDescription: 'Beautifully carved wooden sculptures, furniture, and religious artifacts.',
  },
];

const Carousel = () => {
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

    if (!carousel || !slist || !thumbnails) return;

    const nextSlide = () => {
      const sItems = slist.querySelectorAll(`.${styles.sitem}`);
      const tItems = thumbnails.querySelectorAll(`.${styles.sitem}`);

      if (sItems.length === 0 || tItems.length === 0) return;

      slist.appendChild(sItems[0]);
      thumbnails.appendChild(tItems[0]);

      carousel.classList.add(styles.next);
      clearTimeout(timeRef.current);
      timeRef.current = setTimeout(() => {
        carousel.classList.remove(styles.next);
      }, timeRunning);

      resetAutoSlide();
    };

    const prevSlide = () => {
      const sItems = slist.querySelectorAll(`.${styles.sitem}`);
      const tItems = thumbnails.querySelectorAll(`.${styles.sitem}`);

      if (sItems.length === 0 || tItems.length === 0) return;

      slist.prepend(sItems[sItems.length - 1]);
      thumbnails.prepend(tItems[tItems.length - 1]);

      carousel.classList.add(styles.prev);
      clearTimeout(timeRef.current);
      timeRef.current = setTimeout(() => {
        carousel.classList.remove(styles.prev);
      }, timeRunning);

      resetAutoSlide();
    };

    const startAutoSlide = () => {
      autoSlideTimer.current = setInterval(nextSlide, timeAutoNext);
    };

    const stopAutoSlide = () => {
      clearInterval(autoSlideTimer.current);
    };

    const resetAutoSlide = () => {
      stopAutoSlide();
      startAutoSlide();
    };

    const nextButton = document.getElementById('snext');
    const prevButton = document.getElementById('sprev');

    if (nextButton) nextButton.addEventListener('click', nextSlide);
    if (prevButton) prevButton.addEventListener('click', prevSlide);

    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', resetAutoSlide);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAutoSlide();
      else resetAutoSlide();
    });

    startAutoSlide();

    return () => {
      stopAutoSlide();
      if (nextButton) nextButton.removeEventListener('click', nextSlide);
      if (prevButton) prevButton.removeEventListener('click', prevSlide);
      carousel.removeEventListener('mouseenter', stopAutoSlide);
      carousel.removeEventListener('mouseleave', resetAutoSlide);
      document.removeEventListener('visibilitychange', () => {
        if (document.hidden) stopAutoSlide();
        else resetAutoSlide();
      });
    };
  }, []);

  return (
    <section className={styles.slidingimage}>
      <div ref={carouselRef} className={styles.scarousel}>
        <div ref={slistRef} className={styles.slist}>
          {slidesData.map((slide, index) => (
            <Slide key={index} slide={slide} />
          ))}
        </div>

        <div className={styles.sthumbnail} ref={thumbnailRef}>
          {slidesData.map((slide, index) => (
            <Thumbnail key={index} slide={slide} />
          ))}
        </div>

        <div className={styles.sarrows}>
          <button id="sprev">&#10094;</button>
          <button id="snext">&#10095;</button>
        </div>

        <div className={styles.stime}></div>
      </div>
    </section>
  );
};

export default Carousel;