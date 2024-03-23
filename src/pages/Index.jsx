"use client"

import Form from "@/components/Form";
import Divider from "@/components/Divider";
import OutputSection from "@/sections/OutputSection"
import { useState, useEffect } from "react";

import { convertBinarytoIEEE } from '../utils/numberConverter.js';


export default function Index() {
  const [selectedOption, setSelectedOption] = useState("B"); 
  const [numb, setNumb] = useState("");
  const [dec, setDec] = useState("");
  const [clearInput, setClearInput] = useState(false);
  const [exponent, setExponent] = useState(0)
  const [convertedOutput, setConvertedOutput] = useState("")
  const [isValidInput, setIsValidInput] = useState(false);

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

    setIsValidInput(false);

    if (selectedOption === "B") {
        let binaryValidation = /^(NaN|[-+]?[01]+\.?[01]*)$/;
        if (binaryValidation.test(inputValue)) {
            console.log("valid: " + inputValue);
            setIsValidInput(true);
        } else {
            console.log("invalid: " + inputValue);
            setIsValidInput(false); 
        }

        setNumb(inputValue);

    } else {
        let decValidation = /^(NaN|[-+]?[0-9]+\.?[0-9]*)$/;

        if (decValidation.test(inputValue)) {
            console.log("valid: " + inputValue);
            setIsValidInput(true);
        } else {
            console.log("invalid: " + inputValue);
            setIsValidInput(false); 
        }

        setDec(inputValue);

    }
  };

  const handleConvertButton = () => {
      let inputBorD = selectedOption
      let inputMantissa = (inputBorD == "B" ? numb : dec)
      let inputExponent = exponent

      if (inputBorD === "B") {
          let binaryConverted = convertBinarytoIEEE (inputBorD, inputMantissa, inputExponent)
          setConvertedOutput(binaryConverted)
          console.log("converted IEEE FP Representation: ")
          console.log("   binary: " + binaryConverted.binary)
          console.log("   hex: " + binaryConverted.hex)
      }
      else {
          let decimalConverted = convertBinarytoIEEE (inputBorD, inputMantissa, inputExponent)
          setConvertedOutput(decimalConverted)
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
    <main className="flex min-h-screen flex-col items-center justify-between p-5 md:p-24 bg-neutral-300">
      <div className="rounded-lg p-4 md:p-20 z-10 max-w-5xl w-full items-center justify-between bg-primary-100">
        <p className="text-xl md:text-3xl font-bold">
            IEEE-754 Binary-64 floating point converter
        </p>
       
       <Divider
       color="bg-neutral-200"
       />

        <div className="w-full rounded-lg mt-12 flex justify-center">
            <Form 
                selectedOption={selectedOption}
                numb={numb}
                dec={dec}
                exponent={exponent}
                handleDropdownChange={handleDropdownChange}
                handleExponentChange={handleExponentChange}
                handleInputChange={handleInputChange}
                handleConvertButton={handleConvertButton}
                isValidInput={isValidInput}
            />
        </div>

        <OutputSection convertedOutput={convertedOutput} selectedOption={selectedOption} numb={numb} dec={dec} exponent={exponent}/>
        
      </div>
    </main>
  );
}
