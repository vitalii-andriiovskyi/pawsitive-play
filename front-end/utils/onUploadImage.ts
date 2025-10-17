type UploadEvent = { xhr: { response: string } };
type UploadCallback = (key: string, url: string) => void;

const onUploadImage = ($event: UploadEvent, key: string, fn: UploadCallback): void => {
  const json = JSON.parse($event.xhr.response);
  fn(key, json.url);
};

export default onUploadImage;

