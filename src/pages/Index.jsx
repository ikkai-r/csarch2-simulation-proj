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
        let sanitizedInput = inputValue.replace(/^(NaN|[0-1+\-.]*)$/g, '').trim();

        let binaryValidation = /^(NaN|[0-1+\-.]*)$/;

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
        let sanitizedInput = inputValue.replace(/^(NaN|[0-9+\-.]*)$/g, '').trim();

        let binaryValidation = /^(NaN|[0-9+\-.]*)$/;

        switch (binaryValidation.test(sanitizedInput)){
            case (true):
                console.log("valid: " + sanitizedInput);
                break;
            case (false):
                console.log("invalid: " + sanitizedInput);
                //disable convert button
                break;

        }

        setDec(sanitizedInput);
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
            />
        </div>

        <OutputSection convertedOutput={convertedOutput} />
        
      </div>
    </main>
  );
}
