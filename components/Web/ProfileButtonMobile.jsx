import { usePreview, useQuery } from '@hooks';
import { classnames } from '@lib';
import { ProfileLoading, ProfileMenuMobile } from '.';

const ProfileButtonMobile = () => {
  const { data, status } = useQuery('/client/account');
  const { isPreview } = usePreview();

  return (
    <div
      className={classnames(
        'flex flex-col',
        isPreview && 'opacity-50 cursor-not-allowed pointer-events-none'
      )}
    >
      <div className="flex items-center gap-2">
        {status === 'loading' && <ProfileLoading />}
        {status === 'success' && (
          <>
            {data?.image?.path ? (
              <img
                src={data?.image.path}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary">
                <i className="fas fa-user text-lg text-white"></i>
              </div>
            )}
            <div className="flex flex-col text-left">
              <p className="font-semibold text-white">{data.name}</p>
              <p className="text-sm text-grey">{data.email}</p>
            </div>
          </>
        )}
      </div>
      {status === 'success' && <ProfileMenuMobile />}
    </div>
  );
};

export default ProfileButtonMobile;
