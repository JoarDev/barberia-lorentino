import styles from '../styles/InfoUsuario.module.css'

export default function InfoUsuario({user, puntaje}) {
    return (
        <div className={styles.container}>
            <img src={user.picture}/>
            <div>Nombre de usuario: {user.nickname}</div>
            <div>Email: {user.email}</div>
            <h3>Puntaje: {puntaje}</h3>
        </div>
    )
}
