"use client";
import React from "react";
import { FaqUtil } from "./FaqUtil";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  return (
    <div>
      {" "}
      <section id="faq" className="py-20 bg-opacity-30 bg-purple-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">
            Frequently Asked Questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-3xl mx-auto"
          >
            {FaqUtil.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-[20px] text-yellow-300 hover:text-yellow-200">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-blue-100 text-[15px] ">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default Faq;
