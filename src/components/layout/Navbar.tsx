import { Link } from 'react-router-dom'
import { Container } from './Container'
import logo from '../../img/costs_logo.png'
import styles from './Navbar.module.css'

export function Navbar () {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to='/'>
          <img src={logo} alt="Logo do Coasts"/>
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}> <Link to='/'>Home</Link> </li>
          <li className={styles.item}> <Link to='/projects'>Projetos</Link> </li>
          <li className={styles.item}> <Link to='/company'>Empresa</Link> </li>
          <li className={styles.item}> <Link to='/contact'>Contato</Link> </li>
        </ul>
      </Container>
    </nav>
  )
}