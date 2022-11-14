import { useCallback } from 'react'

import { useStore } from '../hooks/useStore'

export default function Menu() {
  const [saveWorld, resetWorld] = useStore((state) => [
    state.saveWorld,
    state.resetWorld
  ])

  const handleClickSaveWorld = useCallback(
    (ev) => {
      ev.preventDefault()
      saveWorld()
    },
    [saveWorld]
  )

  const handleClickResetWorld = useCallback(
    (ev) => {
      ev.preventDefault()
      resetWorld()
    },
    [resetWorld]
  )

  return (
    <div className='menu'>
      <button onClick={handleClickSaveWorld}>Save</button>
      <button onClick={handleClickResetWorld}>Reset</button>
    </div>
  )
}
