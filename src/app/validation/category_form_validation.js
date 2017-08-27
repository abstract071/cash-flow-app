export default function validate(values) {
    let errors = {};

    if (!values.category) {
        errors.category = 'Enter a category name!';
    }

    return errors;
}