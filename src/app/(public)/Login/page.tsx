'use client'

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import Link from 'next/link';

const formSchema = z.object({
    email: z
        .string()
        .min(1, "E-mail Obrigatório")
        .email("E-mail Inválido"),
    password: z
        .string()
        .min(8, "Minimo 8 characteres")
})

const Login = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
    }

    return (
        <div className='flex justify-center items-center h-[100vh]'>
            <div className='w-full max-w-lg'>
                <div className="flex justify-center mb-7">
                    <Image src='/Logo.png' height={200} width={200} alt="Logo" />
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='px-5 flex flex-col gap-4'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder='E-mail' {...field} className='h-[50px]' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder='Senha' {...field} className='h-[50px]' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='flex justify-end'>
                            <Link href='/Cadastro'>Fazer Cadastro ?</Link>
                        </div>
                        <Button type='submit' className='text-md h-[50px]'>
                            Entrar
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Login