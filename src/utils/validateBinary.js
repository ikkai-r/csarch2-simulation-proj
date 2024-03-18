import * as Yup from 'yup';

export const binaryValidationSchema = Yup.object().shape({
    binaryInput: Yup.string().matches(/^[01]*\.?[01]*$/, 'Invalid input. Only binary digits (0, 1) and dot (.) are allowed.'),
});