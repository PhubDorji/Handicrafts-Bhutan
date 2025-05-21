import styles from './Carousel.module.css';

const Thumbnail = ({ slide }) => {
  return (
    <div className={styles.sitem}>
      <img src={slide.image} alt={slide.thumbnailTitle} />
      <div className={styles.scontent}>
        <div className={styles.stitle}>{slide.thumbnailTitle}</div>
        <div className={styles.sdescription}>{slide.thumbnailDescription}</div>
      </div>
    </div>
  );
};

export default Thumbnail;