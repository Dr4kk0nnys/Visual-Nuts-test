/* Note: Handle business logic */
const handlePrintNumbers = (number) => {
    let output = '';

    if (number % 3 === 0) {
        output += 'Visual';
    }

    if (number % 5 === 0) {
        output += 'Nuts';
    }

    console.log(output || Number(number));
}

export { handlePrintNumbers };