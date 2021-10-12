import client from '../../apollo/client';
import { gql } from "@apollo/client";

export default async function handler(req, res) {

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
          }
        }
      }
    `

      const {body} = req
      const email = JSON.parse(body)
    //   console.log(email)

    const response = await client.query({
        query: query,
        variables: email
    })
    // console.log("termino bien. i guess")
    // console.log(response.data)
    // const body_fetch = await response.body.json()
    res.status(200).json(response.data)
}