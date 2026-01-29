import { AiOutlineFacebook, AiOutlineX, AiOutlineGithub, AiOutlineLinkedin, AiOutlineInstagram } from "react-icons/ai";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-lightBG border-t border-gray-100 dark:bg-darkBG shadow-sm text-lightText dark:text-darkText py-6 dark:border-t dark:border-gray-800">
      <div className="container mx-auto px-4 flex flex-wrap justify-center flex flex-col sm:justify-between items-center text-sm">
        <p className="ml-4">&copy; {currentYear} Queso Ventures</p>

      </div>
    </footer>
  );
};

export default Footer;
