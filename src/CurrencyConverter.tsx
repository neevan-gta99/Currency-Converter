import { useContext, useEffect, useState } from "react"
import { ModeContext } from "./ContextData"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { currencyList } from "./currencyList";
import { countryList } from "./countryList";

export default function CurrencyConverter() {

    // Dark Mode Logic
    const isDark = useContext(ModeContext);

    let bd = document.body;

    let common = document.querySelectorAll(".common");
    let commonBorder = document.querySelectorAll(".common-border");


    useEffect(() => {
        if (isDark) {
            bd.classList.add("darkBody");
            common.forEach((el) => {
                el.classList.add("dark-mode-common-color");
                el.classList.remove("light-mode-common-color");

            });
            commonBorder.forEach((el) => {
                el.classList.add("dark-mode-common-border");
                el.classList.remove("light-mode-common-border");
            });
        } else {
            bd.classList.remove("darkBody");
            common.forEach((el) => {
                el.classList.add("light-mode-common-color");
                el.classList.remove("dark-mode-common-color");
            });
            commonBorder.forEach((el) => {
                el.classList.add("light-mode-common-border");
                el.classList.remove("dark-mode-common-border");
            });
        }
    }, [isDark]);

    // Dark Mode Logic end

    // courrency converter logic

    const [countryCode, setCountryCode] = useState(countryList["United States"]);
    const [currencyCode, setCurrencyCode] = useState(currencyList["US"]);
    const [name, setName] = useState("United States");

    const [countryCode2, setCountryCode2] = useState(countryList["India"]);
    const [currencyCode2, setCurrencyCode2] = useState(currencyList["IN"]);
    const [name2, setName2] = useState("India");

    const [rate, setRate] = useState(1);
    const [rate2, setRate2] = useState(85.7264);

    const handleSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {

        const selected = event.target.value;
        setName(selected);
        setCountryCode(countryList[selected as keyof typeof countryList])
        console.log(selected);

        console.log(rate);

        if (rate !== null) {

            const cntryCode = countryList[selected as keyof typeof countryList];
            const crncyCode = currencyList[cntryCode as keyof typeof currencyList];

            setCurrencyCode(crncyCode);

            getExchangeRate(rate, crncyCode)
        }

    }



    const handleSelection2 = (event: React.ChangeEvent<HTMLSelectElement>) => {

        const selected = event.target.value;
        setName2(selected);
        setCountryCode2(countryList[selected as keyof typeof countryList])

        if (rate2 !== null) {

            const cntryCode = countryList[selected as keyof typeof countryList];
            const crncyCode = currencyList[cntryCode as keyof typeof currencyList];
            setCurrencyCode2(crncyCode);

            getExchangeRate2(rate2, crncyCode);
        }


    }

    const baseURL = "https://v6.exchangerate-api.com/v6/2c8104641a9ce81820995ace/latest";

    const handleRateField = (event: React.ChangeEvent<HTMLInputElement>) => {

        const entred = parseFloat(event.target.value);
        setRate(entred)
        const crncyCode = currencyList[countryCode as keyof typeof currencyList];
        setCurrencyCode(crncyCode);


        getExchangeRate(entred, crncyCode);



    }



    const getExchangeRate = async (entred: number, crrncyCode: string) => {

        const creatAPI = `${baseURL}/${crrncyCode}`;

        const response = await fetch(creatAPI);

        const data = await response.json();

        const currencies = data.conversion_rates[currencyCode2];

        const amt = currencies * entred;

        setRate2(amt);

    }


    const handleRateField2 = (event: React.ChangeEvent<HTMLInputElement>) => {

        const entred = parseFloat(event.target.value);
        setRate2(entred)
        const crncyCode = currencyList[countryCode2 as keyof typeof currencyList];
        setCurrencyCode2(crncyCode);

        getExchangeRate2(entred, crncyCode)

    }

    const getExchangeRate2 = async (entred: number, crrncyCode: string) => {

        const creatAPI = `${baseURL}/${crrncyCode}`;

        const response = await fetch(creatAPI);

        const data = await response.json();

        const currencies = data.conversion_rates[currencyCode];

        const amt = currencies * entred;

        setRate(amt);

    }


    return (<>


        <div className="bigBox">
            
            <div className="left-div">

                <h1 className="country-heading common" >{name}</h1>

                <img src={`https://flagsapi.com/${countryCode}/shiny/64.png`} alt="" className="flag-image" />

                <div>

                    <select className="selection common common-border" name="" id="" value={name} onChange={(event) => { handleSelection(event) }}>
                        {Object.entries(countryList).map(([Name, cntryCode]) => (
                            <option key={cntryCode} value={Name}>
                                {Name}
                            </option>
                        ))}

                    </select>
                </div>

                <div>
                    <input placeholder="Enter Amount Here" className="amount common common-border" type="number" value={rate} onChange={(event) => handleRateField(event)} />
                    <span className="currency common" style={{ marginLeft: "7px" }}>{currencyCode}</span>

                </div>
                <span className="country common" > Country Code : {countryCode}</span>


            </div>

            <div className="mid-div">

                <FontAwesomeIcon icon={faRightLeft} className="exchange common" />


            </div>

            <div className="right-div">

                <h1 className="country-heading common" >{name2}</h1>

                <img src={`https://flagsapi.com/${countryCode2}/shiny/64.png`} alt="" className="flag-image" />

                <div>
                    <select className="selection common common-border" name="" id="" value={name2} onChange={(event) => { handleSelection2(event) }}>
                        {Object.entries(countryList).map(([Name, cntryCode]) => (
                            <option key={cntryCode} value={Name}>
                                {Name}
                            </option>
                        ))}

                    </select>
                </div>


                <div>
                    <input placeholder="Enter Amount Here" className="amount common common-border" type="number" value={rate2} onChange={(event) => handleRateField2(event)} />
                    <span className="currency common" style={{ marginLeft: "7px" }}>{currencyCode2}</span>
                </div>
                <span className="country common" > Country Code : {countryCode2}</span>


            </div>

        </div>


    </>)


}