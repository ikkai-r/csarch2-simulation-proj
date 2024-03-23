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
