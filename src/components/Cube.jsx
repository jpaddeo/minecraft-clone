import { useState } from 'react'
import { useBox } from '@react-three/cannon'
import * as textures from '../images/textures'
import { useCallback } from 'react'
import { useStore } from '../hooks/useStore'

export default function Cube({ id, position, texture }) {
  const [hovered, setHovered] = useState(false)
  const [removeCube, addCube] = useStore((state) => [
    state.removeCube,
    state.addCube
  ])
  const [ref] = useBox(() => ({
    type: 'Static',
    position
  }))

  const activeTexture = textures[`${texture}Texture`]

  const addCubeToFace = (face, position) => {
    const { x, y, z } = ref.current.position
    if (face === 0) {
      addCube(x + 1, y, z)
    }
    if (face === 1) {
      addCube(x - 1, y, z)
    }
    if (face === 2) {
      addCube(x, y + 1, z)
    }
    if (face === 3) {
      addCube(x, y - 1, z)
    }
    if (face === 4) {
      addCube(x, y, z + 1)
    }
    if (face === 5) {
      addCube(x - 1, y, z - 1)
    }
  }

  const handleCubeClick = useCallback(
    (event) => {
      event.stopPropagation()
      if (event.altKey) {
        removeCube(id)
      } else {
        const clickedFace = Math.floor(event.faceIndex / 2)
        console.log(clickedFace)
        addCubeToFace(clickedFace)
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
      <boxGeometry attach='geometry' />
      <meshStandardMaterial
        color={hovered ? 'grey' : 'white'}
        transparent
        opacity={activeTexture === 'glass' ? 0.6 : 1}
        attach='material'
        map={activeTexture}
      />
    </mesh>
  )
}
