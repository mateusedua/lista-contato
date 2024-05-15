'use server'

import { ContatoProps } from "@/app/_helpers/interfaces"
import { revalidatePath } from "next/cache"

const alterarContato = async (contato: ContatoProps, idcontato: string) => {
    const result = await fetch(`${process.env.API_URL}api/contato/alterar`, {
        method: 'POST',
        body: JSON.stringify({
            data: contato,
            idcontato: idcontato
        })
    })

    const data = await result.json()

    revalidatePath("/")

    return {
        status: result.status,
        data: data
    }

}

export default alterarContato