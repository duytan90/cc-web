import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import {
  PostFragmentFragment,
  useDeletePostMutation,
} from '../generated/graphql'

interface PostsProps {
  post: PostFragmentFragment
  menuText: any
}

export const PostMenu: React.FC<PostsProps> = ({ post, menuText }) => {
  const [, deletePost] = useDeletePostMutation()

  return (
    <Menu>
      {menuText ? (
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {menuText}
        </MenuButton>
      ) : (
        <MenuButton flexDirection='row'>
          <ChevronDownIcon />
        </MenuButton>
      )}

      <MenuList>
        <NextLink href='/post/edit/[id]' as={`/post/edit/${post.id}`}>
          <MenuItem>Edit </MenuItem>
        </NextLink>
        <MenuItem
          onClick={() => {
            deletePost({ id: post.id })
          }}
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
