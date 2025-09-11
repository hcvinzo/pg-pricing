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
let selectedBackPanelGlass = null;
let selectedExtraBackPanel = null;
let selectedMirror = null;
let selectedPasspartout = null;
let selectedExtraService = null;
let selectedBackBoardType = null;
let selectedArtwork = null;
let selectedStretching = null;
let selectedPrinting = null;
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
let blackGlassSelect = null;
let extraBackPanelsSelect = null;
let passpartoutSelect = null;
let mirrorSelect = null;
let extraServicesSelect = null;
let backBoardTypeSelect = null;
let printingSelect = null;
let artworkSelect = null;
let stretchingSelect = null;

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
let summaryPasspartoutPriceLabel = null;
let summaryBackPanelGlassPriceLabel = null;
let summaryMirrorPriceLabel = null;
let summaryLaborPriceLabel = null;
let summaryStretchingPriceLabel = null;
let summaryPrintingPriceLabel = null;
let summaryArtworksPriceLabel = null;
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
    blackGlassSelect = document.getElementById('back-panel-select');
    extraBackPanelsSelect = document.getElementById('extra-back-frame-select');
    passpartoutSelect = document.getElementById('passpartout-select');
    mirrorSelect = document.getElementById('mirror-select');
    extraServicesSelect = document.getElementById('extra-service-select');
    backBoardTypeSelect = document.getElementById('back-board-type-select');
    printingSelect = document.getElementById('printing-select');
    artworkSelect = document.getElementById('artwork-select');
    stretchingSelect = document.getElementById('stretching-select');

    // input elements
    heightInput = document.getElementById('height-input');
    widthInput = document.getElementById('width-input');
    backBoardLengthInput = document.getElementById('back-board-length-input');
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
    summaryPasspartoutPriceLabel = document.getElementById('passpartout-price-label');
    summaryBackPanelGlassPriceLabel = document.getElementById('back-glass-price-label');
    summaryMirrorPriceLabel = document.getElementById('mirror-price-label');
    summaryLaborPriceLabel = document.getElementById('labor-price-label');
    summaryStretchingPriceLabel = document.getElementById('stretching-price-label');
    summaryPrintingPriceLabel = document.getElementById('printing-price-label');
    summaryArtworksPriceLabel = document.getElementById('artworks-price-label');

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

        // fetch back panel glasses and populate the select element
        getAllRowsFromCsv('data-files/back-panel-glasses.csv', ';').then((data) => {
            backPanelGlasses = data;

            populateSelectFromData(
                backPanelGlasses,
                document.getElementById('back-panel-select'),
                "OXI", 0, 0, ';'
            );
        });

        // fetch extra back frames and populate the select element
        getAllRowsFromCsv('data-files/extra-back-frames.csv', ';').then((data) => {
            extraBackPanels = data;

            populateSelectFromData(
                extraBackPanels,
                document.getElementById('extra-back-frame-select'),
                "OXI", 0, 0, ';'
            );
        });

        // fetch mirrors and populate the select element
        getAllRowsFromCsv('data-files/mirrors.csv', ';').then((data) => {
            mirrors = data;

            populateSelectFromData(
                mirrors,
                document.getElementById('mirror-select'),
                "OXI", 0, 0, ';'
            );
        });

        // fetch passpartouts and populate the select element
        getAllRowsFromCsv('data-files/passpartouts.csv', ';').then((data) => {
            passpartouts = data;

            populateSelectFromData(
                passpartouts,
                document.getElementById('passpartout-select'),
                "OXI", 0, 0, ';'
            );
        });

        // fetch extra services and populate the select element
        getAllRowsFromCsv('data-files/extra-services.csv', ';').then((data) => {
            extraServices = data;

            populateSelectFromData(
                extraServices,
                document.getElementById('extra-service-select'),
                "OXI", 0, 0, ';'
            );
        });

        // fetch back board types and populate the select element
        getAllRowsFromCsv('data-files/back-board-types.csv', ';').then((data) => {
            backBoardTypes = data;

            populateSelectFromData(
                backBoardTypes,
                document.getElementById('back-board-type-select'),
                "OXI", 0, 0, ';'
            );
        });

        // fetch artwork prices and populate the select element
        getAllRowsFromCsv('data-files/artwork-prices.csv', ';').then((data) => {
            artworkPrices = data;

            populateSelectFromData(
                artworkPrices,
                document.getElementById('artwork-select'),
                "OXI", 0, 0, ';'
            );
        });

        // fetch stretchings and populate the select element
        getAllRowsFromCsv('data-files/stretchings.csv', ';').then((data) => {
            stretchings = data;

            populateSelectFromData(
                stretchings,
                document.getElementById('stretching-select'),
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

        blackGlassSelect.addEventListener('input', (event) => {
            findRowInData(
                backPanelGlasses,
                0, event.target.value).then((data) => {
                    selectedBackPanelGlass = data;
                });
        });

        extraBackPanelsSelect.addEventListener('input', (event) => {
            findRowInData(
                extraBackPanels,
                0, event.target.value).then((data) => {
                    selectedExtraBackPanel = data;
                });
        });

        mirrorSelect.addEventListener('input', (event) => {
            findRowInData(
                mirrors,
                0, event.target.value).then((data) => {
                    selectedMirror = data;
                });
        });

        passpartoutSelect.addEventListener('input', (event) => {
            findRowInData(
                passpartouts,
                0, event.target.value).then((data) => {
                    selectedPasspartout = data;
                });
        });

        extraServicesSelect.addEventListener('input', (event) => {
            findRowInData(
                extraServices,
                0, event.target.value).then((data) => {
                    selectedExtraService = data;
                });
        });

        backBoardTypeSelect.addEventListener('input', (event) => {
            findRowInData(
                backBoardTypes,
                0, event.target.value).then((data) => {
                    selectedBackBoardType = data;
                });
        });

        artworkSelect.addEventListener('input', (event) => {
            findRowInData(
                artworkPrices,
                0, event.target.value).then((data) => {
                    selectedArtwork = data;
                });
        });

        stretchingSelect.addEventListener('input', (event) => {
            findRowInData(
                stretchings,
                0, event.target.value).then((data) => {
                    selectedStretching = data;
                });
        });

        clearButton.addEventListener('click', (event) => {
            form.reset();
            // reset all selected items
            selectedFrame = null;
            selectedSecondFrame = null;
            selectedBackPanelGlass = null;
            selectedExtraBackPanel = null;
            selectedMirror = null;
            selectedPasspartout = null;
            selectedExtraService = null;
            selectedBackBoardType = null;
            selectedArtwork = null;
            selectedStretching = null;
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
        summaryBackPanelGlassPriceLabel.textContent = formatNumber(calculateBackPanelGlassPrice());
        summaryPasspartoutPriceLabel.textContent = formatNumber(calculatePasspartoutPrice());
        summaryLaborPriceLabel.textContent = formatNumber(calculateLaborPrice());
        summaryMirrorPriceLabel.textContent = formatNumber(calculateMirrorPrice());
        summaryStretchingPriceLabel.textContent = formatNumber(calculateStretchingPrice());
        summaryPrintingPriceLabel.textContent = formatNumber(calculatePrintingPrice());
        summaryArtworksPriceLabel.textContent = formatNumber(calculateArtworkPrice());

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

