'use client'

import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  Button,
  useToast,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
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
    } catch {
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

  // Theme colors
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.100', 'gray.700')
  const menuBg = useColorModeValue('white', 'gray.700')
  const menuHoverBg = useColorModeValue('gray.50', 'gray.600')
  const logoColor = 'brand.pink.400'

  return (
    <Box
      bg={bgColor}
      px={4}
      borderBottom="1px"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={1000}
      boxShadow="sm"
    >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        maxW="7xl"
        mx="auto"
      >
        <Link
          href="/information?page=1"
          _hover={{ textDecoration: 'none' }}
        >
          <Flex align="center" gap={2}>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color={logoColor}
            >
              🍩 Donutello
            </Text>
          </Flex>
        </Link>

        <Flex alignItems="center" gap={4}>
          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="ghost"
              cursor="pointer"
              minW={0}
              isDisabled={isSigningOut}
              _hover={{ bg: menuHoverBg }}
            >
              <Avatar
                size="sm"
                name={session?.user?.username || ''}
                bg="brand.pink.400"
              />
            </MenuButton>
            <MenuList bg={menuBg} borderColor={borderColor}>
              <Link href="/information/settings" _hover={{ textDecoration: 'none' }}>
                <MenuItem
                  _hover={{ bg: menuHoverBg }}
                >
                  Settings
                </MenuItem>
              </Link>
              <MenuItem
                onClick={handleSignOutClick}
                closeOnSelect
                isDisabled={isSigningOut}
                _hover={{ bg: menuHoverBg }}
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