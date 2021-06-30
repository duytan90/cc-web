import React from 'react'
import { Box, Flex, Heading, Button, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useMeQuery, useLogoutMutation } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { useRouter } from 'next/router'

interface NavBarProps {
  variant?: 'small' | 'regular'
}

const renderUserInfo = () => {
  const [{ fetching: queryMeFetching, data: meData }] = useMeQuery({
    pause: isServer(), // Stop send un-nessessary request to server
  })
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const router = useRouter()

  if (meData?.me) {
    return (
      <Flex>
        <Button>{meData?.me?.username}</Button>
        <Button
          onClick={async () => {
            await logout()
            router.reload()
          }}
          isLoading={logoutFetching}
          ml={5}
        >
          Logout
        </Button>
      </Flex>
    )
  }

  return (
    <Flex>
      <NextLink href='/login'>
        <Button>Login</Button>
      </NextLink>
      <NextLink href='/register'>
        <Button>Register</Button>
      </NextLink>
    </Flex>
  )
}

export const NavBar: React.FC<NavBarProps> = () => {
  return (
    <Flex
      p={4}
      bg='transparent'
      position='sticky'
      top={0}
      zIndex={1}
      align='center'
    >
      <NextLink href='/'>
        <Link>
          <Heading>CAICHO</Heading>
        </Link>
      </NextLink>
      <Box ml={'auto'}>{renderUserInfo()}</Box>
    </Flex>
  )
}
