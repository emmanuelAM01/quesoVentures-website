import React from "react";
import { IconType } from "react-icons";

interface ServiceCardProps {
  icon: IconType;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description }) => {
  return (
<div className="
  bg-white dark:bg-[#151618]
  p-6 rounded-xl
  border border-lightBorder dark:border-darkBorder/80
  transition-colors
">
<Icon size={34} className="text-lightAccent dark:text-darkAccent mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-lightText dark:text-darkText">
{title}</h3>
      <p className="text-lightTextMuted dark:text-darkTextMuted font-light">
{description}</p>
    </div>
  );
};

export default ServiceCard;