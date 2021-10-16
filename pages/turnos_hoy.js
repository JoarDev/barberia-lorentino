import Turnos_hoy from "../components/Turnos_hoy";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0';
import { useEffect, useState } from "react";

export default withPageAuthRequired(function Turnos_hoy_page() {

    const { error, isLoading } = useUser();
    const [turnos, setTurnos] = useState([])

    const get_turnos_hoy = (flag) => {
        // const string_date = new Date().toISOString()
        // const date = string_date.split("T")[0]
        const date = "2021-10-15"
        if(flag === "inicio"){
            return date.concat("T00:00:00-03:00")
        }else if(flag === "fin"){
            return date.concat("T23:59:59-03:00")
        }
        
    }

    useEffect(() => {
      const fetching = async () => {
        const response = await fetch('/api/getTurnos_hoy',{
          method: 'POST',
          body: JSON.stringify({
            inicio: get_turnos_hoy("inicio"),
            fin: get_turnos_hoy("fin"),
          })
        })
        const body = await response.json()
        // body.cliente.turnos.map(a => console.log(a))
        setTurnos(body.turnos)
      }
  
      fetching()
    }, [])

    

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    // console.log(turnos)
    return (
        <>
        <Navbar />
        <Turnos_hoy turnos={turnos}/>
        <Footer />
        </>
    );
})
