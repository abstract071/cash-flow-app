export default function validate(values) {
    let errors = {};

    if (!values.amountOfMoney) {
        errors.amountOfMoney = 'Enter an amount of money!';
    }

    if (!values.description) {
        errors.description = 'Enter description!';
    }

    if (!values.category) {
        errors.category = 'Choose the category!';
    }

    if (!values.date) {
        errors.date = 'Enter a date!';
    }

    return errors;
}