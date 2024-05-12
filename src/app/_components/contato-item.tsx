'use client'

import { ContatoProps } from "../_helpers/interfaces";
import {
    Card,
    CardContent,
    CardHeader
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { SquarePen, Trash } from 'lucide-react';
import { useRouter } from "next/navigation";

interface ContactsProps {
    contacts: ContatoProps
}

const ContatoItem = ({ contacts }: ContactsProps) => {

    const router = useRouter()

    return (
        <Card className="mt-5">
            <CardHeader>
                <div>
                </div>
            </CardHeader>
            <CardContent className="flex justify-between">
                <div className="flex gap-2 flex-col">
                    <div className="flex gap-2">
                        <h2 className="font-bold">{contacts.nome}</h2>
                        <Badge>{contacts.categoria}</Badge>
                    </div>
                    <h3>{contacts.email}</h3>
                    <h3>{contacts.celular}</h3>
                </div>
                <div className="flex gap-2 items-center">
                    <Button variant="outline" size="icon" onClick={() => router.push(`/Contato/${contacts.id_contato}`)}>
                        <SquarePen />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Trash />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default ContatoItem