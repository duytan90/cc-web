import { Box, Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import { InputField } from '../components/InputField'
import { Layout } from '../components/Layout'
import { useCreatePostMutation } from '../generated/graphql'
import { useIsAuth } from '../utils/useIsAuth'
import { createPostFields } from './FieldConfig'

const CreatePost: React.FC<{}> = ({}) => {
  const [, createPost] = useCreatePostMutation()
  const router = useRouter()

  useIsAuth()

  return (
    <Layout variant='small'>
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values, actions) => {
          const { error } = await createPost({ input: values })
          if (!error) {
            router.push('/')
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
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default CreatePost
