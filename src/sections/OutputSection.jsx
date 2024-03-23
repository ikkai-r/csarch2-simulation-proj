import { MdOutlineFileDownload } from "react-icons/md";
import Button from "@/components/Button";
import Table from '@/components/Table'

export default function OutputSection({convertedOutput}) {

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
                        <Table/>

                            <p className="text-default">
                                {convertedOutput[0] + ' ' + convertedOutput[1] + ' ' + convertedOutput[2]}
                            </p>
                        </div>
                        <p className="text-sm md:text-default mt-5">
                            Hexadecimal Representation
                        </p>
                        <div className="bg-neutral-300 p-4 rounded-lg mt-2 mb-8">
                            <p className="text-default">
                                {/* ABABABABA */}
                                {'0x' + convertedOutput[3]}
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