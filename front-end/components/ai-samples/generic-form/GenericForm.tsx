/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Form, Formik } from "formik";
import { array, bool, number, object, ref, string } from "yup";

import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { InputSwitch } from "primereact/inputswitch";

import { COUNTRIES } from "@/shared/constants/countries";
import FormControlWrapper from "@/front-end/components/shared/form-control-wrapper/FormControlWrapper";
import { Button } from "@/front-end/components/shared/button/Button";
import Spinner from "@/front-end/components/shared/spinner/Spinner";
import delay from "@/shared/utils/delay";
import { Image } from "@/shared/models/image";
import ImageUploader from "@/front-end/components/shared/form/image-uploader/ImageUploader";
import DebouncedInputText from "@/front-end/components/shared/form/debounced-input-text/DebouncedInputText";
import DebouncedPassword from "@/front-end/components/shared/form/debounced-password/DebouncedPassword";
import DebouncedInputMask from "@/front-end/components/shared/form/debounced-input-mask/DebouncedInputMask";
import DebouncedInputTextarea from "@/front-end/components/shared/form/debounced-input-textarea/DebouncedInputTextarea";
import DebouncedSlider from "@/front-end/components/shared/form/debounced-slider/DebouncedSlider";

const pets = [
  { name: "Dog", value: "dog" },
  { name: "Cat", value: "cat" },
  { name: "Hamster", value: "hamster" },
];

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  phone: string | null;
  bio: string;
  dateOfBirth: Date | null;
  country: string;
  photo: Image;
  range: [number, number];
  pet: string; // radio
  acceptTerms: boolean;
  isVisible: boolean;
}

