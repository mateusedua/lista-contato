'use server'

import { ContatoProps } from "@/app/_helpers/interfaces"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

const alterarContato = async (contato: ContatoProps, idcontato: string) => {

    const token = cookies().get('token')

    const result = await fetch(`${process.env.API_URL}api/contato/alterar`, {
        method: 'PUT',
        body: JSON.stringify({
            data: contato,
            idcontato: idcontato
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

export default alterarContato