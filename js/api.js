const BASE_API = 'https://pokeapi.co/api/v2/'

export async function getPokemon (id) {
  try {
    const response = await fetch(`${BASE_API}pokemon/${id}`)
    if(!response.ok) {
      throw new Error(`Error al obtener el pokémon. Código de estado: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error en getPokemon:', error.message)
    throw error
  }
}

export async function getSpecies(id) {
  try {
    const response = await fetch(`${BASE_API}pokemon-species/${id}/`)
    if(!response.ok) {
      throw new Error(`Error al obtener la species de estado: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error en getSpecies:', error.message)
    throw error
  }
}