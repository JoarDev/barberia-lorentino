import client from '../../apollo/client';
import { gql } from "@apollo/client";

export default async function handler(req, res) {

    const mutationTurno = gql`
    mutation saveTurno($recorte: Boolean, $fechaHora: DateTime, $estado: EstadoTurno, $cliente_email: String, $barbero_email: String) {
    __typename
    createTurno(
        data: {estado: $estado, recorte: $recorte, fechaHora: $fechaHora, cliente: {connect: {email: $cliente_email}}, barbero: {connect: {email: $barbero_email}}}
    ) {
        id
    }
    }
    `

      const {body} = req
    //   console.log(body)

    const response = await client.mutate({
        mutation: mutationTurno,
        variables: JSON.parse(body).variables
    })
    console.log("termino bien. i guess")
    res.status(200).json(response)
}