/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Form, Formik } from "formik";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { Button as PRButton } from "primereact/button";

import AIHouseCreateSchema from "@/shared/features/ai-house/validation-schemas/ai-house.create.schema";
import { COUNTRIES } from "@/shared/features/country/domain/countries";
import FormControlWrapper from "@/front-end/components/shared/form-control-wrapper/FormControlWrapper";
import { Button } from "@/front-end/components/shared/button/Button";
import Spinner from "@/front-end/components/shared/spinner/Spinner";
import ImageUploader from "@/front-end/components/shared/form/image-uploader/ImageUploader";
import DebouncedInputText from "@/front-end/components/shared/form/debounced-input-text/DebouncedInputText";
import DebouncedInputTextarea from "@/front-end/components/shared/form/debounced-input-textarea/DebouncedInputTextarea";
import { AIHouseCreate } from "@/shared/features/ai-house/domain/ai-house.model";
import { getCountry } from "@/shared/features/country/domain/country.repository";
import DebouncedInputNumber from "@/front-end/components/shared/form/debounced-input-number/DebouncedInputNumber";
import { getDefaultImage } from "@/front-end/components/shared/form/image-uploader/data";
import { createAIHouse } from "@/front-end/features/ai-house/infrastructure/ai-house.service";
import { useUser } from "@/front-end/features/user/use-cases/user.usecases";
import RemoveItem from "@/front-end/components/shared/remove-item/RemoveItem";
import { addItem } from "@/front-end/utils/collection";

interface AIHouseFormProps {
  className?: string;
  onSubmit?: (values: AIHouseCreate) => Promise<void> | void;
  initialValues?: Partial<AIHouseCreate>;
}

const defaultInitialValues: AIHouseCreate = {
  name: "",
  address: {
    street: "",
    city: "",
    state: "",
    zip: null as unknown as number,
    country: "US",
    apt: "",
  },
  ownerId: "",
  rooms: 1,
  area: 1,
  price: 0,
  available: false,
  features: [],
  images: [getDefaultImage()],
  builtYear: null as unknown as Date,
  lastRenovation: null as unknown as Date,
  metadata: {},
};

