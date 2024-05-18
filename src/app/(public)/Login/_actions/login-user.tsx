'use server'

import { UserProps } from "@/app/_helpers/interfaces"

const loginUser = async (user: UserProps) => {
    const result = await fetch(`${process.env.API_URL}api/user/login`, {
        method: "POST",
        body: JSON.stringify(user)
    })

    const data = await result.json()

    if (result.status === 200) {
        console.log(data)
    }

    return result.status
}

export default loginUser