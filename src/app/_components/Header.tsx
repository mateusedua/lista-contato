import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import Image from "next/image"
import { MenuIcon } from 'lucide-react'

export default function Header() {
    return (
        <Card>
            <CardContent className="p-5 flex justify-between">
                <Image src="" height={18} width={120} alt="Logo" />
                <Button variant="outline" size="icon">
                    <MenuIcon size={26} />
                </Button>
            </CardContent>
        </Card>
    )
}

