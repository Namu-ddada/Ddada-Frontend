import { useEffect, useState } from 'react'

interface UseModalReturn {
  isModalOpen: boolean
  portalElement: Element | null
  handleModalOpen: () => void
  handleModalClose: () => void
}

export default function useModal(): UseModalReturn {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [portalElement, setPortalElement] = useState<Element | null>(null)

  useEffect(() => {
    setPortalElement(document.getElementById('portal'))
  }, [isModalOpen])

  const handleModalOpen = () => {
    setModalOpen(true)
  }
  const handleModalClose = () => {
    setModalOpen(false)
  }

  return { isModalOpen, portalElement, handleModalOpen, handleModalClose }
}
