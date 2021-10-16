import client from '../../apollo/client';
import { gql } from "@apollo/client";

export default async function handler(req, res) {

    const mutationAttetion = gql`
    mutation saveAtention($id: ID) {
        __typename
        updateTurno(data: {estado: Atendido}, where: {id: $id}) {
          id
        }
      }      
    `

      const {body} = req
    //   console.log(body)

    const response = await client.mutate({
        mutation: mutationAttetion,
        variables: JSON.parse(body).variables
    })
    // console.log("termino bien. i guess")
    res.status(200).json(response)
}