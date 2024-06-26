'use server'

import Header from "@/app/_components/Header";
import Search from "./_components/Search";
import NovoContato from "./_components/NovoContato";
import ContatoItem from "@/app/_components/contato-item";
import { ContatoProps } from "@/app/_helpers/interfaces";
import { Toaster } from "sonner";
import { cookies } from "next/headers";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  const token = cookies().get('token');
  const search = searchParams.search === undefined ? "" : "/" + searchParams.search

  const result = await fetch(`${process.env.API_URL}api/contato${search}`, {
    headers: {
      "Authorization": `Bearer ${token?.value}`
    }
  })
  const contatos = await result.json();

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center px-5">
        <div className="w-full mt-6  lg:w-full lg:max-w-xl xl:max-w-3xl">
          <Search />
        </div>
        <div className="flex mt-6  items-center w-full justify-between lg:max-w-xl xl:max-w-3xl">
          <h2 className="text-xl font-bold">{contatos.length} contatos</h2>
          <NovoContato />
        </div>
        <div className="w-full mt-6 lg:max-w-xl xl:max-w-3xl">
          <div className="border-b-2 border-white"></div>
        </div>
        <div className="w-full lg:max-w-xl xl:max-w-3xl mb-2">
          {
            contatos.map((item: ContatoProps) => <ContatoItem key={item.id_contato} contacts={item} />)
          }
        </div>
      </div>
      <Toaster richColors />
    </div>
  );
}
