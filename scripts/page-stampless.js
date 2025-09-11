let framePricesData = null;
let backPanelGlasses = null;
let extraBackPanels = null;
let mirrors = null;
let passpartouts = null;
let extraServices = null;
let backBoardTypes = null;
let artworkPrices = null;
let stretchings = null;
let outerFrames = null;

let selectedFrame = null;
let selectedSecondFrame = null;
let selectedOuterFrame = null;
let selectedOuterSecondFrame = null;

let form = null;
let frameUnitPriceLabel = null;
let frameUnitLabel = null;
let secondFrameUnitPriceLabel = null;
let secondFrameUnitLabel = null;

let frameSelect = null;
let secondFrameSelect = null;
let discountSelect = null;
let outerMeasureSelect = null;

let heightInput = null;
let widthInput = null;
let backBoardLengthInput = null;
let outerMeasureLabel = null;
let netPriceLabel = null;
let discountLabel = null;
let afterDiscountLabel = null;
let vatLabel = null;
let totalWithVatLabel = null;
let summaryFramePriceLabelabel = null;
let summaryRebatePriceLabel = null;
let clearButton = null;

document.addEventListener('DOMContentLoaded', () => {

    intiParams();

    form = document.getElementsByClassName('needs-validation')[0];

    // Get a reference to the input element and the span element
    frameUnitPriceLabel = document.getElementById('frame-unit-price');
    frameUnitLabel = document.getElementById('frame-unit');

    secondFrameUnitPriceLabel = document.getElementById('second-frame-unit-price');
    secondFrameUnitLabel = document.getElementById('second-frame-unit');

    // select elements
    frameSelect = document.getElementById('frame-select');
    secondFrameSelect = document.getElementById('second-frame-select');
    discountSelect = document.getElementById('discount-select');
    outerMeasureSelect = document.getElementById('outer-measure-select');

    // input elements
    heightInput = document.getElementById('height-input');
    widthInput = document.getElementById('width-input');
    outerMeasureLabel = document.getElementById('outer-measure-label');

    // summary labels
    netPriceLabel = document.getElementById('net-price-label');
    discountLabel = document.getElementById('discount-label');
    afterDiscountLabel = document.getElementById('after-discount-label');
    vatLabel = document.getElementById('vat-label');
    totalWithVatLabel = document.getElementById('total-with-vat-label');

    // cost breakdown labels
    summaryFramePriceLabelabel = document.getElementById('frame-price-label');
    summaryRebatePriceLabel = document.getElementById('rebate-price-label');

    clearButton = document.getElementById('clear-button');

    fillSelects();

    setHandlers();

    function fillSelects() {
        // fetch the frame prices data and populate the select elements
        getAllRowsFromCsv('data-files/frame-prices.csv', ';').then((data) => {
            framePricesData = data;

            populateSelectFromData(
                framePricesData,
                document.getElementById('frame-select'),
                "OXI", 0, 0, ';'
            );
            populateSelectFromData(
                framePricesData,
                document.getElementById('second-frame-select'),
                "OXI", 0, 0, ';'
            );
        });

        // fetch outer frames and populate the select element
        getAllRowsFromCsv('data-files/outer-frames.csv', ';').then((data) => {
            outerFrames = data;
        });
    }

    function setHandlers() {
        form.addEventListener('input', (event) => {
            calculateAndSetValues();
        });

        discountSelect.addEventListener('input', (event) => {
            calculateAndSetValues();
        });

        frameSelect.addEventListener('input', (event) => {
            findRowInData(
                framePricesData,
                0, event.target.value).then((data) => {
                    selectedFrame = data;
                    frameUnitPriceLabel.textContent = formatNumber(getFrameUnitPrice(priceSource));
                });

            findRowInData(
                outerFrames,
                0, event.target.value).then((data) => {
                    selectedOuterFrame = data;
                });
        });

        secondFrameSelect.addEventListener('input', (event) => {
            findRowInData(
                framePricesData,
                0, event.target.value).then((data) => {
                    selectedSecondFrame = data;
                    secondFrameUnitPriceLabel.textContent = formatNumber(getFrameUnitPrice(priceSource, true)); // true means second frame
                });

            findRowInData(
                outerFrames,
                0, event.target.value).then((data) => {
                    selectedOuterSecondFrame = data;
                });
        });

        clearButton.addEventListener('click', (event) => {
            form.reset();
            // reset all selected items
            selectedFrame = null;
            selectedSecondFrame = null;
            discountSelect.selectedIndex = 0;

            // clear labels
            frameUnitPriceLabel.textContent = '';
            frameUnitLabel.textContent = '';
            secondFrameUnitPriceLabel.textContent = '';
            secondFrameUnitLabel.textContent = '';

            calculateAndSetValues();
        });

    }

    function calculateAndSetValues() {
        //calculateAndDisplaySquare();
        const frameUnit = calculateFrameUnit();
        const secondFrameUnit = calculateSecondFrameUnit();

        // cost breakdown
        summaryFramePriceLabelabel.textContent = formatNumber(calculateFramePrice());
        summaryRebatePriceLabel.textContent = formatNumber(calculateSecondFramePrice());

        // totals
        netPriceLabel.textContent = formatNumber(calculateNetPrice(false)); // price before discount and vat
        discountLabel.textContent = discountSelect.options[discountSelect.selectedIndex].text.replace('%', ''); // discount rate

        let priceWithoutVat = calculateNetPrice();
        afterDiscountLabel.textContent = formatNumber(priceWithoutVat); // price after discount but before vat

        let priceWithVat = priceWithoutVat * vatRate;
        totalWithVatLabel.textContent = formatNumber(priceWithVat); // total price with vat

        vatLabel.textContent = formatNumber(priceWithVat - priceWithoutVat); // vat amount

        // set values
        frameUnitLabel.textContent = formatNumber(frameUnit);
        secondFrameUnitLabel.textContent = formatNumber(secondFrameUnit);

        outerMeasureLabel.value = formatNumber(calculateSquareMeter());
    }
});

function calculateNetPrice(withDiscount = true) {
    return calculateFramePrice(withDiscount) +
        calculateSecondFramePrice(withDiscount);
}
