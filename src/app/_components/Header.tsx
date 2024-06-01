import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import Link from "next/link"
import DropDoewnMenuAcount from "./DropdownMenuAcount"
import { cookies } from "next/headers"

export default async function Header() {

    const token = cookies().get('token')
    const result = await fetch(`${process.env.API_URL}api/user`, {
        headers: {
            "Authorization": `Bearer ${token?.value}`
        }
    })
    const user = await result.json()

    return (
        <Card className="rounded-t-none">
            <CardContent className="p-5 flex justify-between">
                <Link href='/'>
                    <Image src="/Logo.png" height={200} width={200} alt="Logo" />
                </Link>
                <DropDoewnMenuAcount nome={user.nome} />
            </CardContent>
        </Card>
    )
}

