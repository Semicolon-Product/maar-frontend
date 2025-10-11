import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is MakautStudents.help?",
      answer:
        "MakautStudents.help is a platform that simplifies MAR activity submissions between students and teachers of MAKAUT.",
    },
    {
      question: "How do I submit my activity?",
      answer:
        "You can log in, fill the activity details, and upload supporting documents from the dashboard.",
    },
    {
      question: "Is my data safe?",
      answer:
        "Yes, all data is securely stored and only accessible by authorized faculty and admin.",
    },
    {
      question: "Can I edit my submission after uploading?",
      answer:
        "Yes, you can edit it before the teacher verifies it. After verification, it becomes read-only.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="text-center">
      <h2 className="text-3xl font-bold mb-10 dark:text-blue-100">
        Frequently Asked Questions
      </h2>

      <div className="grid md:grid-cols-1 gap-4 max-w-5xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className=" overflow-hidden border-b border-b-gray-100text-left transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full cursor-pointer  flex justify-between items-center px-5 py-3 font-medium text-gray-900 dark:text-blue-100"
            >
              {faq.question}
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`px-5 overflow-hidden transition-[max-height] duration-500 ease-in-out`}
              style={{
                maxHeight: openIndex === index ? "500px" : "0px",
              }}
            >
              <p className="py-3 text-gray-700 dark:text-blue-300">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
