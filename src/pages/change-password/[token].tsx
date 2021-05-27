import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import {NextPage} from 'next'
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { createNewPasswordFields } from '../FieldConfig';

const ChangePassword: NextPage<{token: string}> = ({token}) => {
  const [, changePassword] = useChangePasswordMutation()
  const router = useRouter();
  const [tokenError, setTokenError]  = useState('')

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, actions) => {

          console.log('new password: ', values);
          

          const response = await changePassword({ newPassword: values.newPassword, token });

          console.log({response});
          

          if (response.data?.changePassword?.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ('token' in errorMap) {
              setTokenError(errorMap.token)
            }
            actions.setErrors(errorMap);
          } else if (response.data?.changePassword?.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {createNewPasswordFields.map((field, idx) => (
              <Box key={idx} mt={4}>
                <InputField
                  name={field.name}
                  placeholder={field.name}
                  label={field.label}
                  type={field.type}
                />
              </Box>
            ))}

            {tokenError ? <Box color='red'>{tokenError}</Box> : null}
            
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="telegram"
            >
              Change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

ChangePassword.getInitialProps = ({query})=> {
  return {
    token: query.token as string
  }
}

export default ChangePassword

