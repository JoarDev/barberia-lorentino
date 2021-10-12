import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "../styles/Turno.module.css";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
registerLocale('es', es)
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0';

// export const getServerSideProps = withPageAuthRequired();

export default withPageAuthRequired(function Turno() {

    const { user } = useUser();

    const [barbero, setBarbero] = useState("default")
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
  return (
    <>
      <Navbar />
      <div className={styles.formulario}>
        <h2>Nuevo Turno</h2>
        <form>
          <label>Email</label>
          <input type="text" value={user.email} disabled/>
          <label>Barbero</label>
          <select value={barbero} onChange={setBarbero}>
            <option value="default" disabled hidden>Seleccione...</option>
            <option value="barbero 1">barbero 1</option>
            <option value="barbero 2">barbero 2</option>
          </select>
          <label>Recorte de barba</label>
          <select value={recorte} onChange={setRecorte}>
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
