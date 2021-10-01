import {gql, GraphQLClient} from 'graphql-request'
import Catalogo from '../../components/Catalogo';

const Corte = ({corte}) => {
    const {titulo, foto} = corte
    // console.log(corte)
    console.log(titulo)
    console.log(foto)
    
    return ( 
        <>
            <a key={titulo}>{titulo}</a>
            <img src={foto.url} alt={titulo} />
        </>
     );
}

export const getServerSideProps = async (pageContext) => {
    const token = process.env.GRAPH_CMS_TOKEN
    const url = process.env.GRAPH_CMS_ENDPOINT
    const graphcms = new GraphQLClient(url,{
    headers:{
        "Authorization": `Bearer ${token}`
    }})
    const pageSlug = pageContext.query.slug

    const query = gql`
    query($pageSlug: String!){
        corte(where: {slug: $pageSlug}) {
          slug
          titulo
          foto {
            url
          }
        }
      }
    `
    const variables = {
        pageSlug,
    }

    const {corte} = await graphcms.request(query,variables)
    console.log(corte)

    return {
        props: {
            corte
        }
    }

}
 
export default Corte;