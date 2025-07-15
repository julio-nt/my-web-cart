import logo from '../assets/logo_nautidesk_white.png';

const Footer = () => {
  return (
    <div
      className="text-sm font-semibold flex justify-between px-4 sm:px-8 py-1 mt-auto w-full dark:bg-gray-800 dark:text-white text-gray-700"
    >
      <div className="flex items-center gap-2">
        <img src={logo} alt="" width={25} height={20} className="object-contain" />
        <a href="https://nautidesk.com" target="_blank" rel="noopener noreferrer">
          <span className="hover:underline underline-offset-2">nautidesk © {new Date().getFullYear()}</span>
        </a>
      </div>
      {/* <div className="flex gap-4">
        <a href="https://nautidesk.com/privacy" target="_blank" rel="noopener noreferrer">
          <span className="hover:underline underline-offset-2">Política de Privacidade</span>
        </a>
        <a href="https://nautidesk.com/terms" target="_blank" rel="noopener noreferrer">
          <span className="hover:underline underline-offset-2">Termos</span>
        </a>
      </div> */}
    </div>
  );
};

export default Footer;
