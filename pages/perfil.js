import { gql } from "@apollo/client";
import client from '../apollo/client';
import TablaTurnos from "../components/TablaTurnos";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export const getServerSideProps = async () => {
  // const token = process.env.GRAPH_CMS_TOKEN
  // const url = process.env.GRAPH_CMS_ENDPOINT

  const query = gql`
    query getTurnosFromClient($email: String) {
      cliente(where: { email: $email }) {
        turnos {
          estado
          recorte
          barbero {
            nombre
          }
          fechaHora
          id
        }
      }
    }
  `;

  const { data } = await client.query({
    query: query,
    variables: {
        email: "c2@gmail.com"
    }
  });

  return {
    props: {
      turnos: data.cliente.turnos,
    },
  };
};

export default function Perfil({turnos}) {
    // console.log(turnos)
    return (
        <>
        <Navbar />
        <TablaTurnos turnos={turnos}/>
        <Footer />
        </>
    );
}
