import { gql } from "@apollo/client";
import client from '../apollo/client';
import Catalogo from '../components/Catalogo';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export const getServerSideProps = async () => {
  
    const query = gql`
    query getCortes {
      cortes {
        slug,
        titulo,
        foto {
          url,
        },
      }
    }
    `
  
    const { data } = await client.query({
      query: query,
    });
  
    return {
      props:{
        cortes: data.cortes,
      }
    }
  }
  
  const Catalogo_page = ({cortes}) => {
    return (
      <>
      <Navbar />
      <Catalogo cortes={cortes}/>
      <Footer />
      </>
    )
  }
  
  export default Catalogo_page