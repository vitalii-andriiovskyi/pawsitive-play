import React from "react";
import Image from "next/image";
import { FileUpload, FileUploadUploadEvent } from "primereact/fileupload";

import CONFIG from "@/front-end/config/config";
import cn from "@/front-end/utils/cn";
import { Image as ImageModel } from "@/shared/features/image/domain/image.model";
import { getDefaultImage } from "@/front-end/components/shared/form/image-uploader/data";
import FormControlWrapper from "@/front-end/components/shared/form-control-wrapper/FormControlWrapper";
import DebouncedInputText from "@/front-end/components/shared/form/debounced-input-text/DebouncedInputText";
import getId from "@/front-end/utils/getId";

interface ImageUploaderProps {
  className?: string;
  setFieldValue: (field: string, value: string | number | boolean) => void;
  setFieldTouched: (field: string, touched?: boolean) => void;
  nameStart: string;
  values: ImageModel;
  onUpload?: (data: { src: string; width: number; height: number }) => void;
  touched?: { [key: string]: boolean | undefined };
  errors?: { [key: string]: string | undefined };
}

/**
 *
 * @param {nameStart} nameStart - I use objects for Formik values like
 * `{ section: { image: {src: '', alt: '' } } }` and to set `src`
 * we need to tell the full path `section.image.src`. For example: `setFieldValue('section.image.src', value)`.
 *
 * `nameStart` in this example is `section.image`. It could be `section.array[0].button` and so on.
 *
 * @returns JSX
 */
const ImageUploader: React.FC<ImageUploaderProps> = ({
  className = "",
  setFieldValue,
  setFieldTouched,
  nameStart = "",
  values = getDefaultImage(),
  onUpload = () => {},
  touched,
  errors,
}) => {
  const onUploadImage = ($event: FileUploadUploadEvent) => {
    const json = JSON.parse(($event.xhr as XMLHttpRequest).response);
    setFieldValue(`${nameStart}.id`, getId());
    setFieldValue(`${nameStart}.src`, json.url);
    setFieldValue(`${nameStart}.width`, json.width);
    setFieldValue(`${nameStart}.height`, json.height);
    if (onUpload) {
      onUpload({
        src: json.url,
        width: json.width,
        height: json.height,
      });
    }
  };

  const onError = () => {
    // for demo purpose only as I don't have BE implemented
    const demoImage = {
      src: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
      width: 400,
      height: 600,
    };
    setFieldValue(`${nameStart}.id`, getId());
    setFieldValue(`${nameStart}.src`, demoImage.src);
    setFieldValue(`${nameStart}.width`, demoImage.width);
    setFieldValue(`${nameStart}.height`, demoImage.height);
  };

  return (
    <div
      className={cn(
        className,
        "bg-primary-900/5 my-3 flex flex-col gap-4 rounded-md p-4 pb-6",
      )}
    >
      <FormControlWrapper
        label="Image description (alt text)"
        id={`${nameStart}.alt`}
        isTouched={touched?.alt}
        errorMsg={errors?.alt}
      >
        <DebouncedInputText
          className="w-full"
          name={`${nameStart}.alt`}
          value={values.alt}
          onChange={(value) => setFieldValue(`${nameStart}.alt`, value)}
          onBlur={() => setFieldTouched(`${nameStart}.alt`, true)}
          required
          id={`${nameStart}.alt`}
        />
      </FormControlWrapper>

      <div>
        <h3>
          Image <span className="text-red-500">*</span>
        </h3>
        {values.src && (
          <Image
            className="img-preview"
            src={values.src}
            alt={values.alt}
            width={200}
            height={150}
            objectFit="cover"
          />
        )}
        <FileUpload
          url={CONFIG.FILE_UPLOAD_URL}
          name="image"
          multiple
          accept="image/*"
          maxFileSize={10000000}
          emptyTemplate={
            <p className="m-0">Drag and drop files to here to upload.</p>
          }
          withCredentials
          onUpload={onUploadImage}
          onError={onError}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
