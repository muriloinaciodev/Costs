import { FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'
import styles from './Footer.module.css'

export function Footer () {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li><a href="https://www.facebook.com" target='_blank'> <FaFacebook/> </a></li>
        <li><a href="https://instagram.com" target='blank'> <FaInstagram/> </a></li>
        <li><a href="https://br.linkedin.com" target='blank'> <FaLinkedin/> </a></li>
      </ul>
      <p className={styles.copy_right}><span>Costs</span> &copy; 2024</p>
    </footer>
  )
}