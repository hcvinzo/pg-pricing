const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");

let vatRate = 1.24; // default VAT rate

if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("expanded");
        content.classList.toggle("expanded");
    });
}

function isNumber(inputElement, isInteger = true, minVal = null, maxVal = null) {
    const value = inputElement.value.trim();
    const regex = isInteger ? /^-?\d+$/ : /^-?\d+(\.\d+)?$/;
    if (!regex.test(value)) return false;
    const num = Number(value);
    return (minVal === null || num >= minVal) && (maxVal === null || num <= maxVal);
}

/**
 * Gets the value of an input element by ID and returns it as an integer or decimal
 * based on its 'data-type' attribute.
 *
 * @param {inputElement} inputElement The ID of the input element.
 * @returns {number} The parsed number value, or 0 if invalid or empty.
 */
function getTypedInputValue(inputElement) {
    // If the element doesn't exist or has no value, return 0 immediately
    if (!inputElement || !inputElement.value) {
        return 0;
    }

    // Get the data-type attribute and the raw input value
    const dataType = inputElement.getAttribute('data-type');
    const inputValue = inputElement.value;

    // Use a switch statement to handle different data types
    switch (dataType) {
        case 'integer':
            // Convert the value to an integer and check if it's a valid number.
            // parseInt() returns NaN for non-integer strings.
            const intValue = parseInt(inputValue, 10);
            return isNaN(intValue) ? 0 : intValue;

        case 'decimal':
            // Convert the value to a floating-point number.
            // parseFloat() returns NaN for non-numeric strings.
            const floatValue = parseFloat(inputValue);
            return isNaN(floatValue) ? 0 : floatValue;

        default:
            // If the data-type is unknown or missing, default to 0
            console.warn(`Unknown data-type "${dataType}" for input ID "${inputId}". Returning 0.`);
            return 0;
    }
}

/**
 * Retrieves the value from a <select> element and returns it as a number.
 * Returns 0 if the value is not a valid number or the element is not found.
 * * @param {selectElement} selectElement The <select> element.
 * @returns {number} The numeric value of the selected option, or 0.
 */
function getSelectValueAsNumber(selectElement) {
    // 1. Check if the element exists and has a value.
    if (!selectElement || !selectElement.value) {
        return 0;
    }

    // 2. Return the valid number.
    return safeParseNumber(selectElement.value);
}

/**
 * Safely converts a string to a number, handling both comma and dot as decimal separators.
 * Returns 0 for invalid or empty inputs.
 *
 * @param {string} value The string to convert.
 * @returns {number} The parsed number value.
 */
function safeParseNumber(value) {
    // 1. Check if the value is a valid string
    if (typeof value !== 'string' || value.trim() === '') {
        return 0;
    }

    // 2. Normalize the string by replacing commas with dots
    const normalizedValue = value.replace(',', '.');

    // 3. Use parseFloat() for conversion
    const parsedNumber = parseFloat(normalizedValue);

    // 4. Use Number.isFinite() to check for a valid, finite number
    if (!Number.isFinite(parsedNumber)) {
        return 0;
    }

    return parsedNumber;
}

/**
 * Formats a numeric value according to the user's browser locale.
 *
 * @param {number} number - The number to format.
 * @param {number} [decimalPlaces=2] - The desired number of decimal places. Defaults to 2.
 * @returns {string} The formatted number as a string.
 */
function formatNumber(number, decimalPlaces = 2) {
    // Check for invalid input
    if (typeof number !== 'number' || isNaN(number)) {
        console.error('Error: The first parameter must be a valid number.');
        return '';
    }

    // Create the Intl.NumberFormatOptions object
    const options = {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    };

    // Create a new NumberFormat object. By using 'undefined',
    // it automatically defaults to the browser's locale.
    try {
        const formatter = new Intl.NumberFormat(undefined, options);
        return formatter.format(number);
    } catch (e) {
        console.error('Error: Number formatting failed.', e);
        return number.toString(); // Return original value on error
    }
}

/**
 * Reads a JSON file from a specified path and returns the contained
  *
 * @returns {Promise<object | null>} - A promise that resolves to the parameters object or
 * null in case of an error.
 */
async function readParameterFile() {
    try {
        // Fetch the JSON file from the specified path.
        const response = await fetch("data-files/params.json");

        // Check if the fetch was successful.
        if (!response.ok) {
            throw new Error(`http error: ${response.status}`);
        }

        // Parse the JSON content.
        const parameters = await response.json();

        return parameters;
    } catch (error) {
        console.error('error while reading params.json: ', error);
        return null;
    }
}

async function intiParams() {
    try {
        const params = await readParameterFile();
        // VAT rate
        if (params['vat-rate'] && !isNaN(params['vat-rate'])) {
            vatRate = parseFloat(params['vat-rate']);
        }
    }
    catch (error) {
        console.error('An error occured while initializing params:', error);
        return null;
    }
}

