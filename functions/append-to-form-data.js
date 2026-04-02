/**
 * Append a value to a form data object
 *
 * @param {FormData} formData The form data to append to
 * @param {string} key The key to append to the form data
 * @param {any} value The value to append to the form data
 */
const appendToFormData = (formData, key, value) => {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      if (typeof item === 'object' && item !== null && !(item instanceof File)) {
        Object.keys(item).forEach((nestedKey) => {
          appendToFormData(formData, `${key}[${index}].${nestedKey}`, item[nestedKey]);
        });
      } else {
        appendToFormData(formData, `${key}[${index}]`, item);
      }
    });
  } else if (typeof value === 'object' && value !== null && !(value instanceof File)) {
    Object.keys(value).forEach((nestedKey) => {
      appendToFormData(formData, `${key}.${nestedKey}`, value[nestedKey]);
    });
  } else {
    formData.append(key, value);
  }
};

export default appendToFormData;
