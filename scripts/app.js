const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");

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
 * @param {string} inputId The ID of the input element.
 * @returns {number} The parsed number value, or 0 if invalid or empty.
 */
function getTypedInputValue(inputId) {
    // Find the input element by its ID
    const inputElement = document.getElementById(inputId);

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
