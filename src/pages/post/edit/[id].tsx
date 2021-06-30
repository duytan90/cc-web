import { Box, Button, Heading, Link } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { InputField } from '../../../components/InputField'
import { Layout } from '../../../components/Layout'
import { usePostQuery, useUpdatePostMutation } from '../../../generated/graphql'
import { useIsAuth } from '../../../utils/useIsAuth'
import { createPostFields } from '../../FieldConfig'
import { useToast } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useGetIdFromUrl } from '../../../utils/useGetIdFromUrl'

const EditPost: React.FC<{}> = ({}) => {
  const intId = useGetIdFromUrl()
  const router = useRouter()
  const [_post, _setPost] = useState({})
  const [, updatePost] = useUpdatePostMutation()
  const [{ data, fetching, error }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  })
  const toast = useToast()

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

  useIsAuth()

  return (
    <Layout variant='small'>
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values, actions) => {
          const { error } = await updatePost({ id: intId, ...values })
          if (error) {
            toast({
              title: 'Error',
              description: 'Cannot update post!',
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
          } else {
            router.back()
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {createPostFields.map((field, idx) => (
              <Box key={idx} mt={4}>
                <InputField
                  name={field.name}
                  placeholder={field.name}
                  label={field.label}
                  type={field.type}
                  textarea={field.textarea}
                />
              </Box>
            ))}

            <Button
              mt={4}
              isLoading={isSubmitting}
              type='submit'
              colorScheme='telegram'
            >
              Update Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default EditPost
