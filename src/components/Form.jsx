import React, { useState, useEffect } from 'react';
import Button from './Button';
import { convertBinarytoIEEE, getEPrime, getFractionalPart, getSignBit, normalizeBinaryMantissa } from '../utils/numberConverter.js';

const Form = () => {
    const [selectedOption, setSelectedOption] = useState("B"); 
    const [numb, setNumb] = useState("");
    const [dec, setDec] = useState("");
    const [clearInput, setClearInput] = useState(false);
    const [exponent, setExponent] = useState(0)

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
        setClearInput(true); 
    };

    const handleExponentChange = (event) => {
        let inputValue = event.target.value;
        setExponent(inputValue)
    }

    const handleInputChange = (event) => {
        
        let inputValue = event.target.value;

        if (selectedOption === "B") {
            let sanitizedInput = inputValue.replace(/[^0-1.\+-]/g, '').trim();

            let binaryValidation = /^(-|\+)?(0|1)+(\.(0|1)+)?$/g;

            switch (binaryValidation.test(sanitizedInput)){
                case (true):
                    console.log("valid: " + sanitizedInput);
                    break;
                case (false):
                    console.log("invalid: " + sanitizedInput);
                    //disable convert button
                    break;

            }

            // const dotIndex = sanitizedInput.indexOf('.');
            // if (dotIndex !== -1) {
            //     sanitizedInput = sanitizedInput.slice(0, dotIndex + 1) + sanitizedInput.slice(dotIndex + 1).replace('.', '');
            // }
            // console.log('here')

            setNumb(sanitizedInput);
        } else {
            setDec(inputValue);
        }
    };

    const handleConvertButton = () => {
        let inputBorD = selectedOption
        let inputMantissa = (inputBorD == "B" ? numb : dec)
        let inputExponent = exponent

        if (inputBorD === "B") {
            let binaryConverted = convertBinarytoIEEE (inputBorD, inputMantissa, inputExponent)
            console.log("converted IEEE FP Representation: ")
            console.log("   binary: " + binaryConverted.binary)
            console.log("   hex: " + binaryConverted.hex)
        }
        else {
            let decimalConverted = convertBinarytoIEEE (inputBorD, inputMantissa, inputExponent)
            console.log("converted IEEE FP Representation: ")
            console.log("   binary: " + decimalConverted.binary)
            console.log("   hex: " + decimalConverted.hex)
        }

    }

    useEffect(() => {
        if (clearInput) {
            setNumb(""); 
            setDec("");
            setClearInput(false);
        }
    }, [selectedOption]); 

    return (
        <section>

            <form className="w-full md:px-10">
             <div className="grid md:grid-cols-4 md:gap-5 items-center justify-center">
                <div className="mb-5 col-span-2">
                <label className="block mb-2 text-sm font-medium text-neutral-100">{selectedOption == "B" ? "Binary Mantissa" : "Decimal"}</label>

                    { selectedOption === "B" ? 
                         <input 
                                type="text" 
                                id="mantissa-input" 
                                className="block w-full p-2.5 text-neutral-100 border border-neutral-200 rounded-lg bg-neutral-400 text-sm focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleInputChange}
                                min="0"
                                max="1"
                                pattern="/^(-|\+)?(0|1)+(\.(0|1)+)?$/g"
                                value={numb}
                                  />
                    :
                            <input 
                                type="number" 
                                id="mantissa-input" 
                                className="block w-full p-2.5 text-neutral-100 border border-neutral-200 rounded-lg bg-neutral-400 text-sm focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleInputChange}
                                value={dec}
                            />
                    }
                    
                    
                </div>

                <div className="mb-5 col-span-2 md:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-neutral-100">Base-{selectedOption == "B" ? "2" : "10"} Exponent</label>
                    <input 
                        type="number" 
                        id="base-input" 
                        className="block w-full p-2.5 text-neutral-100 border border-neutral-200 rounded-lg bg-neutral-400 text-sm focus:ring-blue-500 focus:border-blue-500"
                        onChange={handleExponentChange}
                        value={exponent}
                    />
                </div>

                
               <div className="mb-5 col-span-2 md:col-span-1">

               <label className="block mb-2 text-sm font-medium text-neutral-100">Format Option</label>
                    <select value={selectedOption} onChange={handleDropdownChange} id="format" className="bg-neutral-400 border  border-neutral-200 text-neutral-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="B">Binary</option>
                        <option value="D">Decimal</option>
                    </select>
                </div>
               </div>

                <div className="w-full mt-3">
                   <Button 
                    text="Convert" id="convert" onClick={handleConvertButton}
                   />
                </div>
              
            </form>
        </section>
       
    );
  }
  
export default Form

