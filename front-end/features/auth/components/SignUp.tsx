"use client";
import React, { useState } from "react";
import { Form, Formik } from "formik";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

import SignUpSchema from "@/shared/features/user/validation-schemas/user.signup.schema";
import FormControlWrapper from "@/front-end/components/shared/form-control-wrapper/FormControlWrapper";
import { Button } from "@/front-end/components/shared/button/Button";
import { useUser } from "@/front-end/features/user/use-cases/user.usecases";
import { UserSignUp } from "@/shared/features/user/domain/user.model";
import Spinner from "@/front-end/components/shared/spinner/Spinner";
import { useAuthUpdate } from "@/front-end/context/Auth";

const SignUp = () => {
  const { createUser, isLoading } = useUser();
  const [errorMsg, setErrorMsg] = useState("");
  const { hideAuth } = useAuthUpdate();
  const initialValues: UserSignUp = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
  const validationSchema = SignUpSchema;

  const onSubmit = async (values: UserSignUp) => {
    try {
      await createUser(values);
      hideAuth();
    } catch (err) {
      console.log("error", err);
      if (err instanceof Error) {
        setErrorMsg(err.message);
        setTimeout(() => {
          setErrorMsg("");
        }, 5000);
      }
    }
  };

  return (
    <div>
      <h1 className="font-primary text-primary-900 text-center text-4xl font-bold">
        Sign Up
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
          isSubmitting, // Formik's isSubmitting, can be used with our loading state
          handleChange,
          handleBlur,
        }) => (
          <Form className="mt-4 flex flex-col gap-4">
            <FormControlWrapper
              label="First Name"
              id="firstName"
              isTouched={touched?.firstName}
              errorMsg={errors?.firstName}
            >
              <InputText
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                name="firstName"
                required
                id="firstName"
                placeholder="Your First Name..."
                invalid={!!(errors?.firstName && touched?.firstName)}
              />
            </FormControlWrapper>

            <FormControlWrapper
              label="Last Name"
              id="lastName"
              isTouched={touched?.lastName}
              errorMsg={errors?.lastName}
            >
              <InputText
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                name="lastName"
                required
                id="lastName"
                placeholder="Your Last Name..."
                invalid={!!(errors?.lastName && touched?.lastName)}
              />
            </FormControlWrapper>

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

            <FormControlWrapper
              label="Repeat Password"
              id="repeatPassword"
              isTouched={touched?.repeatPassword}
              errorMsg={errors?.repeatPassword}
            >
              <Password
                value={values.repeatPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                name="repeatPassword"
                required
                inputId="repeatPassword"
                placeholder="Your Password..."
                className="w-full *:w-full"
                inputClassName="w-full"
                invalid={!!(errors?.repeatPassword && touched?.repeatPassword)}
                minLength={6}
                toggleMask
                feedback={false} // Or true if you want password strength indicator
              />
            </FormControlWrapper>

            {errorMsg && (
              <div className="mt-2 text-center text-sm text-red-500">
                {errorMsg}
              </div>
            )}

            <div className="my-3 mt-5 text-center">
              <Button
                type="submit"
                variant="regular"
                size="md"
                disabled={!(dirty && isValid) || isSubmitting || isLoading}
              >
                <span>Sign Up</span>
                {(isSubmitting || isLoading) && (
                  <Spinner className="mr-0 ml-3" />
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
