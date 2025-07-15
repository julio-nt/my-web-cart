import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const { getItem, setItem } = useLocalStorage();
  const [isDarkMode, setIsDarkMode] = useState(getItem("theme") === "dark" ? true : false);

  useEffect(() => {
    console.log("AAA", isDarkMode);
    setItem({ key: "theme", value: isDarkMode ? "dark" : "light" });
  }, [isDarkMode]);

  return (
    <div data-theme={isDarkMode ? "dark" : "light"} className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
      <button className="ml-auto mr-5 mt-3 p-1 cursor-pointer" onClick={() => setIsDarkMode(!isDarkMode)}>
        <Icon className={"text-yellow-500"} icon={isDarkMode ? "material-symbols-light:dark-mode" : "material-symbols:light-mode"} width={30} />
      </button>
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
