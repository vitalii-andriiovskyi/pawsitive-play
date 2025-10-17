/* eslint-disable @typescript-eslint/no-explicit-any */
const updateNestedObjInLS = ({ key, value }: { key: string, value: any }) => {
  if (!key || (typeof window !== 'object') || (typeof window !== 'object' && !localStorage)) return;

  try {
    let data: any = localStorage.getItem(key);
    data = data ? JSON.parse(data) : data;

    if (!data) {
      localStorage.setItem(key, JSON.stringify(value));
      return;
    }

    const props = Object.keys(value);
    props.forEach((prop) => {
      if (typeof value[prop] === 'object') {
        data[prop] = { ...data[prop], ...value[prop] };
      } else {
        data[prop] = value[prop];
      }
    });
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
};

export default updateNestedObjInLS;
