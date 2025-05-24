import Image from 'next/image';
import Link from 'next/link';
import styles from './Carousel.module.css';

const Slide = ({ slide }) => {
  return (
    <div className={styles.sitem}>
      <Image
        src={slide.image}
        alt={slide.title}
        width={800} // Set appropriate width
        height={600} // Set appropriate height
        className={styles.slideImage} // Add this to your CSS module if needed
        priority // Optional: if this is above-the-fold content
      />
      <div className={styles.scontent}>
        <div className={styles.sauthor}>{slide.author}</div>
        <div className={styles.stitle}>{slide.title}</div>
        <div className={styles.stopic}>{slide.topic}</div>
        <div className={styles.sdes}>{slide.description}</div>
        <div className={styles.sbuttons}>
          <Link href="/Shop">
            <button>SHOP NOW</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide;