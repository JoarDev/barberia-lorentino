import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "../styles/Turno.module.css";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
registerLocale('es', es)
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0';
import { gql } from "@apollo/client";
import client from '../apollo/client';

export const getServerSideProps = async () => {

  const query = gql`
  query getBarberos {
    barberos {
      email
      nombre
    }
  }
  `

  const { data } = await client.query({
    query: query,
  });

  return {
    props:{
      barberos: data.barberos,
    }
  }
}

const mutationTurno = gql`
mutation saveTurno($recorte: Boolean, $fechaHora: DateTime, $estado: EstadoTurno, $cliente_email: String, $barbero_email: String) {
  __typename
  createTurno(
    data: {estado: $estado, recorte: $recorte, fechaHora: $fechaHora, cliente: {connect: {email: $cliente_email}}, barbero: {connect: {email: $barbero_email}}}
  ) {
    id
  }
}
`

export default withPageAuthRequired(function Turno({barberos}) {
  
    const { user } = useUser();

    const [barbero_email, setBarbero_email] = useState("default")
    const [recorte, setRecorte] = useState("default")
    const [startDate, setStartDate] = useState(null)
    
    const min_tiempo = new Date()
    const max_tiempo = new Date()
    min_tiempo.setHours(10)
    min_tiempo.setMinutes(0)
    max_tiempo.setHours(19)
    max_tiempo.setMinutes(59)
    
    const open_following_date = (date) => {
        const day = date.getDay();
        const day_of_month = date.getDate();
        if(day == 0){
            return date.setDate(day_of_month+1)
        }else if (day == 6){
            return date.setDate(day_of_month+2)
        }
        return date
    }

    const isWeekday = (date) => {
        const day = date.getDay();
        if(day !== 0 && day !== 6){
            return true
        }
    };

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
    
        return currentDate.getTime() < selectedDate.getTime();
    };

    const saveTurnoAPI = async (recorte_boolean) => {
      const res = await fetch('/api/saveTurno',{
        method: 'POST',
        body: JSON.stringify({variables: {
            recorte: recorte_boolean,
            estado: "Reservado",
            fechaHora: startDate.toISOString(),
            barbero_email: barbero_email,
            cliente_email: user.email,
          }})
      })
      const body = await res.json()
      console.log(body)
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      // console.log(startDate.toISOString())
      // console.log(barbero_email)
      // console.log(client)
      let recorte_boolean = false

      if(recorte == 'CON'){
        recorte_boolean = true
      }

      saveTurnoAPI(recorte_boolean)
    }
  return (
    <>
      <Navbar />
      <div className={styles.formulario}>
        <h2>Nuevo Turno</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="text" value={user.email} disabled/>
          <label>Barbero</label>
          <select value={barbero_email} onChange={(e)=>setBarbero_email(e.target.value)}>
            <option value="default" disabled hidden>Seleccione...</option>
            {barberos.map((barbero) => (
              <option key={barbero.email} value={barbero.email}>{barbero.nombre}</option>
            ))}
          </select>
          <label>Recorte de barba</label>
          <select value={recorte} onChange={(e)=>setRecorte(e.target.value)}>
            <option value="default" disabled hidden>Seleccione...</option>
            <option value="CON">Con recorte de barba</option>
            <option value="SIN">Sin recorte de barba</option>
          </select>
          <label>Fecha y hora</label>
          <DatePicker 
          selected={startDate} 
          onChange={date => setStartDate(date)} 
          minDate={new Date()} 
          showTimeSelect 
          placeholderText="Seleccione una fecha y hora" 
          filterDate={isWeekday} filterTime={filterPassedTime} 
          minTime={min_tiempo}
          maxTime={max_tiempo}
          strictParsing
          openToDate={open_following_date(new Date())}
          locale="es"
          withPortal
          dateFormat="d MMMM • h:mm aa"
          >
            <div style={{ color: "red" }}>Las horas que no se pueden seleccionar ya estan reservadas</div>
          </DatePicker>
          <button>Reservar turno</button>
        </form>
      </div>
      <Footer />
    </>
  );
})
