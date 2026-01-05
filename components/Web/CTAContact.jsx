import { Button } from '@components';

const CTAContact = () => {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-5 rounded-xl border border-gray-300 p-5 sm:flex-row sm:gap-8">
      <div className="inline-flex flex-col items-center justify-start gap-2.5 sm:items-start">
        <h3 className="text-center text-2xl leading-9 font-semibold text-gray-900 sm:text-start">
          Need Help?
        </h3>
        <p className="text-center text-base leading-relaxed font-normal text-gray-500 sm:text-start">
          Have a question or need assistance? Contact us, and we’ll be happy to help!
        </p>
      </div>
      <Button href="/contact" className="button full accent rounded-full font-semibold lg:text-lg">
        Contact
      </Button>
    </div>
  );
};

export default CTAContact;