const AIHouseForm: React.FC<AIHouseFormProps> = ({
  className = "",
  onSubmit,
  initialValues = {},
}) => {
  const { user } = useUser();
  const mergedInitialValues = {
    ...defaultInitialValues,
    ...initialValues,
    ownerId: user?._id || "",
  };

  const handleSubmit = async (values: AIHouseCreate, { resetForm }: any) => {
    const valuesToSubmit = { ...values, ownerId: user?._id || "" };
    if (onSubmit) {
      await onSubmit(values);
    } else {
      try {
        const response = await createAIHouse(valuesToSubmit);
        resetForm();
        console.log("response", response);
      } catch (error: any) {
        console.log("error", error);
      }
    }
  };

  return (
    <div className={`mx-auto max-w-[700px] py-8 ${className}`}>
      <h1 className="font-primary text-primary-900 text-center text-4xl font-bold">
        AI House Form
      </h1>
      <Formik
        initialValues={mergedInitialValues}
        validationSchema={AIHouseCreateSchema}
        onSubmit={handleSubmit}
        enableReinitialize
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
              label="Name"
              id="name"
              isTouched={touched?.name}
              errorMsg={errors?.name}
            >
              <DebouncedInputText
                value={values.name}
                onChange={(value) => setFieldValue("name", value)}
                onBlur={handleBlur}
                name="name"
                required
                id="name"
                placeholder="House Name..."
                invalid={!!(errors?.name && touched?.name)}
              />
            </FormControlWrapper>

            <FormControlWrapper
              label="Street"
              id="street"
              isTouched={touched?.address?.street}
              errorMsg={errors?.address?.street}
            >
              <DebouncedInputText
                value={values.address.street}
                onChange={(value) => setFieldValue("address.street", value)}
                onBlur={handleBlur}
                name="address.street"
                required
                id="street"
                placeholder="Street..."
                invalid={
                  !!(errors?.address?.street && touched?.address?.street)
                }
              />
            </FormControlWrapper>

            <FormControlWrapper
              label="City"
              id="city"
              isTouched={touched?.address?.city}
              errorMsg={errors?.address?.city}
            >
              <DebouncedInputText
                value={values.address.city}
                onChange={(value) => setFieldValue("address.city", value)}
                onBlur={handleBlur}
                name="address.city"
                required
                id="city"
                placeholder="City..."
                invalid={!!(errors?.address?.city && touched?.address?.city)}
              />
            </FormControlWrapper>

            <FormControlWrapper
              label="Zip"
              id="zip"
              isTouched={touched?.address?.zip}
              errorMsg={errors?.address?.zip}
            >
              <DebouncedInputNumber
                value={values.address.zip}
                onChange={(value) => setFieldValue("address.zip", value)}
                onBlur={handleBlur}
                name="address.zip"
                required
                id="zip"
                placeholder="Zip..."
                invalid={!!(errors?.address?.zip && touched?.address?.zip)}
                useGrouping={false}
              />
            </FormControlWrapper>

            {values.address.country === "US" && (
              <FormControlWrapper
                label="State"
                id="state"
                isTouched={touched?.address?.state}
                errorMsg={errors?.address?.state}
              >
                <Dropdown
                  value={values.address.state}
                  onChange={(e) => setFieldValue("address.state", e.value)}
                  onBlur={handleBlur}
                  name="address.state"
                  required
                  placeholder="State..."
                  options={getCountry(values.address.country)?.zones || []}
                  optionLabel="name"
                  optionValue="code"
                  invalid={
                    !!(errors?.address?.state && touched?.address?.state)
                  }
                  className="w-full md:w-full!"
                />
              </FormControlWrapper>
            )}

            <FormControlWrapper
              label="Country"
              id="country"
              isTouched={touched?.address?.country}
              errorMsg={errors?.address?.country}
            >
              <Dropdown
                value={values.address.country}
                onChange={(e) => setFieldValue("address.country", e.value)}
                onBlur={handleBlur}
                name="address.country"
                required
                placeholder="Country..."
                options={COUNTRIES}
                optionLabel="name"
                optionValue="code"
                invalid={
                  !!(errors?.address?.country && touched?.address?.country)
                }
                className="w-full md:w-full!"
              />
            </FormControlWrapper>

            <FormControlWrapper
              label="Apartment (optional)"
              id="apt"
              isTouched={touched?.address?.apt}
              errorMsg={errors?.address?.apt}
            >
              <DebouncedInputText
                value={values.address.apt || ""}
                onChange={(value) => setFieldValue("address.apt", value)}
                onBlur={handleBlur}
                name="address.apt"
                id="apt"
                placeholder="Apartment..."
                invalid={!!(errors?.address?.apt && touched?.address?.apt)}
              />
            </FormControlWrapper>

            <FormControlWrapper
              label="Rooms"
              id="rooms"
              isTouched={touched?.rooms}
              errorMsg={errors?.rooms}
            >
              <DebouncedInputNumber
                value={values.rooms ?? 1}
                onChange={(value) => setFieldValue("rooms", value || 1)}
                onBlur={handleBlur}
                name="rooms"
                required
                id="rooms"
                placeholder="Rooms..."
                invalid={!!(errors?.rooms && touched?.rooms)}
              />
            </FormControlWrapper>

            <FormControlWrapper
              label="Area (m²)"
              id="area"
              isTouched={touched?.area}
              errorMsg={errors?.area}
            >
              <DebouncedInputNumber
                value={values.area ?? 1}
                onChange={(value) => setFieldValue("area", value || 1)}
                onBlur={handleBlur}
                name="area"
                required
                id="area"
                placeholder="Area..."
                invalid={!!(errors?.area && touched?.area)}
              />
            </FormControlWrapper>

            <FormControlWrapper
              label="Price"
              id="price"
              isTouched={touched?.price}
              errorMsg={errors?.price}
            >
              <DebouncedInputNumber
                value={values.price ?? 0}
                onChange={(value) => setFieldValue("price", value || 0)}
                onBlur={handleBlur}
                name="price"
                required
                id="price"
                placeholder="Price..."
                invalid={!!(errors?.price && touched?.price)}
              />
            </FormControlWrapper>

            <FormControlWrapper
              label="Available"
              id="available"
              isTouched={touched?.available}
              errorMsg={errors?.available}
              className="w-auto! flex-row-reverse! justify-end! hover:[&_label]:cursor-pointer"
            >
              <InputSwitch
                inputId="available"
                checked={values.available}
                onChange={(e) => setFieldValue("available", e.value)}
                required
              />
            </FormControlWrapper>

            <FormControlWrapper
              label="Features (comma separated)"
              id="features"
              isTouched={touched?.features}
              errorMsg={errors?.features as string}
            >
              <DebouncedInputText
                value={values.features?.join(", ") || ""}
                onChange={(value) =>
                  setFieldValue(
                    "features",
                    value
                      .split(",")
                      .map((f) => f.trim())
                      .filter(Boolean),
                  )
                }
                onBlur={handleBlur}
                name="features"
                id="features"
                placeholder="Feature1, Feature2, ..."
                invalid={!!(errors?.features && touched?.features)}
              />
            </FormControlWrapper>

            <div>
              <h4>Images</h4>
              <div className="grid gap-3">
                {values.images?.map((img, i) => (
                  <div key={`images-uploader-wrapper-images[${img.id}]`}>
                    {values.images.length > 1 && (
                      <div className="-mb-[44px] flex justify-end">
                        <RemoveItem>
                          {({ confirmRemove }) => (
                            <PRButton
                              type="button"
                              severity="danger"
                              icon="pi pi-trash"
                              rounded
                              tooltip="Remove Image"
                              tooltipOptions={{
                                position: "left",
                              }}
                              onClick={confirmRemove(
                                values.images,
                                img.id,
                                "images",
                                setFieldValue,
                              )}
                              className="translate-x-[45%]"
                            />
                          )}
                        </RemoveItem>
                      </div>
                    )}
                    <ImageUploader
                      className="w-full"
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      nameStart={`images[${i}]`}
                      values={img}
                      touched={touched?.images?.[i] as Record<string, boolean>}
                      errors={errors?.images?.[i] as Record<string, string>}
                    />
                  </div>
                ))}
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="regular"
                    size="sm"
                    onClick={() =>
                      addItem(
                        values.images || [],
                        getDefaultImage(),
                        "images",
                        setFieldValue,
                      )
                    }
                  >
                    Add Image
                  </Button>
                </div>
              </div>
            </div>

            <FormControlWrapper
              label="Built Year"
              id="builtYear"
              isTouched={touched?.builtYear as boolean}
              errorMsg={errors?.builtYear as string}
            >
              <Calendar
                inputId="builtYear"
                value={values.builtYear}
                onChange={(e) => setFieldValue("builtYear", e.value)}
                onBlur={handleBlur}
                name="builtYear"
                className="w-full"
                invalid={
                  !!(
                    typeof errors?.builtYear === "string" && touched?.builtYear
                  )
                }
                required
                view="year"
                dateFormat="yy"
              />
            </FormControlWrapper>

            <FormControlWrapper
              label="Last Renovation (optional)"
              id="lastRenovation"
              isTouched={touched?.lastRenovation}
              errorMsg={errors?.lastRenovation}
            >
              <Calendar
                inputId="lastRenovation"
                value={values.lastRenovation}
                onChange={(e) => setFieldValue("lastRenovation", e.value)}
                onBlur={handleBlur}
                name="lastRenovation"
                className="w-full"
                invalid={!!(errors?.lastRenovation && touched?.lastRenovation)}
                view="year"
                dateFormat="yy"
              />
            </FormControlWrapper>

            <FormControlWrapper
              label="Metadata (optional)"
              id="metadata"
              isTouched={touched?.metadata as boolean}
              errorMsg={errors?.metadata as string}
            >
              <DebouncedInputTextarea
                value={
                  typeof values.metadata === "string"
                    ? values.metadata
                    : JSON.stringify(values.metadata, null, 2)
                }
                onChange={(value) => setFieldValue("metadata", value)}
                onBlur={handleBlur}
                name="metadata"
                rows={3}
                cols={30}
                placeholder="Metadata as JSON..."
                className="w-full"
                invalid={
                  !!(typeof errors?.metadata === "string" && touched?.metadata)
                }
              />
            </FormControlWrapper>

            <div className="my-3 mt-5 text-center">
              <Button
                type="submit"
                variant="regular"
                size="md"
                disabled={!(dirty && isValid) || isSubmitting}
              >
                Submit
                {isSubmitting && <Spinner className="mr-0 ml-3" />}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AIHouseForm;
