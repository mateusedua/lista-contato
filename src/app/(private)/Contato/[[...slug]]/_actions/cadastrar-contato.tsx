'use server'

import { revalidatePath } from "next/cache"
import { ContatoProps } from "@/app/_helpers/interfaces"

const cadastrarContato = async (contato: ContatoProps) => {
    const result = await fetch(`${process.env.API_URL}api/contato/cadastrar`, {
        method: "POST",
        body: JSON.stringify({
            data: contato
        })
    })
    const data = await result.json()

    revalidatePath("/")

    return {
        status: result.status,
        data: data
    }
}

export default cadastrarContato