'use client'

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { LockKeyhole, LockKeyholeOpen } from 'lucide-react';
import loginUser from './_actions/login-user';
import { Toaster, toast } from "sonner"
import { useRouter } from 'next/navigation';


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

    const router = useRouter()

    const [open, setOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            const status = await loginUser(data)
            if (status === 404) {
                return toast.warning("E-mail não encontrado!")
            }
            if (status === 400) {
                return toast.warning("Senha incorreta!")
            }
            if (status !== 200) {
                return toast.error("Erro ao fazer login!")
            }

            if (status === 200) {
                return router.push('/')
            }
        } catch (err) {
            console.log(err)
            return toast.error("Erro ao fazer login!")
        } finally {
            setIsLoading(false)
        }
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
                                        <div className='flex relative items-center'>
                                            <Input placeholder='Senha' {...field} type={open ? 'text' : 'password'} className='h-[50px]' />
                                            <Button
                                                type='button'
                                                variant='ghost'
                                                className='absolute hover:bg-transparent lg:left-[88%] left-[85%]'
                                                onClick={() => setOpen(!open)}
                                            >
                                                {open ? <LockKeyholeOpen /> : <LockKeyhole />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='flex justify-end'>
                            <Link href='/Cadastro'>Fazer Cadastro ?</Link>
                        </div>
                        <Button type='submit' className='text-md h-[50px]' disabled={isLoading}>
                            Entrar
                        </Button>
                    </form>
                </Form>
            </div>
            <Toaster richColors />
        </div>
    )
}

export default Login