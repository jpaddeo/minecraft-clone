import { dirtImg, grassImg, glassImg, logImg, woodImg } from './images.js'

import { TextureLoader, RepeatWrapping, NearestFilter } from 'three'

const dirtTexture = new TextureLoader().load(dirtImg)
const groundTexture = new TextureLoader().load(grassImg)
const glassTexture = new TextureLoader().load(glassImg)
const logTexture = new TextureLoader().load(logImg)
const woodTexture = new TextureLoader().load(woodImg)

groundTexture.wrapS = RepeatWrapping
groundTexture.wrapT = RepeatWrapping

dirtTexture.magFilter = NearestFilter
groundTexture.magFilter = NearestFilter
glassTexture.magFilter = NearestFilter
logTexture.magFilter = NearestFilter
woodTexture.magFilter = NearestFilter

export { dirtTexture, groundTexture, glassTexture, logTexture, woodTexture }
