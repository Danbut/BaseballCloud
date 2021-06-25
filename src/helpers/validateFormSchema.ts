import { setIn } from 'final-form';
/* eslint-disable */
// @ts-ignore
const validateFormValues = (schema) => async (values) => {
  if (typeof schema === 'function') schema = schema();

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (e) {
    return e.inner.reduce(
      // @ts-ignore
      (errors, error) => setIn(errors, error.path, error.message),
      {}
    );
  }
};

export default validateFormValues;
