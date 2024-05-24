'use server'

import { cookies } from "next/headers"

const selectCategoria = async () => {
    const token = cookies().get('token')
    const result = await fetch(`https://api-lista-contato.mateuseduardoteuta10.workers.dev/api/categoria`, {
        headers: {
            "Authorization": `Bearer ${token?.value}`
        }
    })
    return await result.json()
}

export default selectCategoria