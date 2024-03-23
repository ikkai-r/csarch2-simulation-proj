# IEEE-754 Binary 64 Converter Web Application

This web application provides a convenient tool for converting numbers between binary, decimal, and hexadecimal representations, adhering to the IEEE 754 Binary 64 standard. It supports various input formats and special cases, including NaN (Not a Number), positive and negative infinity, and denormalized inputs.

## Features

- **Input Options**: Users can input numbers in binary or decimal format.
- **Output Formats**: The application provides output in both binary and hexadecimal representations.
- **Special Cases Support**: It handles special cases such as NaN, +Infinity, -Infinity, denormalized inputs.
  
## Usage

1. **Input**: Enter the number you wish to convert in their respective input boxes for mantissa and exponent. You can input numbers in binary format (e.g., 1010.11) or decimal format (e.g., 10.75).
2. **Select Conversion**: Choose the desired conversion type - binary or decimal - using the provided options.
3. **Output**: The converted value will be displayed in the output box.
4. **Special Cases**: To test special cases such as NaN, denormalized inputs, or infinity, input the corresponding values into the input box.

## Special Cases

- **NaN (Not a Number)**: Entering "NaN" as input will result in the display of "NaN" in the output box.
- **+Inf/-Inf** : For infinity, the exponent should be more than 1023 for binary input and more than 308 for decimal input.
- **Denormalized Inputs**: For binary input, the denormalized exponent should be less than -1022, and for decimal input, less than -308, to trigger denormalized representation.

## Try It Out

You can access the IEEE-754 Binary 64 Converter web application [here](https://csarch2-simulation-proj.vercel.app) and experiment with various inputs and special cases to see how it behaves.

## Analysis

### System Design

The web application was made using Next.js deployed using Vercel, accessible at this [link](https://csarch2-simulation-proj.vercel.app). For the binary 64 conversion, the following steps showcase its implementation:

1. The conversion function takes in the user-inputted mantissa, exponent, as well as whether the binary or decimal option was selected.
2. It checks if the input is the special case NaN. If so, the function returns the corresponding value for NaN.
3. The mantissa is then normalized to 1.f; Decimal inputs are first converted into their binary equivalent before normalization.
4. The sign bit is obtained from the normalized mantissa.
5. Remaining special cases are checked. Zero or infinity cases assign the corresponding special case values to the mantissa and exponent.
6. A denormalized case denormalizes the mantissa to force the exponent to -1022. The exponent is then assigned the special case value.
7. If the inputted mantissa and exponent do not match any of the special cases, e’ as well as the fractional portion are derived from the input.
8. Zeroes are padded as necessary to ensure the final binary output is the correct length.

### Input Validation

- Initially, input field properties were modified to accept only numeric values, which did not account for binary inputs or symbols like "-", "+", and "." in decimal inputs.
- Validation was done by trimming out invalid symbols initially, but this approach didn't handle symbols placed in different locations and multiple times.
- Regular expressions (regex) were implemented to validate both binary and decimal input fields on change of the input field, enabling the button if the input is valid based on the regex.

### Handling Special Cases

- Initial challenge encountered due to uncertainty about implementing NaN.
- Considered allowing users to input an "i" to represent the imaginary number as NaN.
- Added NaN as an explicit option for users to input.
- Updated regex to include NaN as a valid input, ensuring the system recognizes it appropriately.

### Bugs in Backend Logic

- Tasks were distributed among team members for the implementation of binary floating-point conversion.
- Small hurdles were encountered during implementation, including:
  - Ensuring correct number of bits for exponent and fractional representation after conversion.
  - Initial decimal input conversion to binary before performing floating-point conversion.
  - Priority of special case recognition and handling.
