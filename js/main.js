import './charts.js';
import { setPokemon, setImage } from './poxedex.js'

const $form = document.querySelector('#form')
const $next = document.querySelector('#next-pokemon')
const $prev = document.querySelector('#prev-pokemon')
const $nextImage = document.querySelector('#next-image')
const $preveImage = document.querySelector('#prev-image')
const $input = document.querySelector('#form-input')
const $pokedex = document.querySelector('#pokedex')
const $buttonRandom = document.querySelector('#buttonRandom')

let activePokemon = null

$form.addEventListener('submit',  handleSubmit)
$next.addEventListener('click', handleNextPokemon)
$prev.addEventListener('click', handlePrevPokemon)
$nextImage.addEventListener('click', handleNextImage)
$preveImage.addEventListener('click', handlePreveImage)
$buttonRandom.addEventListener('click', handlePokemonRandom)


async function handlePokemonRandom () {
  const randomDecimal = Math.random()
  const randomIndex = Math.floor(randomDecimal * 898) + 1
  activePokemon = await setPokemon(randomIndex)

  setIncreaseCounter(activePokemon.id)
}


async function handleSubmit (event) {
  event.preventDefault()
  $pokedex.classList.add('is-open')
  const form = new FormData($form)
  const id = form.get('id')
  activePokemon = await setPokemon(id)
}

function setIncreaseCounter (id) {
  $input.value = id
}


async function handleNextPokemon () {
  const id = (activePokemon === null || activePokemon.id === 898) ? 1 : activePokemon.id + 1
  activePokemon = await setPokemon(id)
  setIncreaseCounter(activePokemon.id)
  
}

async function handlePrevPokemon () {
  const id = (activePokemon === null || activePokemon.id === 1) ? 898 : activePokemon.id -1
  activePokemon = await setPokemon(id)
  setIncreaseCounter(activePokemon.id)
}


let activeSprite = 0

function handleNextImage () {
  if(activePokemon === null) return false
  if(activeSprite >=  activePokemon.sprites.length -1) {
    activeSprite = 0
    return setImage(activePokemon.sprites[activeSprite])
  }
  activeSprite += 1
  return setImage(activePokemon.sprites[activeSprite])
}

function handlePreveImage () {
  if(activePokemon === null) return false
  if(activeSprite <= 0) {
    activeSprite = activePokemon.sprites.length -1
    return setImage(activePokemon.sprites[activeSprite])
  }
  activeSprite = activeSprite -1
  return setImage(activePokemon.sprites[activeSprite])
}