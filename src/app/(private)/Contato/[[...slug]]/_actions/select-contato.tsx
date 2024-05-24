'use server'

import { cookies } from "next/headers"

const selectContato = async (idcontato: string) => {
    const token = cookies().get('token')

    const result = await fetch(`${process.env.API_URL}api/contato/one/${idcontato}`, {
        headers: {
            "Authorization": `Bearer ${token?.value}`
        }
    })
    const contato = await result.json()

    return {
        status: result.status,
        data: contato[0]
    }
}

export default selectContato