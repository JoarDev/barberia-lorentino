import styles from '../styles/Hero.module.css'

export default function Hero() {
    return (
        <div className={styles.hero_image}>
            <div className={styles.hero_text}>
                <h1>Barberia Lorentino</h1>
                <p>INSO II - grupo 02</p>
            </div>
        </div>
    )
}