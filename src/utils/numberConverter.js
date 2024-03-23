import BigNumber from "bignumber.js";
import exp from "constants";

export function normalizeBinaryMantissa(inputBorD, inputMantissa, inputExponent) {
    let mantissa = new BigNumber(inputMantissa)
    let exponent = new BigNumber(inputExponent)
    let mantissaWholeNum = 0

    if (mantissa == 0) { 
        let normalized = {
            mantissa: mantissa,
            exponent: exponent
        }

        return normalized
    }

    if (inputBorD === "B") {
        mantissaWholeNum = Math.trunc(mantissa)
        while (!(mantissaWholeNum == 1 || mantissaWholeNum == -1)) {
            if (mantissaWholeNum >= 10 || mantissaWholeNum <= -10) {
                mantissa = mantissa.dividedBy(10)
                exponent++
                mantissaWholeNum = Math.trunc(mantissa)
            } else if (mantissaWholeNum == 0) {
                mantissa = mantissa.multipliedBy(10)
                exponent--
                mantissaWholeNum = Math.trunc(mantissa)
            }
        }

        let normalized = {
            mantissa: mantissa,
            exponent: exponent
        }

        normalized.mantissa = normalized.mantissa.toFixed(52, 6)
        normalized.mantissa = BigNumber(normalized.mantissa)

        console.log("normalized mantissa: " + normalized.mantissa)
        console.log("exponent: " + normalized.exponent)

        return normalized

    } 
    else {
        // convert to binary
        while (exponent > 0) {
            mantissa = mantissa.multipliedBy(10)
            exponent--;
        }
    
        while (exponent < 0) {
            mantissa = mantissa.dividedBy(10)
            exponent++;
        }

        mantissa = mantissa.toString(2)
        console.log(mantissa)
        mantissa = BigNumber(mantissa)

        mantissaWholeNum = Math.trunc(mantissa)
        while (!(mantissaWholeNum == 1 || mantissaWholeNum == -1)) {
            if (mantissaWholeNum >= 10 || mantissaWholeNum <= -10) {
                mantissa = mantissa.dividedBy(10)
                exponent++
                mantissaWholeNum = Math.trunc(mantissa)
            } else if (mantissaWholeNum == 0) {
                mantissa = mantissa.multipliedBy(10)
                exponent--
                mantissaWholeNum = Math.trunc(mantissa)
            }
        }

        console.log(String(mantissa))

        let normalized = {
            mantissa: mantissa,
            exponent: exponent
        }

        normalized.mantissa = normalized.mantissa.toFixed(52, 6)
        normalized.mantissa = BigNumber(normalized.mantissa)

        console.log("normalized mantissa: " + normalized.mantissa)
        console.log("exponent: " + normalized.exponent)

        return normalized
    }
}

export function getSignBit (normalized) {
    if (normalized.mantissa < 0 || normalized.mantissa.isNegative() == true) {
        return 1
    } else {
        return 0
    }
}

export function getEPrime (exponent) {
    let ePrime = Number(exponent) + 1023
    let binaryEPrime = ePrime.toString(2)
    while(binaryEPrime.length < 11) {
        binaryEPrime = "0" + binaryEPrime
    }

    console.log("e prime: " + binaryEPrime)

    return binaryEPrime
}

export function getFractionalPart(mantissa) {
    let input = new BigNumber(mantissa)
    let fractional = input.modulo(1)
    let digitsToSlice = (fractional < 0 ? 3 : 2)
    let justFractional = String(fractional).slice(digitsToSlice)
    console.log("fractional part: " + justFractional)

    while(justFractional.length < 52) {
        justFractional = justFractional + "0"
    }

    return justFractional
}

export function denormalizeMantissa(mantissa, exponent) {
    mantissa = BigNumber(mantissa)
    exponent = BigNumber(exponent)

    while (exponent < -1022) {
        mantissa = mantissa.dividedBy(10)
        exponent++
    }

    let normalized = {
        mantissa: mantissa,
        exponent: exponent
    }

    normalized.mantissa = normalized.mantissa.toFixed(52, 6)
    normalized.mantissa = BigNumber(normalized.mantissa)

    console.log("denormalized mantissa: " + normalized.mantissa)
    console.log("denormalized exponent: " + normalized.exponent)

    return normalized
}

function addSpaces(str) {
    let result = '';
    let count = 0;

    for (let i = str.length - 1; i >= 0; i--) {
        result = str[i] + result;
        count++;

        if (count === 4 && i !== 0) {
            result = ' ' + result;
            count = 0;
        }
    }

    return result;
}

export function convertBinarytoIEEE (inputBorD, inputMantissa, inputExponent) {
    if (inputMantissa == "NaN") {

        let mantissa = '0'.repeat(52);
        mantissa = addSpaces(String(mantissa))

        let convertedBinaryFP = [
            "0",
            "111 1111 1111",
            mantissa,
            "7FF0000000000000"
        ]

        return convertedBinaryFP
    }

    let normalized = normalizeBinaryMantissa(inputBorD, inputMantissa, inputExponent)
    let signBit = getSignBit(normalized)
    let exponentRepresentation = ""
    let fractionalSignificand = ""

    if (normalized.mantissa == 0) { // zero
        exponentRepresentation = "00000000000"

        while(fractionalSignificand.length < 52) {
            fractionalSignificand = fractionalSignificand + "0"
        }
    }

    else if (normalized.exponent >= 1023) { // infinity
        exponentRepresentation = "11111111111"

        while(fractionalSignificand.length < 52) {
            fractionalSignificand = fractionalSignificand + "0"
        }
    }

    else if (normalized.exponent <= -1022) { // denormalized
        exponentRepresentation = "00000000000"

        normalized = denormalizeMantissa(normalized.mantissa, normalized.exponent)
        fractionalSignificand = getFractionalPart(normalized.mantissa)
    }

    else {
        exponentRepresentation = getEPrime(normalized.exponent)
        fractionalSignificand = getFractionalPart(normalized.mantissa)
    }

    let binary = String(String(signBit) + String(exponentRepresentation) + String(fractionalSignificand))
    let hex = parseInt(binary, 2).toString(16).padStart(16, '0').toUpperCase()

    exponentRepresentation = addSpaces(String(exponentRepresentation))
    fractionalSignificand = addSpaces(String(fractionalSignificand))

    // binary = String(String(signBit) + ' ' + exponentRepresentation + ' ' + fractionalSignificand)

    let convertedBinaryFP = [
        String(signBit),
        exponentRepresentation,
        fractionalSignificand,
        hex
    ]
    
    return convertedBinaryFP
}