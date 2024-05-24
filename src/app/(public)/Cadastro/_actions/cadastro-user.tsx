'use server'

import { UserProps } from "@/app/_helpers/interfaces"

const cadastroUser = async (user: UserProps) => {

    const result = await fetch(`https://api-lista-contato.mateuseduardoteuta10.workers.dev/api/user/cadastrar`, {
        method: "POST",
        body: JSON.stringify(user)
    })

    return result.status
}

export default cadastroUser