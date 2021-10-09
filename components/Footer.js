import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <h3>Barberia Lorentino</h3>
      <ul>
        <li>
          <a href="https://www.facebook.com/Lorentino-Barberia-1778891938857300/">
            Facebook
          </a>
        </li>
        <li>
          <p>0388 475-2075</p>
        </li>
      </ul>
      <div>
        <p>Copyright 2021 Barberia Lorentino</p>
      </div>
    </footer>
  );
}
