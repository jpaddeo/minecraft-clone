import { useState } from 'react'
import { useBox } from '@react-three/cannon'
import * as textures from '../images/textures'
import { useCallback } from 'react'
import { useStore } from '../hooks/useStore'

export default function Cube({ id, position, texture }) {
  const [hovered, setHovered] = useState(false)
  const [removeCube] = useStore((state) => [state.removeCube])
  const [ref] = useBox(() => ({
    type: 'Static',
    position
  }))

  const activeTexture = textures[`${texture}Texture`]

  const handleCubeClick = useCallback(
    (event) => {
      if (event.altKey) {
        removeCube(id)
      }
    },
    [removeCube, id]
  )

  return (
    <mesh
      ref={ref}
      onPointerMove={(event) => {
        event.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={(event) => {
        event.stopPropagation()
        setHovered(false)
      }}
      onClick={handleCubeClick}
    >
      <boxBufferGeometry attach='geometry' />
      <meshStandardMaterial
        color={hovered ? 'grey' : 'white'}
        transparent
        attach='material'
        map={activeTexture}
      />
    </mesh>
  )
}
