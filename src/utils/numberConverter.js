import BigNumber from "bignumber.js";

export function decimalToBinary(decimal) {
    let integerPart = Math.floor(decimal);
    let fractionalPart = decimal - integerPart;
  
    let binaryIntegerPart = integerPart.toString(2);
  
    let binaryFractionalPart = '';
    while (fractionalPart > 0) {
        if (binaryFractionalPart.length > 21) { // Limit fractional part for demonstration
            break;
        }
        fractionalPart *= 2;
        binaryFractionalPart += Math.floor(fractionalPart);
        fractionalPart -= Math.floor(fractionalPart);
    }
  
    let binary = binaryIntegerPart;
    if (binaryFractionalPart !== '') {
        binary += '.' + binaryFractionalPart;
    }
  
    return binary;
}

export function normalizeBinaryMantissa(inputBorD, inputMantissa, inputExponent) {
    let mantissa = new BigNumber(inputMantissa)
    let exponent = new BigNumber(inputExponent)
    let mantissaWholeNum = 0

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

        console.log("normalized binary mantissa: " + mantissa)

        mantissa = BigNumber(decimalToBinary(mantissa))

        while (mantissa >= 10) {
            mantissa = mantissa.dividedBy(10)
            exponent++
        }

        while (mantissa < 1) {
            mantissa = mantissa.multipliedBy(10)
            exponent--
        }

        let normalized = {
            mantissa: mantissa,
            exponent: exponent
        }

        console.log("normalized binary mantissa: " + normalized.mantissa)
        console.log("exponent: " + normalized.exponent)

        return normalized
    }
}

export function getSignBit (normalized) {
    if (normalized.mantissa < 0) {
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
    let justFractional = String(fractional).slice(2)
    console.log("fractional part: " + justFractional)

    while(justFractional.length < 52) {
        justFractional = justFractional + "0"
    }

    return justFractional
}

export function convertBinarytoIEEE (inputBorD, inputMantissa, inputExponent) {
    let normalized = normalizeBinaryMantissa(inputBorD, inputMantissa, inputExponent)
    let signBit = getSignBit(normalized)
    let exponentRepresentation = getEPrime(normalized.exponent)
    let fractionalSignificand = getFractionalPart(normalized.mantissa)

    let binary = String(String(signBit) + exponentRepresentation + fractionalSignificand)
    let hex = parseInt(binary, 2).toString(16)

    let convertedBinaryFP = {
        binary: binary,
        hex: hex
    }
    
    return convertedBinaryFP
}