import { Button } from '@components';
import { ChangePasswordModal, EditClientInfoModal } from '@components/Modals';
import DeleteAccountModal from '@components/Modals/DeleteAccountModal';
import { useDisclosure } from '@hooks';
import { ImageCombo, NewsletterCheckbox } from '.';

const Account = ({ data, refetch }) => {
  const editInfoDisclosure = useDisclosure();
  const changePasswordDisclosure = useDisclosure();

  return (
    <div className="flex flex-col gap-10 w-full max-w-2xl">
      <ImageCombo src={data?.image?.path} uuid={data?._id} />
      <div className="flex flex-col gap-6">
        <h3 className="text-white text-2xl font-bold">Personal details</h3>
        <div className="flex flex-col divide-y divide-tertiary">
          <div className="flex justify-between pb-4">
            <div className="flex flex-col">
              <p className="font-bold text-white">Name</p>
              <p className="text-sm text-grey font-medium">{data?.name}</p>
            </div>
            <Button
              onClick={editInfoDisclosure.show}
              className="text-white hover:underline font-semibold"
            >
              Edit
            </Button>
          </div>
          <div className="flex justify-between py-4">
            <div className="flex flex-col">
              <p className="font-bold text-white">Email address</p>
              <p className="text-sm text-grey font-medium">{data?.email}</p>
            </div>
            <Button
              onClick={editInfoDisclosure.show}
              className="text-white hover:underline font-semibold"
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
              <p className="font-bold text-white">Password</p>
              <p className="text-sm text-grey font-medium">••••••••••••</p>
            </div>
            <Button
              onClick={changePasswordDisclosure.show}
              className="text-white hover:underline font-semibold"
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
        <h3 className="text-white text-2xl font-bold">Manage account</h3>
        <div className="flex flex-col divide-y divide-tertiary">
          <div className="flex justify-between pb-4">
            <div className="flex flex-col">
              <p className="font-bold text-white">Delete account</p>
              <p className="text-sm text-grey font-medium">Permanently delete your account.</p>
            </div>
            <DeleteAccountModal client={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
