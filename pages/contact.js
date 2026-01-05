import { ContactForm } from '@components/Forms';
import { Footer, Header } from '@components/Visitor';

const Page = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="block">
        <div className="grid gap-4 bg-blue-700 py-28">
          <h2 className="font-bold text-center text-3xl lg:text-5xl text-white">Get in touch</h2>
          <p className="mx-auto max-w-2xl text-center px-10 lg:text-xl font-normal text-gray-200">
            Have questions or need support? I’m here to help! Reach out, and I’ll get back to you as
            soon as possible.
          </p>
        </div>
        <div className="mx-auto max-w-7xl -translate-y-16 px-4 lg:px-4">
          <div id="contact" className="rounded-3xl bg-white p-7 shadow-2xl xl:w-2/3 xl:mx-auto">
            <ContactForm />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Page;
