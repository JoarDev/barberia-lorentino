import {gql, GraphQLClient} from 'graphql-request'
import Catalogo from '../components/Catalogo';

export const getStaticProps = async () => {
  const token = process.env.GRAPH_CMS_TOKEN
  const url = process.env.GRAPH_CMS_ENDPOINT
  const graphcms = new GraphQLClient(url,{
  headers:{
    "Authorization": `Bearer ${token}`
  }})

  const query = gql`
  query {
    cortes {
      slug,
      titulo,
      foto {
        url,
      },
    }
  }
  `

  const {cortes} = await graphcms.request(query)
  // console.log(cortes)

  return {
    props:{
      cortes
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
    <Catalogo cortes={cortes}/>
  )
}

export default Home