'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

const DetailsModal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const onClose = () => {
    router.back()
  }

  return (
    <Modal isOpen onClose={onClose} size={'4xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default DetailsModal