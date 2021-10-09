import styles from "../styles/Navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <div>
          <h3 className={styles.link}>Barberia Lorentino</h3>
      </div>
      <div>
        <ul>
          <Link href="/">
            <a className={styles.link}>Inicio</a>
          </Link>
          <Link href="/catalogo">
            <a className={styles.link}>Catalogo</a>
          </Link>
          <Link href="/perfil">
            <a className={styles.link}>Perfil</a>
          </Link>
        </ul>
      </div>
      <Link href="/turno">
        <a className={styles.boton}>Sacar turno</a>
      </Link>
    </nav>
  );
};

export default Navbar;
