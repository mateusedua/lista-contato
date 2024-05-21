'use server'

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

const deleteContato = async (idContato?: string) => {
    const token = cookies().get('token')
    const result = await fetch(`${process.env.API_URL}api/contato/deletar`, {
        method: 'DELETE',
        body: JSON.stringify({
            idcontato: idContato
        }),
        headers: {
            "Authorization": `Bearer ${token?.value}`
        }
    })

    const data = await result.json()

    revalidatePath("/")

    return {
        status: result.status,
        data: data
    }
}

export default deleteContato