"use client"

import Form from "@/components/Form";
import Divider from "@/components/Divider";
import OutputSection from "@/sections/OutputSection"


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

        <OutputSection/>
        
      </div>
    </main>
  );
}
