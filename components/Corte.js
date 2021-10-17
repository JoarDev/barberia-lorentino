import styles from "../styles/Corte.module.css";
import Link from "next/link";

export default function Corte({ corte }) {
  const { slug, foto, likes, titulo } = corte;
    //el div dentro del link es porque no se puede tener dos o mas cosas dentro
  return (
    <div key={slug} className={styles.card}>
      <Link href={`/cortes/${slug}`} >
        <div>
          <img src={foto.url} alt={titulo} />
          <h3>{titulo}</h3>
        </div>
      </Link>
    </div>
  );
}
