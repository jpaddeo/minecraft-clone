import { useState, useEffect } from 'react'

import * as images from '../images/images'
import { useStore } from '../hooks/useStore'
import { useKeyboard } from '../hooks/useKeyboard'

const VISIBILITY_TIMEOUT_SECONDS = 1

export default function TextureSelector() {
  const [visible, setVisible] = useState(false)
  const [texture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture
  ])

  const { dirt, grass, glass, wood, log } = useKeyboard()

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false)
    }, VISIBILITY_TIMEOUT_SECONDS * 1000)
    setVisible(true)
    return () => {
      clearTimeout(visibilityTimeout)
    }
  }, [texture])

  useEffect(() => {
    const options = { dirt, grass, glass, wood, log }
    const selectedTexture = Object.entries(options).find(
      ([texture, isEnabled]) => isEnabled
    )
    if (selectedTexture) {
      const [textureName] = selectedTexture
      setTexture(textureName)
    }
  }, [dirt, grass, glass, wood, log])

  return (
    <div className={`texture-selector ${visible ? '' : 'hidden'}`}>
      {Object.entries(images).map(([imageKey, image]) => (
        <img
          key={imageKey}
          src={image}
          alt={imageKey}
          className={texture === imageKey.replace('Img', '') ? 'selected' : ''}
        />
      ))}
    </div>
  )
}
