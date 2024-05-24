'use server'

import { UserProps } from "@/app/_helpers/interfaces"
import { cookies } from "next/headers"

const loginUser = async (user: UserProps) => {
    const result = await fetch(`https://api-lista-contato.mateuseduardoteuta10.workers.dev/api/user/login`, {
        method: "POST",
        body: JSON.stringify(user)
    })

    const data = await result.json()

    if (result.status === 200) {
        cookies().set('token', data)
    }

    return result.status
}

export default loginUser