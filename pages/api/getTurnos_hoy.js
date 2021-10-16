import client from '../../apollo/client';
import { gql } from "@apollo/client";

export default async function handler(req, res) {

    const query = gql`
    query getTurnos_hoy($inicio: DateTime,$fin: DateTime) {
        turnos(
          where: {fechaHora_gte: $inicio, fechaHora_lte: $fin}
        ) {
          recorte
          fechaHora
          estado
          cliente {
            nombre
          }
          barbero {
            nombre
          }
          id
        }
      }
    `

      const {body} = req
      const params = JSON.parse(body)
    //   console.log(email)

    const response = await client.query({
        query: query,
        variables: params
    })
    // console.log("termino bien. i guess")
    // console.log(response.data)
    // const body_fetch = await response.body.json()
    res.status(200).json(response.data)
}