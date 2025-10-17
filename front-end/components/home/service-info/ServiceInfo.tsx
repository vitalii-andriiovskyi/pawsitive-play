import React from "react";
import cn from "@/front-end/utils/cn";

const ServiceInfo = ({ className, content }) => {
  return (
    <section className={cn(className, "p-4")}>
      <h2>{content.title}</h2>
      <p>{content.description}</p>
    </section>
  );
};

export default ServiceInfo;
