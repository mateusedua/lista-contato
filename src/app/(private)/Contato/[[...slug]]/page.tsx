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
import Image from "next/image"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/app/_components/ui/select"
import { SelectValue } from "@/app/_components/ui/select"
import formatPhone from "@/app/_lib/format-phone"
import selectCategoria from "./_actions/select-categoria"
import selectContato from "./_actions/select-contato"
import { useEffect, useState } from "react"
import { CategoriaProps } from "@/app/_helpers/interfaces"

const formSchema = z.object({
    nome: z.string().trim().min(1, "Campo obrigatorio"),
    email: z.string().trim().min(1, "Campo obrigatorio").email("E-mail inválido"),
    telefone: z.string().min(1, "Campo obrigatorio"),
    categoria: z.string().min(1, "Campo obrigatorio")
})

const Contato = ({ params }: any) => {

    const [categoria, setCategoria] = useState([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            email: "",
            telefone: "",
            categoria: ""
        }
    })

    const handleSubmitCadastrar = (data: z.infer<typeof formSchema>) => {
        console.log(data)
    }

    const handleSubmitAlterar = (data: z.infer<typeof formSchema>) => {
        console.log(data)
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
                        telefone: oneContato.data.celular,
                        categoria: oneContato.data.id_categoria
                    })
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
                                name="telefone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Telefone"
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
                            <Button type="submit" className="text-md h-[50px]">
                                {
                                    params.slug === undefined ?
                                        <p>Cadastrar</p>
                                        :
                                        <p>Alterar</p>
                                }
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Contato