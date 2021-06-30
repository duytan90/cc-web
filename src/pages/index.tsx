import { withUrqlClient } from 'next-urql'
import { createUrlqClient } from '../utils/createUrqlClient'
import { usePostsQuery } from '../generated/graphql'
import { Layout } from '../components/Layout'
import NextLink from 'next/link'
import React, { useState } from 'react'
import { Button, Flex, Stack, Text, useToast } from '@chakra-ui/react'
import Posts from './posts'

const Index = () => {
  const toast = useToast()
  const [variables, setVariable] = useState({
    limit: 30,
    cursor: null as null | string,
  })
  const [{ data, fetching, error }] = usePostsQuery({
    variables,
  })

  if (error) {
    toast({
      title: 'Error',
      description: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  if (!fetching && !data) {
    return <Flex>There isn't any posts</Flex>
  }

  return (
    <Layout>
      <NextLink href='/create-post'>
        <Button mt={10} mb={10}>
          Create new post
        </Button>
      </NextLink>

      {!data ? (
        <div>Loadding ...</div>
      ) : (
        <Stack spacing={10} mb={10}>
          {data &&
            data.posts.posts.map((post, idx) => (
              <Posts key={idx} post={post} />
            ))}
        </Stack>
      )}

      {data && data.posts.hasMore ? (
        <Flex padding={10}>
          <Button
            variant='solid'
            m='auto'
            isLoading={fetching}
            p={5}
            onClick={() =>
              setVariable({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }
          >
            Load more
          </Button>
        </Flex>
      ) : (
        <Text m='auto' textAlign='center' p={10}>
          No more post to load!
        </Text>
      )}
    </Layout>
  )
}

// set `ssr: true` to server side rendering index page
export default withUrqlClient(createUrlqClient, { ssr: true })(Index)
