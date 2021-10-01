import Link from 'next/link';
import styles from '../styles/Catalogo.module.css'

const Catalogo = ({ cortes }) => {

    return (
        <div className={styles.gridContainer}>
            {
            cortes.map(({slug, foto, titulo}) => (
                <Link key={slug} href={`/cortes/${slug}`}>
                    <div>
                        <a key={titulo}>{titulo}</a>
                        <img src={foto.url} alt={titulo} />
                    </div>
                </Link>
            ))
            }
        </div>
    );
}
 
export default Catalogo;