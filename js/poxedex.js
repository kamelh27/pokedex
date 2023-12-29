import { getPokemon, getSpecies} from './api.js'
import { createChart } from './charts.js'

const $image = document.querySelector('#image')

const $description = document.querySelector('#description')

export function setImage (image) {
  $image.src = image
}

function setDescription (text) {
  $description.textContent = text
}

const $screen = document.querySelector('#screen')

function loader(isLoading = false) {
  const img = isLoading ? 'url(./images/loading.gif)' : ''
  $screen.style.backgroundImage = img
}

let activeUtterance = null
const $light = document.querySelector('#light')

function stopSpeech () {
  if(activeUtterance) {
    speechSynthesis.cancel()
    activeUtterance = null
    $light.classList.remove('is-animated')   
  }
}



function speech (text) {
  stopSpeech()
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es'
  speechSynthesis.speak(utterance);

 
  $light.classList.add('is-animated')
  

  utterance.addEventListener('start', () => {
    activeUtterance = utterance
  })

  utterance.addEventListener('end', () => {
   $light.classList.remove('is-animated')
  })
}


async function findPokemon (id) {
  
    const pokemon = await getPokemon(id)
    const species = await getSpecies(id)
  
    const sprites = [pokemon.sprites.front_default]
    const description = species.flavor_text_entries.find((flavor) => flavor.language.name === 'es')
  
    const stats = pokemon.stats.map(item => item.base_stat)
  
    for(const item in pokemon.sprites) {
      if(item !== 'front_default' && item !== 'other' && item !== 'versions' &&  pokemon.sprites[item]) {
        sprites.push(pokemon.sprites[item])
      }
    }
    return {
      sprites,
      description: description.flavor_text,
      id: pokemon.id,
      name: pokemon.name,
      stats
    }
  
}

let activeChart = null

export async function setPokemon (id) {
  loader(true)
 
    stopSpeech()
    const pokemon = await findPokemon(id)
    loader(false)
    setImage(pokemon.sprites[0])
    setDescription(pokemon.description)
    speech(`${pokemon.name}. ${pokemon.description}`)
    if(activeChart instanceof Chart) {
      activeChart.destroy()
    }
    activeChart = createChart(pokemon.stats)
    return pokemon    
}