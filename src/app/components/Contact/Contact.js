'use client';

import { useEffect } from 'react';
import styles from '../styles/Contact.module.css';

const Contact = () => {
  useEffect(() => {
    const initScrollReveal = async () => {
      const ScrollReveal = (await import('scrollreveal')).default;

      ScrollReveal().reveal(`.${styles.contactCol} h4`, {
        distance: '50px',
        origin: 'bottom',
        duration: 1000,
        reset: true,
        delay: 200,
      });

      ScrollReveal().reveal(`.${styles.contactCol} p`, {
        distance: '50px',
        origin: 'bottom',
        duration: 1000,
        reset: true,
        delay: 400,
      });

      ScrollReveal().reveal(`.${styles.contactCard}`, {
        distance: '50px',
        origin: 'bottom',
        duration: 1000,
        reset: true,
        interval: 400,
      });
    };

    initScrollReveal();
  }, []);

  return (
    <section className={styles.contact} id="contact">
      <div className={`section__container ${styles.contactContainer}`}>
        <div className={styles.contactCol}>
          <h4>Get in Touch with a Handicraft Specialist</h4>
          <p>We&apos;re committed to responding within 24 hours.</p>
        </div>

        <div className={styles.contactCol}>
          <div className={styles.contactCard}>
            <span><i className="ri-phone-line"></i></span>
            <h4>Call us</h4>
            <h5>+975 77209578</h5>
          </div>
        </div>

        <div className={styles.contactCol}>
          <div className={styles.contactCard}>
            <span><i className="ri-mail-line"></i></span>
            <h4>Send us an enquiry</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;