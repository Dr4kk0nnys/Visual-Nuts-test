/* 
Image you have a set of data in JSON, describing official languages spoken by countries, as such:
[ {
country:"US",
languages: ["en"] },
{
country:"BE", languages: ["nl","fr","de"]
}, {
country:"NL",
languages: ["nl"] },
{
country:"DE", languages: ["de"]
}, {
country:"ES",
languages: ["es"] }
]

Write a function in javascript that:
- returns the number of countries in the world
- finds the country with the most official languages, where they officially speak German (de).
- that counts all the official languages spoken in the listed countries.
- to find the country with the highest number of official languages.
- to find the most common official language(s), of all countries.
*/

/* 
    Note: Using this file and it's value as a global value for simplicity sake
    In a real world scenario, this data would most likely come from an API, or better yet,
    an already indexed database with O(1) data reads ( already processed, of course ).
    So it would be in the service layer, not in the main file...
    Also, for obvious reasons, I'm not considering the read time of the json file
    nor considering the possibility of failure / the file being empty.
*/
import { getJsonFile } from './utils/jsonReader.js';
const jsonFile = getJsonFile();

/* 
    O(n) - n being the number of countries in the file/world
    O(1) if we had already processed this information and stored in cache ( redis is a great option here )
*/
const getNumberOfCountriesInTheWorld = () => jsonFile.map(key => key.country);

/* 
    I'm not 100% sure I understood what is being asked, so my logic is:
    Find the country that speaks the most languages that also speaks German

    O(n * m) - n being the amount of countries, m being the amount of languages of each country
    How could we optimize this ?
        * O(n * log m) if we saved the languages in alphabetical order
        * O(1) if we stored a list of countries by language they speak, ordered by amount of languages spoken
            de:
                { country: 'GE', languages: ['de'] }
                { country: 'BE', languages: ['nl', 'fr', 'de'] }
            This approach is ridiculously expensive in space complexity but it might come in hand
*/
const countryWithTheMostOfficialLanguagesThatOfficiallySpeaksGerman = () => {
    let amountOfSpokenLanguages = 0;
    let country = null;

    jsonFile.map(key => {
        /* 
            * Note: We found a country that speaks German, whose number of spoken
            languages is greater than the previous one
        */
        if (key.languages.includes('de') && key.languages.length > amountOfSpokenLanguages) {
            amountOfSpokenLanguages = key.languages.length;
            country = key;
        }
    })

    return country;
}

/* 
    Again, I'm not 100% sure I understood what is being asked, so my logic is:
    Count all official languages in the countries passed as an argument
    countAllOfficialLanguagesInListedCountries(['BE']) -> ['nl', 'fr', 'de']
    countAllOfficialLanguagesInListedCountries(['BE', 'DE']) -> ['nl', 'fr', 'de']
    
    O(n + m) - n being the length of all countries, m being the length of the parameter passed
    How could we optimize this ?
        O(log n + m) if all countries were sorted
*/
const countAllOfficialLanguagesInListedCountries = (countries = []) => {
    const languages = {};

    /* O(m) - m being the length of countries */
    const countriesObject = {}
    countries.map(country => countriesObject[country] = country)

    jsonFile.map(key => {
        if (countriesObject[key.country]) {
            key.languages.map(language => {
                languages[language] = language;
            })
        }
    })

    return Object.keys(languages);
}

/* 
    O(n) - n being the length of all countries
    How could we optimize this ?
        O(1) if countries were ordered from lowest to highest amount of spoken languages
*/
const countryWithHighestAmountOfSpokenLanguages = () => {
    let highestAmountOfSpokenLanguages = 0;
    let country = null;

    jsonFile.map(key => {
        if (key.languages.length > highestAmountOfSpokenLanguages) {
            highestAmountOfSpokenLanguages = key.languages.length;
            country = key;
        }
    })

    return country;
}

/* 
    O(n + n) - n being the total amount of countries

    How could we optimize this ?
        Instead of using an object for languages, we should use an array, and place the sorted elements:
            languages = ['nl-2', 'de-2', 'en-1']
        To return the most common languages ( in this case, 'nl' and 'de' ), we would do a merge sort, reducing
        the complexity of time.
*/
const mostCommonLanguageFromAllCountries = () => {
    const languages = {}

    jsonFile.map(key => {
        key.languages.map(language => {
            if (languages[language]) {
                return languages[language] += 1;
            }

            languages[language] = 1;
        })
    })

    let amount = 0;
    let spokenLanguages = [];

    Object.keys(languages).map(key => {
        if (languages[key] > amount) {
            amount = languages[key];
            spokenLanguages = [key];
        } else if (languages[key] === amount) {
            spokenLanguages.push(key)
        }
    })
    return spokenLanguages
}

console.log(jsonFile);
console.log('Number of countries in the world: ', getNumberOfCountriesInTheWorld());
console.log('Country with the most official languages that also speaks German', countryWithTheMostOfficialLanguagesThatOfficiallySpeaksGerman());
console.log('All official languages in listed countries', countAllOfficialLanguagesInListedCountries(['BE', 'DE']));
console.log('Country with highest amount of spoken languages', countryWithHighestAmountOfSpokenLanguages());
console.log('Most common language from all countries', mostCommonLanguageFromAllCountries());