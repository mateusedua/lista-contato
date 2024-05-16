'use server'

import { revalidatePath } from "next/cache"

const deleteContato = async (idContato: string) => {
    const result = await fetch(`${process.env.API_URL}api/contato/deletar`, {
        method: 'DELETE',
        body: JSON.stringify({
            idcontato: idContato
        })
    })

    const data = await result.json()

    revalidatePath("/")

    return {
        status: result.status,
        data: data
    }
}

export default deleteContato