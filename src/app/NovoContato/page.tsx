"use client"
import { Input } from "../_components/ui/input"
import { Button } from "../_components/ui/button"
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage
} from "../_components/ui/form"
import Header from "../_components/Header"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../_components/ui/select"
import { SelectValue } from "../_components/ui/select"
import formatPhone from "../_lib/format-phone"
import logo from '../../../Public/Logo.png'

const formSchema = z.object({
    nome: z.string().trim().min(1, "Campo obrigatorio"),
    email: z.string().trim().min(1, "Campo obrigatorio").email("E-mail inválido"),
    telefone: z.string().min(1, "Campo obrigatorio"),
    categoria: z.string().min(1, "Campo obrigatorio")
})

const NovoContato = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            email: "",
            telefone: "",
            categoria: ""
        }
    })


    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
    }

    return (
        <div>
            <Header />
            <div className="flex justify-center">
                <div className="w-full max-w-lg mt-10">
                    <div className="flex justify-center mb-7">
                        <Image src={logo} height={200} width={200} alt="Logo" />
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="px-5 flex flex-col gap-4">
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
                                                <SelectItem value="1">Pessoal</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="h-[50px]">Cadastrar</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default NovoContato