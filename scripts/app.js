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

