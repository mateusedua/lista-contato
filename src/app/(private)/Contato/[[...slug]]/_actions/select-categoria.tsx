


const selectCategoria = async () => {
    const result = await fetch(`${process.env.API_URL}api/categoria`)
    return await result.json()
}

export default selectCategoria