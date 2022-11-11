import { useEffect, useRef } from 'react'

import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'

import { Vector3 } from 'three'
import { useKeyboard } from '../hooks/useKeyboard'

const PLAYER_SPEED_WALK = 2
const PLAYER_SPEED_RUN = 5
const PLAYER_JUMP_FORCE = 5

export default function Player() {
  const { moveForward, moveBackward, moveLeft, moveRight, jump } = useKeyboard()

  const { camera } = useThree()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 0.5, 0]
  }))

  const playerPosition = useRef([0, 0, 0])
  useEffect(() => {
    api.position.subscribe((p) => {
      playerPosition.current = p
    })
  }, [api.position])

  const playerVelocity = useRef([0, 0, 0])
  useEffect(() => {
    api.velocity.subscribe((v) => {
      playerVelocity.current = v
    })
  }, [api.velocity])

  useFrame(() => {
    camera.position.copy(
      new Vector3(
        playerPosition.current[0],
        playerPosition.current[1],
        playerPosition.current[2]
      )
    )
    const playerDirection = new Vector3()
    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    )
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    )
    playerDirection
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(PLAYER_SPEED_RUN)
      .applyEuler(camera.rotation)

    api.velocity.set(
      playerDirection.x,
      playerVelocity.current[1],
      playerDirection.z
    )

    if (jump && Math.abs(playerVelocity.current[1]) < 0.05) {
      api.velocity.set(
        playerVelocity.current[0],
        PLAYER_JUMP_FORCE,
        playerVelocity.current[2]
      )
    }
  })

  return <mesh ref={ref} />
}
