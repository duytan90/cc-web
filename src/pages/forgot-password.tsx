import { Box, Flex, Link, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/router";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { toErrorMap } from "../utils/toErrorMap";
import { forgotPasswordFields } from "./FieldConfig";
import { useForgotPasswordMutation } from "../generated/graphql";

const forgotPassword: React.FC<{}> = ({}) => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, actions) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>Please check your email to continue</Box>
          ) : (
            <Form>
              {forgotPasswordFields.map((field, idx) => (
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
                Submit
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default forgotPassword;
