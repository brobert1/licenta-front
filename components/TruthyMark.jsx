import { classnames } from '@lib';

const TruthyMark = ({ value, extraClass }) => {
  const isTruthy = Boolean(value);

  return (
    <>
      {isTruthy ? (
        <i className={classnames('fas fa-check text-green-500', extraClass)} />
      ) : (
        <i className={classnames('fa-solid fa-x text-red-500', extraClass)} />
      )}
    </>
  );
};

export default TruthyMark;
