import Footer from './components/Footer';
import MainContent from './components/MainContent';
import { useState } from 'react';
import { Icon } from '@iconify-icon/react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div data-theme={isDarkMode ? 'dark' : 'light'} className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
      <button className="ml-auto mr-5 mt-3 p-1 cursor-pointer" onClick={() => setIsDarkMode(!isDarkMode)}>
        <Icon className={'text-yellow-500'} icon={isDarkMode ? 'material-symbols-light:dark-mode' : 'material-symbols:light-mode'} width={30} />
      </button>
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
