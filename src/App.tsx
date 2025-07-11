import { useState } from 'react';
import NavBar from './NavBar';
import CurrencyConverter from './CurrencyConverter';
import { ModeContext } from './ContextData';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ModeContext.Provider value={darkMode}>
      <NavBar setDarkMode={setDarkMode} darkMode={darkMode} />
      <CurrencyConverter />
    </ModeContext.Provider>
  );
}

export default App;
