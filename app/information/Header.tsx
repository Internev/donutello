'use client'

import { Box, Flex, Menu, MenuButton, MenuItem, MenuList, Avatar, Button, useToast, Link } from '@chakra-ui/react'
import { useState } from 'react'
import { handleSignOut } from '@/app/lib/actions'
import { Session } from 'next-auth'

interface HeaderProps {
  session: Session
}

const Header = ({ session }: HeaderProps) => {
  const [isSigningOut, setIsSigningOut] = useState(false)
  const toast = useToast()

  const handleSignOutClick = async () => {
    try {
      setIsSigningOut(true)
      await handleSignOut()
    } catch (error) {
      toast({
        title: 'Error signing out',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <Box bg="gray.200" px={6} mb={6}>
      <Flex h={14} alignItems="center" justifyContent="space-between">
        <Box>
          <Link href="/information?page=1">
            🍩 Donutello
          </Link>
        </Box>
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              as={Button}
              cursor="pointer"
              minW={0}
              isDisabled={isSigningOut}
            >
              <Avatar size="sm" name={session?.user?.username || ''} />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link href={'/information/settings'}>
                  Settings
                </Link>
              </MenuItem>
              <MenuItem
                onClick={handleSignOutClick}
                closeOnSelect
                isDisabled={isSigningOut}
              >
                {isSigningOut ? 'Signing out...' : 'Sign out'}
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header