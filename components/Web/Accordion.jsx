import { useDisclosure } from '@hooks';

const Accordion = ({ question, answer }) => {
  const { isOpen, toggle } = useDisclosure();

  return (
    <div className="py-2">
      <div className="w-full border border-gray-300 rounded-xl">
        <div
          className="flex justify-between items-center w-full text-left px-4 py-4 lg:text-lg cursor-pointer font-medium text-gray-800 hover:text-blue-600"
          onClick={toggle}
        >
          <span>{question}</span>
          <span>{isOpen ? '−' : '+'}</span>
        </div>
        {isOpen && <div className="px-4 pb-4 text-gray-700">{answer}</div>}
      </div>
    </div>
  );
};

export default Accordion;
