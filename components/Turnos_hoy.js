import styles from '../styles/Turnos_hoy.module.css'
import Router from 'next/router'

const formatFecha = (date_string) => {
    // console.log(date_string)
    const date = new Date(date_string)
    return `${date.getDate()}/${date.getMonth()}`
}
const formatHora = (date_string) => {
    const date = new Date(date_string)
    return `${date.getHours()}:${date.getMinutes()}`
}
const handleClick = (e) => {
    e.preventDefault()
    // console.log(e)
    saveAtentionAPI(e.target.attributes["data-id"].value)
}
const saveAtentionAPI = async (id) => {
    const res = await fetch('/api/saveAtention',{
      method: 'POST',
      body: JSON.stringify({variables: {
          id: id,
        }})
    })
    const body = await res.json()
    console.log(body)
    Router.reload(window.location.pathname)
  }

export default function Turnos_hoy({turnos}) {
    return (
        <div className={styles.container}>
            <div key="owo" className={styles.title}>Turnos de hoy</div>
            <div key="ewe" className={styles.headers}>
            <div>Cliente</div>
                <div>Barbero</div>
                <div>Fecha</div>
                <div>Hora</div>
                <div>Estado</div>
                <div>Recorte de barba</div>
            </div>
            {turnos.map((turno) => (
                <div key={turno.id} className={styles.item}>
                    <div>{turno.cliente.nombre}</div>
                    <div>{turno.barbero.nombre}</div>
                    <div>{formatFecha(turno.fechaHora)}</div>
                    <div>{formatHora(turno.fechaHora)}</div>
                    <div>{turno.estado}</div>
                    <div>{turno.recorte?"Con recorte":"Sin Recorte"}</div>
                    {turno.estado=="Reservado"?(<button onClick={handleClick} data-id={turno.id}>Atendido</button>):false}
                </div>
            ))}
        </div>
    )
}
