import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const { getItem, setItem } = useLocalStorage();

  const [isDarkMode, setIsDarkMode] = useState(getItem("theme") === "dark" ? true : false);
  const [language, setLanguage] = useState(getItem("language") === "en" ? "en" : "pt");

  useEffect(() => {
    console.log("AAA", isDarkMode);
    setItem({ key: "theme", value: isDarkMode ? "dark" : "light" });
  }, [isDarkMode]);

  useEffect(() => {
    setItem({ key: "language", value: language });
  }, [language]);

  return (
    <div data-theme={isDarkMode ? "dark" : "light"} className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800" key={language}>
      <div className="ml-auto mr-5 mt-3 flex items-center justify-end gap-4">
        <button className="p-1 cursor-pointer" onClick={() => setLanguage(language === "pt" ? "en" : "pt")}>
          <Icon icon={language === "pt" ? "emojione-v1:flag-for-brazil" : "emojione-v1:flag-for-united-states"} width={30} />
        </button>
        <button className="p-1 cursor-pointer" onClick={() => setIsDarkMode(!isDarkMode)}>
          <Icon className={"text-yellow-500"} icon={isDarkMode ? "material-symbols-light:dark-mode" : "material-symbols:light-mode"} width={30} />
        </button>
      </div>
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
