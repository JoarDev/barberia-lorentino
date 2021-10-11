import { gql } from "@apollo/client";
import client from '../apollo/client';
import Catalogo from '../components/Catalogo';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

//Todo change to getServerSide pRopsss please. dont use api i guess.
export const getServerSideProps = async () => {
  // const token = process.env.GRAPH_CMS_TOKEN
  // const url = process.env.GRAPH_CMS_ENDPOINT

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

const Home = ({cortes}) => {
  // console.log(cortes)
  // console.log(cortes.map(item => console.log(item)))
  // console.log(cortes[1])
  // console.log(cortes[0])
  return (
    // <div>Hello</div>
    <>
    <Navbar />
    <Catalogo cortes={cortes}/>
    <Footer />
    </>
  )
}

export default Home