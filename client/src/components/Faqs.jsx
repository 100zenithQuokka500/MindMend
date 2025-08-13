import { useState } from "react";
const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
    <hr />
    <section className="py-16 bg-purple-50">
        
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
          <h1 className="text-3xl font-bold mb-8 md:mb-0 md:w-1/3">Your most popular FAQs</h1>
          <div className="space-y-4 md:w-2/3">
            {faqData.map((faq, index) => (
              <div key={index} className="faq-item bg-white p-4 rounded-lg shadow-lg">
                <div
                  className={`faq-question flex justify-between items-center cursor-pointer ${openIndex === index ? 'font-bold' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-toggle">{openIndex === index ? '-' : '+'}</span>
                </div>
                {openIndex === index && (
                  <div className="faq-content mt-2 text-gray-700">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <hr />
    </>
    
  );
};

const faqData = [
  {
    question: 'How secure is my personal information on MindMend?',
    answer: 'Your privacy and security are our top priorities. We employ enterprise-grade encryption and maintain strict HIPAA compliance to ensure all your data remains completely confidential and protected.',
  },
  {
    question: 'Can the AI companion replace human therapists?',
    answer: 'Our AI companion is designed to complement, not replace, human therapists. It provides immediate support and guidance while helping you connect with qualified professionals when you need more specialized care.',
  },
  {
    question: 'What measures do you take to protect client confidentiality?',
    answer: 'We implement multiple layers of security including end-to-end encryption, secure data centers, and strict access controls. Only authorized personnel can access data, and all interactions are completely private.',
  },
  {
    question: 'What are the costs associated with using MindMend?',
    answer: 'MindMend offers flexible pricing options to meet different needs. We provide a free tier with essential features, plus premium plans that unlock advanced capabilities and enhanced support services.',
  },
];

export default Faqs;


