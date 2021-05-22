import React from "react";
import { Formik, Form } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Button
} from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { loginFields } from "./FieldConfig";
import { useMutation } from "urql";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

interface registerProps {}

const Login: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, actions) => {
          const response = await login({ options: values });
          if (response.data?.login.errors) {
            actions.setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push("/");
          }
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
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
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="telegram"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
