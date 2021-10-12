import styles from '../styles/InfoUsuario.module.css'

export default function InfoUsuario({user}) {
    return (
        <div className={styles.container}>
            <img src={user.picture}/>
            <div>Nombre de usuario: {user.nickname}</div>
            <div>Email: {user.email}</div>
        </div>
    )
}
