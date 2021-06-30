import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useVoteMutation, PostFragmentFragment } from '../generated/graphql'

import { useIsAuth } from '../utils/useIsAuth'
import { useRouter } from 'next/router'

interface UpdootSectionProps {
  post: PostFragmentFragment
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation()

  const [loadingState, setLoadingState] =
    useState<'updoot-loading' | 'downdoot-loading' | 'not-loading'>(
      'not-loading'
    )

  const router = useRouter()

  return (
    <Box
      flexDirection='column'
      justifyContent='space-around'
      alignItems='center'
      pr={5}
    >
      <Button
        isLoading={loadingState === 'updoot-loading'}
        colorScheme={post.voteStatus === 1 ? 'green' : undefined}
        // variant='ghost'
        title='Cool!'
        disabled={post.voteStatus === 1}
        onClick={async () => {
          if (post.voteStatus === 1) {
            return
          }

          setLoadingState('updoot-loading')
          await vote({
            postId: post.id,
            value: 1,
          })
          setLoadingState('not-loading')
        }}
      >
        <ChevronUpIcon w={6} h={6} name='chevron-up' size='24px' />
      </Button>
      <Text textAlign='center'>{post.points}</Text>
      <Button
        colorScheme={post.voteStatus === -1 ? 'orange' : undefined}
        isLoading={loadingState === 'downdoot-loading'}
        // variant='ghost'
        title='Nah!'
        disabled={post.voteStatus === -1}
        onClick={async () => {
          if (post.voteStatus === -1) {
            return
          }

          setLoadingState('downdoot-loading')
          await vote({
            postId: post.id,
            value: -1,
          })
          setLoadingState('not-loading')
        }}
      >
        <ChevronDownIcon w={6} h={6} name='chevron-down' size='24px' />
      </Button>
    </Box>
  )
}
