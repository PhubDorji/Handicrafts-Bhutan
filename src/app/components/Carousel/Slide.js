import Link from 'next/link';
import styles from './Carousel.module.css';

const Slide = ({ slide }) => {
  return (
    <div className={styles.sitem}>
      <img src={slide.image} alt={slide.title} />
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
