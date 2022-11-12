/* 
Write or describe an algorithm that prints the whole integer numbers to the console, start from the number 1, and print all numbers going up to the number 100.
However, when the number is divisible by 3, do not print the number, but print the word 'Visual'. If the number is divisible by 5, do not print the number, but print 'Nuts'. And for
all numbers divisible by both (eg: the number 15) the same, but print 'Visual Nuts'.
How will you keep this code safe from bugs? Show how you would guarantee that this code keeps working when developers start making small feature adjustments. (Maybe we would want to print the first 500 numbers, ...).


Q. How will you keep this code safe from bugs?
A. Separating the business logic ( /controllers ) from the code execution ( main.js )
provides an elegant solution to avoid implementing bugs into the code.
Not only that, but with both unit and service testing, there is a significantly smaller chance
that a bug might slip in.

Q. Show how you would guarantee that this code keeps working when developers start making small feature adjustments. (Maybe we would want to print the first 500 numbers, ...)
A. Imagine we want to print 500 numbers instead of 100.
We would have to change the "process.env.EXERCISE_01_TOTAL_NUMBERS" environment variable to 500.
All tests would break ( they should, this is not a mistake ). The code is guaranteed to keep working for two main reasons:
1. It's protected by both unit and service testing
2. The business logic is decoupled from the main code execution
*/

/* Note: We'll get the total amount of numbers, as well as the starting number from the environment variable */
import { config } from 'dotenv';
config();

import { handlePrintNumbers } from './controllers/numbers.js';


const startingNumber = process.env.EXERCISE_01_STARTING_NUMBER;
const totalNumbers = process.env.EXERCISE_01_TOTAL_NUMBERS;

/* Note: Only using a function here to make easier for the service test */
const run = () => {
    for (let i = startingNumber; i <= totalNumbers; i++) {
        handlePrintNumbers(i);
    }
}

run();

export default run;