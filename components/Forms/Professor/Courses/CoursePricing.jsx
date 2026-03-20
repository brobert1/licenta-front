import { Field, Fieldset } from '@components/HookForm';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { classnames } from '@lib';
import { Checkbox, Input, DateTimePicker } from '@components/Fields';

const CoursePricing = () => {
  const { watch, setValue } = useFormContext();
  const isPaid = watch('isPaid');
  const isOnSale = watch('sale.isActive');

  // When toggling paid, set currency to EUR; when off, clear fields
  useEffect(() => {
    if (!isPaid) {
      setValue('price', '', { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      setValue('currency', '', { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      setValue('sale.isActive', false, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue('sale.price', '', { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      setValue('sale.endsAt', '', { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    } else {
      setValue('currency', 'EUR', { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    }
  }, [isPaid, setValue]);

  useEffect(() => {
    if (!isOnSale) {
      setValue('sale.price', '', { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      setValue('sale.endsAt', '', { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    }
  }, [isOnSale, setValue]);

  return (
    <div className={classnames('bg-secondary w-full p-4 lg:rounded-lg lg:p-6 h-full')}>
      <h2 className="border-b pb-2 text-white text-lg font-semibold">Pricing</h2>
      <div className="mt-4 flex flex-col gap-4">
        <Fieldset name="isPaid">
          <Field as={Checkbox} name="isPaid">
            Paid course
          </Field>
        </Fieldset>
        <div className="grid gap-4 lg:grid-cols-2">
          <Fieldset label="Price" name="price">
            <Field
              as={Input}
              name="price"
              placeholder="49.99"
              inputMode="decimal"
              disabled={!isPaid}
            />
          </Fieldset>
          <Fieldset label="Currency" name="currency">
            <Field as={Input} name="currency" placeholder="EUR" disabled={true} />
          </Fieldset>
        </div>
        <Fieldset name="sale.isActive">
          <Field as={Checkbox} name="sale.isActive" disabled={!isPaid}>
            On sale
          </Field>
        </Fieldset>
        <div className="grid gap-4 lg:grid-cols-2">
          <Fieldset label="Sale price" name="sale.price">
            <Field
              as={Input}
              name="sale.price"
              placeholder="39.99"
              inputMode="decimal"
              disabled={!isPaid || !isOnSale}
            />
          </Fieldset>
          <Fieldset label="Sale ends at" name="sale.endsAt">
            <Field as={DateTimePicker} name="sale.endsAt" disabled={!isPaid || !isOnSale} />
          </Fieldset>
        </div>
      </div>
    </div>
  );
};

export default CoursePricing;
