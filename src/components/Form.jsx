import React, { useState } from 'react';
import Button from './Button';

const Form = () => {
    const [selectedOption, setSelectedOption] = useState("B"); 

    const handleDropdownChange = (event) => {
      setSelectedOption(event.target.value);
    };

    return (
        <section>

            <form className="w-full md:px-10">
             <div className="grid md:grid-cols-4 md:gap-5 items-center justify-center">
                <div className="mb-5 col-span-2">
                    <label className="block mb-2 text-sm font-medium text-neutral-100">{selectedOption == "B" ? "Binary Mantissa" : "Decimal"}</label>
                    <input type="text" id="base-input" className="block w-full p-2.5 text-neutral-100 border border-neutral-200 rounded-lg bg-neutral-400 text-sm focus:ring-blue-500 focus:border-blue-500"/>
                </div>

                <div className="mb-5 col-span-2 md:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-neutral-100">Base-{selectedOption == "B" ? "2" : "10"} Exponent</label>
                    <input type="text" id="base-input" className="block w-full p-2.5 text-neutral-100 border border-neutral-200 rounded-lg bg-neutral-400 text-sm focus:ring-blue-500 focus:border-blue-500"/>
                </div>

                
               <div className="mb-5 col-span-2 md:col-span-1">

               <label for="format" className="block mb-2 text-sm font-medium text-neutral-100">Format Option</label>
                    <select value={selectedOption} onChange={handleDropdownChange} id="format" className="bg-neutral-400 border  border-neutral-200 text-neutral-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="B">Binary</option>
                        <option value="D">Decimal</option>
                    </select>
                </div>
               </div>

                <div className="w-full mt-3">
                   <Button
                    text="Convert"
                   />
                </div>
              
            </form>
        </section>
       
    );
  }
  
export default Form

