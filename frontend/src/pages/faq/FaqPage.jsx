import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function FaqPage() {
  const faqs = [
    {
      id: 1,
      question: "How do I book a service?",
      answer:
        "Go to the services page, choose your service, and click on the book button.",
    },
    {
      id: 2,
      question: "Can I cancel a booking?",
      answer:
        "Yes, you can cancel from your dashboard before the service starts.",
    },
    {
      id: 3,
      question: "What payment methods are accepted?",
      answer:
        "We accept credit/debit cards, mobile banking, and cash on delivery.",
    },
    {
      id: 4,
      question: "Are providers verified?",
      answer:
        "Yes, all providers go through a strict verification process before being listed.",
    },
    {
      id: 5,
      question: "Can I rate a service?",
      answer:
        "After the service is completed, you can leave a rating and review for the provider.",
    },
    {
      id: 6,
      question: "Is customer support available?",
      answer: "Yes, our customer support team is available 24/7 to assist you.",
    },
  ];

  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-[#5C7E8F] mb-12">
        Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="border border-gray-200 rounded-xl shadow-md overflow-hidden transition-all duration-300"
          >
            {/* Question */}
            <button
              onClick={() => toggleFaq(faq.id)}
              className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800 hover:bg-[#EAF3F5] transition-colors duration-200"
            >
              <span className="text-sm sm:text-base md:text-lg">{faq.question}</span>
              <span className="text-[#5C7E8F]">
                {openId === faq.id ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>

            {/* Answer */}
            <div
              className={`px-5 pb-5 text-gray-700 text-sm sm:text-base transition-all duration-300 ${
                openId === faq.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FaqPage;
