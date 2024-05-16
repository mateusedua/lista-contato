"use client"
import { Input } from "@/app/_components/ui/input"
import { Button } from "@/app/_components/ui/button"
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage
} from "@/app/_components/ui/form"
import Header from "@/app/_components/Header"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/app/_components/ui/select"
import { SelectValue } from "@/app/_components/ui/select"
import formatPhone from "@/app/_lib/format-phone"
import selectCategoria from "./_actions/select-categoria"
import selectContato from "./_actions/select-contato"
import alterarContato from "./_actions/alterar-contato"
import cadastrarContato from "./_actions/cadastrar-contato"
import { useEffect, useState } from "react"
import { CategoriaProps } from "@/app/_helpers/interfaces"
import { useRouter } from "next/navigation"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog"
import { Toaster, toast } from "sonner"
import Link from "next/link"
import { MoveLeft } from 'lucide-react';

const formSchema = z.object({
    nome: z.string().trim().min(1, "Campo obrigatorio"),
    email: z.string().trim().min(1, "Campo obrigatorio").email("E-mail inválido"),
    celular: z.string().min(1, "Campo obrigatorio"),
    categoria: z.string().min(1, "Campo obrigatorio")
})

const Contato = ({ params }: any) => {

    const router = useRouter()

    const [categoria, setCategoria] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            email: "",
            celular: "",
            categoria: ""
        }
    })

    const handleSubmitCadastrar = async (data: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            const result = await cadastrarContato(data)

            if (result.status === 200 && result.data === true) {
                toast.success('Contato Cadastrado!', {
                    duration: 1000,
                    onAutoClose: () => router.push('/')
                })
            }
            if (result.status !== 200) {
                toast.error("Algo deu errado ao tentar cadastrar o contato! Tente novamente!")
            }
        } catch (err) {
            console.log(err)
            toast.error("Algo deu errado ao tentar cadastrar o contato! Tente novamente!")
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmitAlterar = async (data: z.infer<typeof formSchema>) => {

        try {
            setIsLoading(true)
            const result = await alterarContato(data, params.slug[0])
            if (result.status === 200 && result.data === true) {
                toast.success('Contato alterado!', {
                    duration: 1000,
                    onAutoClose: () => router.push('/')
                })
            }
            if (result.status !== 200) {
                toast.error("Algo deu errado ao tentar alterar o contato! Tente novamente!")
            }
        } catch (err) {
            toast.error("Algo deu errado ao tentar alterar o contato! Tente novamente!")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const fecthData = async () => {
            const result = await selectCategoria()
            setCategoria(result)

            if (params.slug !== undefined) {
                const oneContato = await selectContato(params.slug[0])
                if (oneContato.status === 200) {
                    form.reset({
                        nome: oneContato.data.nome,
                        email: oneContato.data.email,
                        celular: oneContato.data.celular,
                        categoria: oneContato.data.id_categoria
                    })
                } else {
                    router.push('/')
                }
            }
        }
        fecthData()
    }, [])

    return (
        <div>
            <Header />
            <div className="flex justify-center">
                <div className="w-full max-w-lg mt-20">
                    <div className="flex justify-center mb-7">
                        {
                            params.slug === undefined ?
                                <h1 className="font-bold text-3xl">Novo Contato</h1>
                                :
                                <h1 className="font-bold text-3xl">Alterar Contato</h1>
                        }
                    </div>
                    <div className="px-5 mb-3">
                        <Link href='/' className="flex gap-2 text-primary font-bold"><MoveLeft />Voltar</Link>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(params.slug === undefined ? handleSubmitCadastrar : handleSubmitAlterar)} className="px-5 flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name="nome"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Nome" {...field} className="h-[50px]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="E-mail" {...field} className="h-[50px]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="celular"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Celular"
                                                value={field.value}
                                                onChange={(e) => field.onChange(e.target.value = formatPhone(e.target.value))}
                                                className="h-[50px]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="categoria"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-[50px]">
                                                    <SelectValue placeholder="Categoria" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    categoria?.map((item: CategoriaProps) => (
                                                        <SelectItem value={item.id_categoria} key={item.id_categoria}>{item.categoria}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {
                                params.slug === undefined ?
                                    <Button className="text-md h-[50px]" type='submit' disabled={isLoading}>Cadastrar</Button>
                                    :
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button className="text-md h-[50px]">Alterar</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="w-[90%]">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Deseja alterar realmente o contato?</AlertDialogTitle>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => form.handleSubmit(handleSubmitAlterar)()} disabled={isLoading}>Confirmar</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                            }
                        </form>
                    </Form>
                </div>
            </div>
            <Toaster richColors />
        </div>
    )
}

export default Contato