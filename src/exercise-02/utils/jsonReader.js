import { readFileSync } from 'fs';

const getJsonFile = () => JSON.parse(readFileSync('./assets/countries.json', 'utf-8'));

export { getJsonFile };