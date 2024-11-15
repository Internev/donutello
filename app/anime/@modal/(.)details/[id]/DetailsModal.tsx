'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

const DetailsModal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const onClose = () => {
    router.back()
  }

  return (
    <Modal isOpen onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          {/* <Button colorScheme='purple' mr={3} onClick={onClose}>
            Close
          </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DetailsModal