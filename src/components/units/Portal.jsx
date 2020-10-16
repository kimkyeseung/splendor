import { useMemo } from 'react'
import { createPortal } from 'react-dom'

export const Portal = ({ children, elementId }) => {
  const rootElement = useMemo(() => document.getElementById(elementId), [
    elementId,
  ])

  return createPortal(children, rootElement)
}
