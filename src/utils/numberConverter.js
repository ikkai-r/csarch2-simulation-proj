function convertBCD(num) {
    let bcd = '';

    let i = 0;
    let aei = '';

    console.log(num);

    while (i < 3) { // count majors  
        if (num.charAt(i) == '8' || num.charAt(i) == '9') { 
            aei += '1' 
        }
        else { 
            aei += '0' 
        }

        i += 1;
    }

    if (aei == '000') { // if no majors, just shortcut
        for (let d = 0; d < num.length; d++) {
            let digit = parseInt(num[d]).toString(2);

            while (digit.length < 3) {
                digit = '0' + digit;
            }

            bcd += digit;

            if (d == 1) { bcd += '0' }
        }
    }

    let numB = '';
    for (let i = 0; i < 3; i++) { // numB contains binary of 3-digit number input
        let digit = Math.floor(num / Math.pow(10, i)) % 10;
    
        let binaryDigit = digit.toString(2).padStart(4, '0');
    
        numB = binaryDigit + numB;
    }

    if (aei == '111') { // special case
        bcd += '0';
        bcd += '0';
        bcd += numB[3];
        bcd += '1';
        bcd += '1';
        bcd += numB[7];
        bcd += '1';
        bcd += '1';
        bcd += '1';
        bcd += numB[11];
    }
    else if (aei == '001') { // AYOKO NA IHHARDCODE KO NALANG LOLLhjdfhj
        bcd += numB[1];
        bcd += numB[2];
        bcd += numB[3];
        bcd += numB[5];
        bcd += numB[6];
        bcd += numB[7];
        bcd += '1';
        bcd += '0';
        bcd += '0';
        bcd += numB[11];
    }
    else if (aei == '010') { // AYOKO NA IHHARDCODE KO NALANG LOLLhjdfhj
        bcd += numB[1];
        bcd += numB[2];
        bcd += numB[3];
        bcd += numB[9];
        bcd += numB[10];
        bcd += numB[7];
        bcd += '1';
        bcd += '0';
        bcd += '1';
        bcd += numB[11];
    }
    else if (aei == '011') { // AYOKO NA IHHARDCODE KO NALANG LOLLhjdfhj
        bcd += numB[1];
        bcd += numB[2];
        bcd += numB[3];
        bcd += '1';
        bcd += '0';
        bcd += numB[7];
        bcd += '1';
        bcd += '1';
        bcd += '1';
        bcd += numB[11];
    }
    else if (aei == '100') { // AYOKO NA IHHARDCODE KO NALANG LOLLhjdfhj
        bcd += numB[9];
        bcd += numB[10];
        bcd += numB[3];
        bcd += numB[5];
        bcd += numB[6];
        bcd += numB[7];
        bcd += '1';
        bcd += '1';
        bcd += '0';
        bcd += numB[11];
    }
    else if (aei == '101') { // AYOKO NA IHHARDCODE KO NALANG LOLLhjdfhj
        bcd += numB[5];
        bcd += numB[6];
        bcd += numB[3];
        bcd += '0';
        bcd += '1';
        bcd += numB[7];
        bcd += '1';
        bcd += '1';
        bcd += '1';
        bcd += numB[11];
    }
    else if (aei == '110') { // AYOKO NA IHHARDCODE KO NALANG LOLLhjdfhj
        bcd += numB[9];
        bcd += numB[10];
        bcd += numB[3];
        bcd += '0';
        bcd += '0';
        bcd += numB[7];
        bcd += '1';
        bcd += '1';
        bcd += '1';
        bcd += numB[11];
    }

    return bcd;
}

function getCoeffConti(sig) {
    sig = String(sig);
    sig = sig.slice(1);

    while (sig.length < 15) {
        sig = '0' + sig;
    }

    let i = 0;
    let coeffConti = '';

    while (i < sig.length) {
        const substring = sig.substring(i, i + 3);

        coeffConti += convertBCD(substring);

        i += 3;
    }

    return coeffConti;
}

function getCombi(sig, exp) {
    const eprime = exp + 398;
    let msd = 0;

    let sigStr = String(sig)

    if (sigStr.length >= 16) { // if significand is 16 digits, use most significant
        msd = parseInt(sigStr[0]);
    }

    let msdB = msd.toString(2).padStart(4, '0');
    let eprimeB = eprime.toString(2).padStart(10, '0');

    let expConti = eprimeB.slice(2);

    while (eprimeB.length < 10) { // pad e' to 10 digits
        eprimeB = '0' + eprimeB;
    }

    let combi = '';

    if (msd == 8 || msd == 9) { // if major
        combi += '11'
        combi += eprimeB.slice(0, 2);
        combi += msdB.slice(-1);
    }
    else { // minor
        combi += eprimeB.slice(0, 2);
        combi += msdB.slice(-3);
    }

    return [combi, expConti];
}

function countDecimals(numStr) {
    const decimalIndex = numStr.indexOf('.');

    if (decimalIndex === -1) {
        return 0;
    }

    const decimalPlaces = numStr.length - decimalIndex - 1;
    return decimalPlaces;
}

function normalizeSignificand(sig, exp) {
    let i = 0;
    length = countDecimals(sig);
    sig = parseFloat(sig);

    while (sig % 1 !== 0) {
        sig *= 10;
        sig = Number(sig.toFixed(length - i));
        exp--;
        i++;
    }

    return [sig, exp];
}

export function convertDecimal64(sig, exp) {
    let output = '';

    let signBit = '0';

    sig = String(sig);

    if (sig[0] === '-') {
        signBit = '1';
        sig = sig.slice(1); // remove '-' sign if negative
    }

    [sig, exp] = normalizeSignificand(sig, exp);

    let [combi, eConti] = getCombi(sig, exp);

    let cConti = getCoeffConti(sig);

    // console.log(sig)
    // console.log(exp)
    // console.log(combi)

    output += signBit;
    output += combi;
    output += eConti;
    output += cConti;

    console.log(output);

    return output;
}