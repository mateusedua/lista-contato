'use server'

const selectContato = async (idcontato: string) => {
    const result = await fetch(`${process.env.API_URL}api/contato/one/${idcontato}`)
    const contato = await result.json()

    return {
        status: result.status,
        data: contato[0]
    }
}

export default selectContato