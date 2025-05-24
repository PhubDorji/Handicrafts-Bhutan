import Image from 'next/image';
import styles from './Carousel.module.css';

const Thumbnail = ({ slide }) => {
  return (
    <div className={styles.sitem}>
      <Image 
        src={slide.image} 
        alt={slide.thumbnailTitle}
        width={200} // adjust as needed
        height={150} // adjust as needed
      />
      <div className={styles.scontent}>
        <div className={styles.stitle}>{slide.thumbnailTitle}</div>
        <div className={styles.sdescription}>{slide.thumbnailDescription}</div>
      </div>
    </div>
  );
};

export default Thumbnail;