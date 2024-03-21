function convertBCD(numb) {


}

function getCombi(sig, exp) {
    const eprime = exp + 398;
    let msd = 0;

    let sigStr = String(sig)

    if (sigStr.length >= 16) { // if significand is 16 digits, use most significant
        msd = parseInt(sigStr[0]);
    }

    let msdB = msd.toString(2);
    let eprimeB = eprime.toString(2);

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

    return combi;
}

function normalizeSignificand(sig, exp) {
    while (sig % 1 !== 0) {
        sig *= 10;
        exp--;
    }

    let significandStr = String(sig);

    const normalizedSignificandNum = parseFloat(significandStr);

    return [normalizedSignificandNum, exp];
}

export function convertDecimal64(sig, exp) {
    let output = '';

    let signBit = '0';

    sig = String(sig);

    if (sig[0] === '-') {
        signBit = '1';
        sig = sig.slice(1); // remove '-' sign if negative
    }

    sig = parseFloat(sig);

    [sig, exp] = normalizeSignificand(sig, exp);

    let combi = getCombi(sig, exp);

    console.log(sig)
    console.log(exp)
    console.log(combi)

    output += signBit;

    return output;
}