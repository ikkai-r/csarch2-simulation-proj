"use client"

import Form from "@/components/Form";
import Divider from "@/components/Divider";
import { MdOutlineFileDownload } from "react-icons/md";
import Button from "@/components/Button";


export default function Index() {
  
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
           <Form/>
        </div>

        <p className="text-xl font-semibold mt-8 md:mt-5">
           Output
        </p>
        <div className="w-full rounded-lg mt-5 flex flex-col justify-center bg-neutral-400 p-7 md:p-10">
            <p className="text-sm md:text-default">
                Binary Representation
            </p>
            <div className="bg-neutral-300 p-4 rounded-lg mt-2">
                <p className="text-default">
                    101010101010101001
                </p>
            </div>
            <p className="text-sm md:text-default mt-5">
                Hexadecimal Representation
            </p>
            <div className="bg-neutral-300 p-4 rounded-lg mt-2 mb-8">
                <p className="text-default">
                    ABABABABA
                </p>
            </div>

            <div>
            <Button 
            icon={<MdOutlineFileDownload className="text-xl"/>} 
            text="Download as Text File" />

            </div>


        </div>
        
      </div>
    </main>
  );
}
