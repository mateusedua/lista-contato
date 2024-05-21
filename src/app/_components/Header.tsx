import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import Link from "next/link"
import DropDoewnMenuAcount from "./DropdownMenuAcount"

export default function Header() {
    return (
        <Card className="rounded-t-none">
            <CardContent className="p-5 flex justify-between">
                <Link href='/'>
                    <Image src="/Logo.png" height={200} width={200} alt="Logo" />
                </Link>
                <DropDoewnMenuAcount />
            </CardContent>
        </Card>
    )
}

