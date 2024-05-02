'use client'

import { Button } from "@/app/_components/ui/button"
import { useRouter } from "next/navigation"

const NovoContato = () => {

    const router = useRouter()

    return (
        <Button onClick={() => router.push('/NovoContato')}>Novo Contato</Button>
    )
}

export default NovoContato