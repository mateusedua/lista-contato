import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import Image from "next/image"
import { MenuIcon } from 'lucide-react'
import Link from "next/link"

export default function Header() {
    return (
        <Card className="rounded-t-none">
            <CardContent className="p-5 flex justify-between">
                <Link href='/'>
                    <Image src="/Logo.png" height={200} width={200} alt="Logo" />
                </Link>
                <Button variant="outline" size="icon">
                    <MenuIcon size={26} />
                </Button>
            </CardContent>
        </Card>
    )
}

