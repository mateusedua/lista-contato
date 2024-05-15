export type ContatoProps = {
    id_contato?: string,
    id_categoria?: string,
    categoria: string,
    nome: string,
    email: string,
    celular: string
}

export type CategoriaProps = {
    id_categoria: string,
    categoria: string
}