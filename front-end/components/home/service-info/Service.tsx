import React from "react";
import cn from "@/front-end/utils/cn";

const Service = ({ className, content, isFirst }) => {
  return (
    <section className={cn(className, "p-4", { "mt-4": !isFirst })}>
      <h2>{content.title}</h2>
      <p>{content.description}</p>
      <div className="mt-2">Learn more about our services.</div>
    </section>
  );
};

export default Service;
