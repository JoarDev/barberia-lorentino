import styles from '../styles/Catalogo.module.css'
import Corte from './Corte';

const Catalogo = ({ cortes }) => {
    return (
        <div className={styles.gridContainer}>
            {
            cortes.map((corte) => (
                <Corte corte={corte} key={corte.slug}/>
                //omg next/react really wants you to use the key attribute inside a map
            ))
            }
        </div>
    );
}
 
export default Catalogo;