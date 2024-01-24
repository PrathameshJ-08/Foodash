import React, { useState } from "react";
import Accordion from "./Accordion";

const NestedCategory = (props) => {
  const { data2, rinfo } = props;
  const [accordionStates, setAccordionStates] = useState({});

  const handleToggle = (categoryId) => {
    setAccordionStates({
      ...accordionStates,
      [categoryId]: !accordionStates[categoryId],
    });
  };

  return (
    <>
      <div className="mb-2 md:w-3/4 lg:w-1/2 xl:w-2/5 mx-auto py-4 rounded-xl mt-12">
        <h2 className="px-5 md:text-2xl text-xl font-bold text-center mb-4">
          {data2 && data2.title && data2.title.toUpperCase()}
        </h2>
        <div className="w-3/4 md:w-1/2 lg:w-1/4 border-t-4 border-gray-700 mx-auto"></div>
      </div>

      {data2 &&
        data2.categories.map((category) => (
          <Accordion
            key={category.title}
            data={category}
            isOpen={accordionStates[category.title]}
            onToggle={() => handleToggle(category.title)}
            rinfo={rinfo}
          />
        ))}
    </>
  );
};

export default NestedCategory;
