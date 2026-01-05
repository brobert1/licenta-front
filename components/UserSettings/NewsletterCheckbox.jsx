import { updateNewsletter } from '@api/client';
import { Checkbox } from '@components/Fields';
import { useMutation } from '@hooks';
import { isFunction } from 'lodash';

const NewsletterCheckbox = ({ subscribed, refetch }) => {
  const mutation = useMutation(updateNewsletter, {
    successCallback: () => {
      if (isFunction(refetch)) {
        refetch();
      }
    },
  });

  const handleChange = async (e) => {
    await mutation.mutate({ isNewsletter: e.target.checked });
  };

  return (
    <div className="flex justify-between py-4">
      <div className="flex flex-col">
        <p className="font-bold text-white">Newsletter subscription</p>
        <p className="text-sm text-grey font-medium">
          Receive occasional updates about new courses and announcements. No spam, guaranteed.
        </p>
      </div>
      <Checkbox checked={subscribed} disabled={mutation?.isLoading} onChange={handleChange} />
    </div>
  );
};

export default NewsletterCheckbox;
