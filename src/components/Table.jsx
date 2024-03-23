const Table = () => {
    return (
            <table className="w-full border-collapse border border-slate-500">
                <thead>
                    <tr>
                        <th className="border border-slate-600 w-1/10 text-left p-2">Sign</th> 
                        <th className="border border-slate-600 w-4/10 text-left p-2">Exponent representation</th> 
                        <th className="border border-slate-600 w-5/10 text-left p-2">Fractional part of significand</th> 
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-slate-700 w-1/10 text-left p-2">0</td>
                        <td className="border border-slate-700 w-4/10 text-left p-2">10101011</td>
                        <td className="border border-slate-700 w-5/10 text-left p-2">1010101</td>
                    </tr>
                </tbody>
            </table>
    );
  };
  
  export default Table;
  