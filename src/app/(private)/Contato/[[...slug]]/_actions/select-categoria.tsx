'use server'

import { cookies } from "next/headers"

const selectCategoria = async () => {
    const token = cookies().get('token')
    const result = await fetch(`${process.env.API_URL}api/categoria`, {
        headers: {
            "Authorization": `Bearer ${token?.value}`
        }
    })
    return await result.json()
}

export default selectCategoria