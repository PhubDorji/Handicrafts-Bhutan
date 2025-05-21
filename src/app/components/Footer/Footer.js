'use client';

import {
  RiFacebookFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiTwitterFill
} from 'react-icons/ri';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <h4 className={styles.footer__title}>Handicrafts</h4>
        <div className={styles.footer__socials}>
          <a href="#"><RiFacebookFill /></a>
          <a href="#"><RiInstagramFill /></a>
          <a href="#"><RiTwitterFill /></a>
          <a href="#"><RiLinkedinFill /></a>
        </div>
        <p className={styles.footer__description}>
          Bhutanese Handicrafts: Preserving cultural heritage with vibrant arts and intricate designs.
        </p>
        <ul className={styles.footer__nav}>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#popular-products">Popular Products</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className={styles.footer__bar}>
          © 2025 Druk | Zorig. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
