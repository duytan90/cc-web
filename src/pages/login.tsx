import React from 'react'
import { Formik, Form } from 'formik'
import { Link, Box, Button, Flex } from '@chakra-ui/react'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { loginFields } from './FieldConfig'
import { useLoginMutation, useUsersQuery } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Layout } from '../components/Layout'

interface registerProps {}

const Login: React.FC<registerProps> = ({}) => {
  const router = useRouter()
  const [, login] = useLoginMutation()

  const getAllUser = async () => {
    const [{ fetching, data }, getAllUsers] = useUsersQuery()
    getAllUsers()
    console.log(`all uses: `, data)
  }

  return (
    <Layout variant='small'>
      <Button mt={10} mb={10} onClick={() => getAllUser()}>
        Console log all users
      </Button>

      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, actions) => {
          const response = await login({
            usernameOrEmail: values.usernameOrEmail,
            password: values.password,
          })
          if (response.data?.login.errors) {
            actions.setErrors(toErrorMap(response.data.login.errors))
          } else if (response.data?.login.user) {
            if (typeof router.query.next === 'string') {
              router.push(router.query.next)
            } else {
              router.push('/')
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {loginFields.map((field, idx) => (
              <Box key={idx} mt={4}>
                <InputField
                  name={field.name}
                  placeholder={field.name}
                  label={field.label}
                  type={field.type}
                />
              </Box>
            ))}

            <Flex>
              <NextLink href='/forgot-password'>
                <Link ml='auto' pt={1}>
                  Forgot password?
                </Link>
              </NextLink>
            </Flex>

            <Button
              mt={4}
              isLoading={isSubmitting}
              type='submit'
              colorScheme='telegram'
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default Login
