import Header from "@/app/_components/Header";
import Search from "./_components/Search";
import NovoContato from "./_components/NovoContato";
import ContatoItem from "@/app/_components/contato-item";
import { Contacts } from "@/app/_helpers/interfaces";

export const runtime = 'edge';

export default async function Home() {

  const data = [{
    id_contato: '70763792-7438-489b-90ef-1ab64fb8c16b',
    name: 'Mateus Eduardo',
    categoria: 'Pessoal',
    email: 'mateus@gmail.com',
    celular: '43999831861'
  },
  {
    id_contato: '9755f924-887b-4e7f-b34b-0250b0e89c2d',
    name: 'Mateus Eduardo',
    categoria: 'Pessoal',
    email: 'mateus@gmail.com',
    celular: '43999831861'
  },
  {
    id_contato: 'fca326e0-716d-462e-b3f9-7184cb231166',
    name: 'Mateus Eduardo',
    categoria: 'Pessoal',
    email: 'mateus@gmail.com',
    celular: '43999831861'
  },
  {
    id_contato: 'e426ad78-0cbf-445e-8083-f1bce9433905',
    name: 'Mateus Eduardo',
    categoria: 'Pessoal',
    email: 'mateus@gmail.com',
    celular: '43999831861'
  },
  {
    id_contato: 'b56f8b16-dd02-4a68-a0e6-5e19d389ac53',
    name: 'Mateus Eduardo',
    categoria: 'Pessoal',
    email: 'mateus@gmail.com',
    celular: '43999831861'
  },]

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
            data.map((item: Contacts) => <ContatoItem key={item.id_contato} contacts={item} />)
          }
        </div>
      </div>
    </div>
  );
}
