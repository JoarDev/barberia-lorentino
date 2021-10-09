import Link from 'next/link';
import styles from '../styles/Catalogo.module.css'
import Corte from './Corte';

const Catalogo = ({ cortes }) => {
    return (
        <div className={styles.gridContainer}>
            {
            cortes.map((corte) => (
                <Corte corte={corte} />
            ))
            }
        </div>
    );
}
 
export default Catalogo;