import React from 'react'
import { Formik, Form } from 'formik'
import { Box, Button } from '@chakra-ui/react'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { registerFields } from './FieldConfig'
import { useRegisterMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'
import { Layout } from '../components/Layout'

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter()
  const [, register] = useRegisterMutation()

  return (
    <Layout variant='small'>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={async (values, actions) => {
          const response = await register({ options: values })
          if (response.data?.register.errors) {
            actions.setErrors(toErrorMap(response.data.register.errors))
          } else if (response.data?.register.user) {
            router.push('/')
          }
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            {registerFields.map((field, idx) => (
              <Box key={idx} mt={4}>
                <InputField
                  name={field.name}
                  placeholder={field.name}
                  label={field.label}
                  type={field.type}
                />
              </Box>
            ))}
            <Button
              mt={4}
              isLoading={isSubmitting}
              type='submit'
              colorScheme='telegram'
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default Register
