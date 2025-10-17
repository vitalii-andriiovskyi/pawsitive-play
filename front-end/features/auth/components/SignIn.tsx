"use client";
import React from "react";
import { Form, Formik } from "formik";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

import CredentialsSchema from "@/shared/features/user/validation-schemas/user.credentials.schema";
import FormControlWrapper from "@/front-end/components/shared/form-control-wrapper/FormControlWrapper";
import { Button } from "@/front-end/components/shared/button/Button";
import { useAuth } from "@/front-end/features/auth/use-cases/useAuth";
import { Credentials } from "@/shared/features/user/domain/user.model";
import Spinner from "@/front-end/components/shared/spinner/Spinner";

const SignIn = () => {
  const { signIn, error } = useAuth();

  const initialValues: Credentials = {
    email: "",
    password: "",
  };

  const validationSchema = CredentialsSchema;

  const onSubmit = async (values: Credentials) => {
    const { email, password } = values;
    await signIn(email, password);
  };

  return (
    <div>
      <h1 className="font-primary text-primary-900 text-center text-4xl font-bold">
        Sign In
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          errors,
          touched,
          values,
          dirty,
          isValid,
          isSubmitting,
          handleChange,
          handleBlur,
        }) => (
          <Form className="mt-4 flex flex-col gap-4">
            <FormControlWrapper
              label="Email"
              id="email"
              isTouched={touched?.email}
              errorMsg={errors?.email}
            >
              <InputText
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
                required
                id="email"
                placeholder="Your Email..."
                invalid={!!(errors?.email && touched?.email)}
                type="email"
              />
            </FormControlWrapper>

            <FormControlWrapper
              label="Password"
              id="password"
              isTouched={touched?.password}
              errorMsg={errors?.password}
            >
              <Password
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                required
                inputId="password"
                placeholder="Your Password..."
                className="w-full *:w-full"
                inputClassName="w-full"
                invalid={!!(errors?.password && touched?.password)}
                minLength={6}
                toggleMask
                feedback={false} // Or true if you want password strength indicator
              />
            </FormControlWrapper>

            {error && (
              <div className="mt-4 text-center text-lg font-bold text-red-500">
                {error}
              </div>
            )}

            <div className="my-3 mt-5 text-center">
              <Button
                type="submit"
                variant="regular"
                size="md"
                disabled={!(dirty && isValid) || isSubmitting}
              >
                Sign In
                {isSubmitting && <Spinner className="mr-0 ml-3" />}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
