const Table = ({sign, frac, exp}) => {
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
                        <td className="border border-slate-700 w-1/10 text-left p-2">{sign}</td>
                        <td className="border border-slate-700 w-4/10 text-left p-2">{exp}</td>
                        <td className="border border-slate-700 w-5/10 text-left p-2">{frac}</td>
                    </tr>
                </tbody>
            </table>
    );
  };
  
  export default Table;
  