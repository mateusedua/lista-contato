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
import deleteContato from "../_actions/delete-contato";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";

interface ContactsProps {
    contacts: ContatoProps
}

const ContatoItem = ({ contacts }: ContactsProps) => {

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const handleDeletar = async (idContato?: string) => {
        try {
            setIsLoading(true)
            const result = await deleteContato(idContato)
            if (result.status === 200 && result.data === true) {
                toast.success('Contato Deletado!')
            }
            if (result.status !== 200) {
                toast.error("Algo deu errado ao tentar deletar o contato! Tente novamente!")
            }
        } catch (err) {
            toast.error("Algo deu errado ao tentar deletar o contato! Tente novamente!")
        } finally {
            setIsLoading(false)
        }
    }

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
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Trash />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-[90%]">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Deseja deletar realmente o contato?</AlertDialogTitle>
                                <AlertDialogDescription>Essa ação não terá volta!</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeletar(contacts.id_contato)} disabled={isLoading}>Confirmar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    )
}

export default ContatoItem