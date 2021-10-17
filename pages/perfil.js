import { gql } from "@apollo/client";
import TablaTurnos from "../components/TablaTurnos";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0';
import InfoUsuario from "../components/InfoUsuario";
import { useEffect, useState } from "react";

export default withPageAuthRequired(function Perfil() {

    const { user, error, isLoading } = useUser();
    const [turnos, setTurnos] = useState([])

    useEffect(() => {
      const fetching = async () => {
        const response = await fetch('/api/getTurnos',{
          method: 'POST',
          body: JSON.stringify({
            email: user.email
          })
        })
        const body = await response.json()
        // body.cliente.turnos.map(a => console.log(a))
        setTurnos(body.cliente.turnos)
      }
  
      fetching()
    }, [])

    const getPuntaje = () => {
      return turnos.filter(turno => turno.estado === "Atendido").length
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    // console.log(turnos)
    return (
        <>
        <Navbar />
        {user && (
            <InfoUsuario user={user} puntaje={getPuntaje()}/>
        )}
        <TablaTurnos turnos={turnos}/>
        <Footer />
        </>
    );
})
