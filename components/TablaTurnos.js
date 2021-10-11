import styles from '../styles/TablaTurnos.module.css'

const formatFecha = (date_string) => {
    // console.log(date_string)
    const date = new Date(date_string)
    return `${date.getDate()}/${date.getMonth()}`
}
const formatHora = (date_string) => {
    const date = new Date(date_string)
    return `${date.getHours()}:${date.getMinutes()}`
}

export default function TablaTurnos({turnos}) {
    return (
        <div className={styles.container}>
            <div className={styles.title}>Historial de turnos</div>
            <div className={styles.headers}>
                <div>Nombre de Barbero</div>
                <div>Fecha</div>
                <div>Hora</div>
                <div>Estado</div>
                <div>Recorte de barba</div>
            </div>
            {turnos.map((turno) => (
                <div key={turno.id} className={styles.item}>
                    <div>{turno.barbero.nombre}</div>
                    <div>{formatFecha(turno.fechaHora)}</div>
                    <div>{formatHora(turno.fechaHora)}</div>
                    <div>{turno.estado}</div>
                    <div>{turno.recorte?"Con recorte":"Sin Recorte"}</div>
                </div>
            ))}
        </div>
    )
}
