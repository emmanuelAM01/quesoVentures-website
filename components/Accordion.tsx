"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, toggleOpen }) => {
  return (
    <div className="mb-3">
      <div
        className={[
          "w-full rounded-xl overflow-hidden",
          "border border-lightBorder dark:border-darkBorder",
          "bg-white/70 dark:bg-white/5 backdrop-blur",
          "transition-colors",
        ].join(" ")}
      >
        <button
          className="w-full text-left p-4 flex justify-between items-center"
          onClick={toggleOpen}
          type="button"
        >
          <span className="text-base sm:text-lg font-semibold text-lightText dark:text-darkText">
            {title}
          </span>

          <span className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
            <FaChevronDown className="text-lg text-lightTextMuted dark:text-darkTextMuted" />
          </span>
        </button>

        <div
          className={`overflow-hidden transition-[max-height] duration-200 ease-in-out ${
            isOpen ? "max-h-[600px]" : "max-h-0"
          }`}
        >
          <div className="px-4 pb-4 text-start">
            <p className="text-sm sm:text-base font-light text-lightTextMuted dark:text-darkTextMuted leading-relaxed">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AccordionProps {
  items: { title: string; content: string }[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-xl">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          toggleOpen={() => toggleItem(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
