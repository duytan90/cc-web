import { Box, Flex, Link, Heading, Text } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import { UpdootSection } from '../components/UpdootSection'
import NextLink from 'next/link'
import { PostFragmentFragment, useMeQuery } from '../generated/graphql'
import { PostMenu } from '../components/PostMenu'

interface PostsProps {
  post: PostFragmentFragment
}

const Posts: React.FC<PostsProps> = ({ post }) => {
  const [{ data }] = useMeQuery()
  const isOwner: Boolean = data?.me?.id === post.creator.id

  return (
    <Box p={5} shadow='md' borderWidth='1px' flexDirection='row'>
      <Flex flexDirection='row'>
        <UpdootSection post={post} />
        <Flex flexDirection='column'>
          <NextLink href='/post/[id]' as={`/post/${post.id}`}>
            <Link>
              <Heading fontSize='xl'>{post.title}</Heading>
            </Link>
          </NextLink>
          <Text>posted by {post.creator.username}</Text>
          <Text>
            {`at ${moment(parseFloat(post.createdAt)).format(
              'dddd DD-MM-YYYY hh:mm:ss'
            )} (${moment(parseFloat(post.createdAt)).fromNow()})`}
          </Text>
          <Text mt={4}>{post.textSnippet}</Text>
        </Flex>
        {isOwner ? (
          <Flex ml='auto' align='flex-start'>
            <PostMenu post={post} />
          </Flex>
        ) : null}
      </Flex>
    </Box>
  )
}

export default Posts
