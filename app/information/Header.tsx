'use client'

import { Box, Flex, Menu, MenuButton, MenuItem, MenuList, IconButton, Avatar, Button } from '@chakra-ui/react'

const Header = () => {
  return (
    <Box bg="gray.200" px={6} mb={6}>
      <Flex h={14} alignItems="center" justifyContent="space-between">
        <Box>🍩 Donutello</Box>
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              as={Button}
              cursor="pointer"
              minW={0}
            >
              <Avatar size="sm" name="Test Guy" />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => { }}>Settings</MenuItem>
              <MenuItem onClick={() => { }}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header