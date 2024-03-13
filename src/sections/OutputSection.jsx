import { MdOutlineFileDownload } from "react-icons/md";
import Button from "@/components/Button";

export default function OutputSection() {

    return(
            <section id="OutputSection">
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
            </section>
    );
}