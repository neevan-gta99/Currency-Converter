import { ModeContext } from "./ContextData";

const NavBar = ({ setDarkMode, darkMode }: { setDarkMode: Function; darkMode: boolean }) => {

    const handleDarkMode = (checked: boolean) => {
    setDarkMode(checked);

    let nav = document.querySelector("#topnav");
    nav?.classList.remove(checked ? "light" : "dark");
    nav?.classList.add(checked ? "dark" : "light");
  };



    return (<>

        <ModeContext.Provider value={darkMode}>

        <div className={`mynavbar ${darkMode ? "dark" : "light"}`} id="topnav">
            <div>
                <h1 id="nav-heading" className={` ${darkMode ? "dark-mode-common-color" : "light-mode-common-color"}`}>Currency Converter</h1>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={darkMode} onChange={(event)=>handleDarkMode(event.target.checked)}/>
                <label className={`form-check-label ${darkMode ? "dark-mode-common-color" : "light-mode-common-color"}`} htmlFor="flexSwitchCheckDefault">Dark Mode {darkMode ? "On" : "Off"}</label>
            </div>
        </div>
        </ModeContext.Provider>




    </>)

}

export default NavBar;