import { MdOutlineFileDownload } from "react-icons/md";
import Button from "@/components/Button";
import Table from '@/components/Table'

export default function OutputSection({convertedOutput, selectedOption, dec, numb, exponent}) {
    const downloadToText = () => {
        const header = 'IEEE-754 Binary-64 floating point converter\n';

        const choice = selectedOption === "B" ? 'Choice: Binary Floating Point\n' : 'Choice: Decimal Floating Point\n'
        const input = selectedOption === "B" ? `Input: ${numb} x 2^${exponent}\n`  : `Input: ${dec} x 10^${exponent}\n`;
        const spaceBOutput =  convertedOutput.binary[0] + " " + convertedOutput.binary.substring(1, 8) + " " + convertedOutput.binary.substring(9);
        const bOutput = `Binary Output: ${spaceBOutput}\n`
        const hOutput = 'Hexadecimal Equivalent: ' +  '0x' + `${convertedOutput.hex}\n`

        const textData = header + choice + input + bOutput + hOutput;

        const fileName = 'output.txt';

        const blob = new Blob([textData], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(link.href);
    };

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
                        text="Download as Text File"
                        onClick={downloadToText} />
                        </div>
                    </div>
            </section>
    );
}