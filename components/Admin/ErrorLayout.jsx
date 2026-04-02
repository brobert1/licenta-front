import { Layout } from '@components';

const ErrorLayout = () => {
  return (
    <Layout title="Error" variant="admin">
      <div className="flex flex-col justify-center items-center">
        <div className="flex gap-5 w-full p-6 bg-red-50 border border-red-200 drop-shadow-sm rounded items-center">
          <i className="fa-solid fa-circle-xmark text-red-500 text-lg"></i>
          <p className="text-red-800 font-medium">
            We are sorry, an error occurred that prevents us from displaying the page correctly.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ErrorLayout;
