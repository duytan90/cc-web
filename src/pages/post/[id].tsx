import { Box, Text, Link, Heading, Flex } from '@chakra-ui/layout'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import { Layout } from '../../components/Layout'
import { createUrlqClient } from '../../utils/createUrqlClient'
import { Button, useToast } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useGetPost } from '../../utils/useGetPost'
import { PostMenu } from '../../components/PostMenu'
import { PostFragmentFragment, useMeQuery } from '../../generated/graphql'

const Post = ({}) => {
  const toast = useToast()
  const [{ data, fetching, error }] = useGetPost()
  const [{ data: meData }] = useMeQuery()
  const isOwner: Boolean = meData?.me?.id === data?.post?.creator?.id

  if (fetching) {
    return (
      <Layout>
        <div>loading ...</div>
      </Layout>
    )
  }

  if (error || !data?.post) {
    toast({
      title: 'Error',
      description: 'Cannot fetch post data',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
    return (
      <Layout>
        <Box>
          <Heading fontSize='xl'>Error fetching post!</Heading>
          <NextLink href='/' as={`/`}>
            <Link>Back to home page</Link>
          </NextLink>
        </Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <Flex>
        <Box>
          <Heading>{data?.post?.title}</Heading>
          <Text>{data?.post?.text}</Text>
        </Box>
        {isOwner ? (
          <Box ml='auto'>
            <PostMenu
              post={data.post as PostFragmentFragment}
              menuText='Options'
            />
          </Box>
        ) : null}
      </Flex>
    </Layout>
  )
}

export default withUrqlClient(createUrlqClient, { ssr: true })(Post)