const GenericForm = () => {
  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    bio: "",
    phone: null,
    dateOfBirth: null,
    country: "",
    photo: {
      id: "",
      src: "",
      width: 0,
      height: 0,
      alt: "",
    },
    range: [20, 50],
    pet: "",
    acceptTerms: false,
    isVisible: false,
  };

  const validationSchema = object({
    firstName: string().required("First name is required"),
    lastName: string().required("Last name is required"),
    email: string().email("Email is not valid").required("Email is required"),
    password: string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    repeatPassword: string().oneOf([ref("password")], "Passwords must match"),
    bio: string().max(300, "Bio must be at most 300 characters").nullable(),
    phone: string()
      .matches(
        /^\(\d{3}\) \d{2} \d{3} \d{4}$/,
        "Phone number is not valid. It should be 12 digits and can include country code.",
      )
      .nullable()
      .required(),
    dateOfBirth: string().nullable().required("Date of birth is required"),
    country: string().required("Country is required"),
    photo: object({
      id: string().required("Photo is required"),
      src: string().required("Source is required"),
      width: number(),
      height: number(),
      alt: string().required("Alternative name is required"),
    })
      .nullable()
      .required("Photo is required"),
    range: array()
      .of(number().min(0).max(100).required("Range value is required"))
      .length(2, "Range must be an array of two numbers [min, max]")
      .required("Range is required"),
    pet: string().required("Please select a pet"),
    acceptTerms: bool().required("You must accept the terms and conditions"),
    isVisible: bool().required("Visibility is required"),
  });

  const onSubmit = async (values: FormValues) => {
    await delay(2000); // Simulate online request. This is example only
    console.log("values", values);
  };

  return (
    <div className="mx-auto max-w-[700px] py-8">
      <h1 className="font-primary text-primary-900 text-center text-4xl font-bold">
        Generic Form
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          dirty,
          isValid,
          isSubmitting,
          handleBlur,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Form className="mt-4 flex flex-col gap-4 px-5">
            <FormControlWrapper
              label="First Name"
              id="firstName"
              isTouched={touched?.firstName}
              errorMsg={errors?.firstName}
            >
              <DebouncedInputText
                value={values.firstName}
                onChange={(value) => setFieldValue("firstName", value)}
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
              <DebouncedInputText
                value={values.lastName}
                onChange={(value) => setFieldValue("lastName", value)}
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
              id="emailID"
              isTouched={touched?.email}
              errorMsg={errors?.email}
            >
              <DebouncedInputText
                value={values.email}
                onChange={(value) => setFieldValue("email", value)}
                onBlur={handleBlur}
                name="email"
                required
                id="emailID"
                placeholder="Your Email..."
                invalid={!!(errors?.email && touched?.email)}
                type="email"
                autoComplete="email"
              />
            </FormControlWrapper>

            <FormControlWrapper
              label="Password"
              id="firstPassword"
              isTouched={touched?.password}
              errorMsg={errors?.password}
            >
              <DebouncedPassword
                value={values.password}
                onChange={(value) => setFieldValue("password", value)}
                onBlur={handleBlur}
                name="password"
                required
                id="firstPassword"
                placeholder="Your Password..."
                className="w-full *:w-full"
                inputClassName="w-full"
                invalid={!!(errors?.password && touched?.password)}
                minLength={6}
                toggleMask
                feedback={false}
                autoComplete="current-password"
              />
            </FormControlWrapper>

            <FormControlWrapper
              label="Repeat Password"
              id="repeatPassword"
              isTouched={touched?.repeatPassword}
              errorMsg={errors?.repeatPassword}
            >
              <DebouncedPassword
                value={values.repeatPassword}
                onChange={(value) => setFieldValue("repeatPassword", value)}
                onBlur={handleBlur}
                name="repeatPassword"
                required
                id="repeatPassword"
                placeholder="Your Password..."
                className="w-full *:w-full"
                inputClassName="w-full"
                invalid={!!(errors?.repeatPassword && touched?.repeatPassword)}
                minLength={6}
                toggleMask
                feedback={false}
                autoComplete="new-password"
              />
            </FormControlWrapper>

            <FormControlWrapper
              label="Phone"
              id="phone"
              isTouched={touched?.phone}
              errorMsg={errors?.phone}
            >
              <DebouncedInputMask
                id="phone"
                mask="(999) 99 999 9999"
                placeholder="(999) 99 999 9999"
                value={values.phone || ""}
                onChange={(value) => setFieldValue("phone", value)}
                onBlur={handleBlur}
                name="phone"
                invalid={!!(errors?.phone && touched?.phone)}
                className="w-full"
                required
              />
            </FormControlWrapper>

            <FormControlWrapper
              label="Your Bio"
              id="bio"
              isTouched={touched?.bio}
              errorMsg={errors?.bio}
            >
              <DebouncedInputTextarea
                autoResize
                value={values.bio}
                onChange={(value) => setFieldValue("bio", value)}
                onBlur={handleBlur}
                name="bio"
                rows={5}
                cols={30}
                placeholder="Tell us about yourself..."
                className="w-full"
                invalid={!!(errors?.bio && touched?.bio)}
              />
            </FormControlWrapper>

            <FormControlWrapper
              label="Date of Birth"
              id="dateOfBirth"
              isTouched={touched?.dateOfBirth}
              errorMsg={errors?.dateOfBirth}
            >
              <Calendar
                inputId="dateOfBirth"
                value={values.dateOfBirth}
                onChange={(e) => {
                  console.log("calendar", e.value);
                  setFieldValue("dateOfBirth", e.value);
                }}
                onBlur={handleBlur}
                name="dateOfBirth"
                className="w-full"
                invalid={!!(errors?.dateOfBirth && touched?.dateOfBirth)}
                required
              />
            </FormControlWrapper>

            <FormControlWrapper
              label="Country"
              isTouched={touched?.country}
              errorMsg={errors?.country}
            >
              <Dropdown
                value={values.country}
                onChange={(e) => setFieldValue("country", e.value)}
                onBlur={handleBlur}
                name="country"
                required
                placeholder="Your Country..."
                options={COUNTRIES}
                optionLabel="name"
                optionValue="code"
                invalid={!!(errors?.country && touched?.country)}
                className="w-full md:w-full!"
              />
            </FormControlWrapper>

            <ImageUploader
              className="w-full"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              nameStart="photo"
              values={values.photo}
              touched={touched?.photo}
              errors={errors?.photo}
              key="photo-uploader"
            />

            <FormControlWrapper
              label="Range"
              id="range"
              isTouched={touched?.range}
              errorMsg={(errors?.range as string[])
                ?.filter(Boolean)
                ?.join(", ")}
              className="[&_strong]:block!"
            >
              <DebouncedSlider
                value={values.range}
                onChange={(value) => setFieldValue("range", value)}
                className="w-full"
                range
                onSlideEnd={() => setFieldTouched("range", true)}
                required
              />
            </FormControlWrapper>

            <div className="my-3">
              <h3 className="mb-1 font-semibold">
                Select your pet <span className="text-red-500">*</span>
              </h3>
              <div className="flex gap-3">
                {pets.map((p) => (
                  <FormControlWrapper
                    label={p.name}
                    id={`pet-${p.value}`}
                    isTouched={touched?.pet}
                    errorMsg={errors?.pet}
                    key={p.value}
                    className="w-auto! flex-row-reverse! hover:[&_label]:cursor-pointer"
                  >
                    <RadioButton
                      inputId={`pet-${p.value}`}
                      name="pet"
                      value={p.value}
                      onChange={(e) => setFieldValue("pet", e.value)}
                      checked={values.pet === p.value}
                      invalid={!!(errors?.pet && touched?.pet)}
                    />
                  </FormControlWrapper>
                ))}
              </div>
            </div>

            <FormControlWrapper
              label="Accept Terms and Conditions"
              id="acceptTerms"
              isTouched={touched?.acceptTerms}
              errorMsg={errors?.acceptTerms}
              className="w-auto! flex-row-reverse! justify-end! hover:[&_label]:cursor-pointer"
            >
              <Checkbox
                onChange={(e) => setFieldValue("acceptTerms", e.checked)}
                checked={values.acceptTerms}
                inputId="acceptTerms"
                name="acceptTerms"
                required
              />
            </FormControlWrapper>

            <FormControlWrapper
              label="Is Visible"
              id="isVisible"
              isTouched={touched?.isVisible}
              errorMsg={errors?.isVisible}
              className="align-center w-auto! flex-row-reverse! justify-end! hover:[&_label]:cursor-pointer [&_strong]:block!"
            >
              <InputSwitch
                inputId="isVisible"
                checked={values.isVisible || false}
                onChange={(e) => setFieldValue("isVisible", e.value)}
                required
              />
            </FormControlWrapper>

            {/* {error && (
              <div className="mt-4 text-center text-lg font-bold text-red-500">
                {error}
              </div>
            )} */}

            <div className="my-3 mt-5 text-center">
              <Button
                type="submit"
                variant="regular"
                size="md"
                disabled={!(dirty && isValid) || isSubmitting}
              >
                Go!
                {isSubmitting && <Spinner className="mr-0 ml-3" />}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GenericForm;
