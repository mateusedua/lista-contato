import Header from "@/app/_components/Header";
import Search from "./_components/Search";
import NovoContato from "./_components/NovoContato";
import ContatoItem from "@/app/_components/contato-item";
import { ContatoProps } from "@/app/_helpers/interfaces";

export const runtime = 'edge';

export default async function Home() {

  const result = await fetch(`${process.env.API_URL}api/contato/09f02ace9d36ad7a583e4fb252fb957e`)
  const contatos = await result.json();

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center px-5">
        <div className="w-full mt-6  lg:w-full lg:max-w-xl xl:max-w-3xl">
          <Search />
        </div>
        <div className="flex mt-6  items-center w-full justify-between lg:max-w-xl xl:max-w-3xl">
          <h2 className="text-xl font-bold">3 contatos</h2>
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
    </div>
  );
}
