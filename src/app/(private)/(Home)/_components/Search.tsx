'use client'

import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { SearchIcon } from 'lucide-react'
import { FormEventHandler, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const Search = () => {

    const router = useRouter()

    const [search, setSearch] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()


        if (!search) {
            router.push("/")
        }

        router.push(`/?search=${search}`)
    }

    useEffect(() => {
        setSearch('')
    }, [])

    return (
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <Input placeholder="Busque por um contato pelo nome ..."
                value={search}
                onChange={handleChange}
            />
            <Button variant={'default'} type="submit">
                <SearchIcon size={20} />
            </Button>
        </form>
    )
}

export default Search