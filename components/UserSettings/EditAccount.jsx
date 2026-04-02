import { Button } from '@components';
import {
  ChangePasswordModal,
  DeleteAccountModal,
  EditClientInfoModal,
} from '@components/Modals';
import { useDisclosure } from '@hooks';
import ImageCombo from './ImageCombo';
import NewsletterCheckbox from './NewsletterCheckbox';

const EditAccount = ({ data, refetch }) => {
  const editInfoDisclosure = useDisclosure();
  const changePasswordDisclosure = useDisclosure();

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex w-full flex-col gap-6 rounded-lg bg-white p-6 text-primary">
        <ImageCombo src={data?.image?.path} uuid={data?._id} />
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="text-primary text-2xl font-bold">Personal details</h3>
        <div className="flex flex-col divide-y divide-tertiary">
          <div className="flex justify-between pb-4">
            <div className="flex flex-col">
              <p className="font-bold text-primary">Name</p>
              <p className="text-sm text-muted font-medium">{data?.name}</p>
            </div>
            <Button
              onClick={editInfoDisclosure.show}
              className="text-accent hover:text-accent-hover hover:underline font-semibold"
            >
              Edit
            </Button>
          </div>
          <div className="flex justify-between py-4">
            <div className="flex flex-col">
              <p className="font-bold text-primary">Email address</p>
              <p className="text-sm text-muted font-medium">{data?.email}</p>
            </div>
            <Button
              onClick={editInfoDisclosure.show}
              className="text-accent hover:text-accent-hover hover:underline font-semibold"
            >
              Edit
            </Button>
          </div>
          <EditClientInfoModal
            hide={editInfoDisclosure.hide}
            isOpen={editInfoDisclosure.isOpen}
            client={data}
          />
          <div className="flex justify-between py-4">
            <div className="flex flex-col">
              <p className="font-bold text-primary">Password</p>
              <p className="text-sm text-muted font-medium">••••••••••••</p>
            </div>
            <Button
              onClick={changePasswordDisclosure.show}
              className="text-accent hover:text-accent-hover hover:underline font-semibold"
            >
              Edit
            </Button>
          </div>
          <ChangePasswordModal
            hide={changePasswordDisclosure.hide}
            isOpen={changePasswordDisclosure.isOpen}
          />
          {process.env.SHOW_NEWSLETTER === 'yes' && (
            <NewsletterCheckbox subscribed={data.isNewsletter} refetch={refetch} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="text-primary text-2xl font-bold">Manage account</h3>
        <div className="flex flex-col divide-y divide-tertiary">
          <div className="flex justify-between pb-4">
            <div className="flex flex-col">
              <p className="font-bold text-primary">Delete account</p>
              <p className="text-sm text-muted font-medium">Permanently delete your account.</p>
            </div>
            <DeleteAccountModal client={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
