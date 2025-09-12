class tabManager {
    constructor(data, tabId, vatIncluded = false) {
        this.datas = data;
        this.tabElement = document.getElementById(tabId);
        this.priceSource = tabId.replace('tab-', '');
        this.pricesIncludeVat = vatIncluded;

        this.states = {};
        this.elements = {};

        this.intiParams();
        this.initStates();
        this.initElements();
        this.fillSelects();
        this.setHandlers();
    }

    initStates() {
        this.states = {
            selectedFrame: null,
            selectedSecondFrame: null,
            selectedBackPanelGlass: null,
            selectedExtraBackPanel: null,
            selectedMirror: null,
            selectedPasspartout: null,
            selectedExtraService: null,
            selectedBackBoardType: null,
            selectedArtwork: null,
            selectedStretching: null,
            selectedOuterFrame: null,
            selectedOuterSecondFrame: null,
        }
    }

    initElements() {
        this.elements.form = this.tabElement.getElementsByClassName('needs-validation')[0];

        // Get a reference to the input element and the span element
        this.elements.frameUnitPriceLabel = this.tabElement.querySelector('[data-id="frame-unit-price"]');
        this.elements.frameUnitLabel = this.tabElement.querySelector('[data-id="frame-unit"]');

        this.elements.secondFrameUnitPriceLabel = this.tabElement.querySelector('[data-id="second-frame-unit-price"]');
        this.elements.secondFrameUnitLabel = this.tabElement.querySelector('[data-id="second-frame-unit"]');

        // select elements
        this.elements.frameSelect = this.tabElement.querySelector('[data-id="frame-select"]');
        this.elements.secondFrameSelect = this.tabElement.querySelector('[data-id="second-frame-select"]');
        this.elements.discountSelect = this.tabElement.querySelector('[data-id="discount-select"]');
        this.elements.outerMeasureSelect = this.tabElement.querySelector('[data-id="outer-measure-select"]');
        if (this.priceSource != "stampless") {
            this.elements.blackGlassSelect = this.tabElement.querySelector('[data-id="back-panel-select"]');
            this.elements.extraBackPanelsSelect = this.tabElement.querySelector('[data-id="extra-back-frame-select"]');
            this.elements.passpartoutSelect = this.tabElement.querySelector('[data-id="passpartout-select"]');
            this.elements.mirrorSelect = this.tabElement.querySelector('[data-id="mirror-select"]');
            this.elements.extraServicesSelect = this.tabElement.querySelector('[data-id="extra-service-select"]');
            this.elements.backBoardTypeSelect = this.tabElement.querySelector('[data-id="back-board-type-select"]');
            this.elements.printingSelect = this.tabElement.querySelector('[data-id="printing-select"]');
            this.elements.artworkSelect = this.tabElement.querySelector('[data-id="artwork-select"]');
            this.elements.stretchingSelect = this.tabElement.querySelector('[data-id="stretching-select"]');
        }

        // input elements
        this.elements.heightInput = this.tabElement.querySelector('[data-id="height-input"]');
        this.elements.widthInput = this.tabElement.querySelector('[data-id="width-input"]');

        if (this.priceSource != "stampless") {
            this.elements.backBoardLengthInput = this.tabElement.querySelector('[data-id="back-board-length-input"]');
            this.elements.mirrorSquaremeterLabel = this.tabElement.querySelector('[data-id="mirror-squaremeter-label"]');
            this.elements.printingSquaremeterLabel = this.tabElement.querySelector('[data-id="printing-squaremeter-label"]');
            this.elements.backGlassSquaremeterPanel = this.tabElement.querySelector('[data-id="back-glass-squaremeter-label"]');
        }

        // summary labels
        this.elements.netPriceLabel = this.tabElement.querySelector('[data-id="net-price-label"]');
        this.elements.discountLabel = this.tabElement.querySelector('[data-id="discount-label"]');
        this.elements.afterDiscountLabel = this.tabElement.querySelector('[data-id="after-discount-label"]');
        this.elements.vatLabel = this.tabElement.querySelector('[data-id="vat-label"]');
        this.elements.totalWithVatLabel = this.tabElement.querySelector('[data-id="total-with-vat-label"]');

        // cost breakdown labels
        this.elements.summaryFramePriceLabelabel = this.tabElement.querySelector('[data-id="frame-price-label"]');
        this.elements.summaryRebatePriceLabel = this.tabElement.querySelector('[data-id="rebate-price-label"]');

        if (this.priceSource != "stampless") {
            this.elements.summaryPasspartoutPriceLabel = this.tabElement.querySelector('[data-id="passpartout-price-label"]');
            this.elements.summaryBackPanelGlassPriceLabel = this.tabElement.querySelector('[data-id="back-glass-price-label"]');
            this.elements.summaryMirrorPriceLabel = this.tabElement.querySelector('[data-id="mirror-price-label"]');
            this.elements.summaryLaborPriceLabel = this.tabElement.querySelector('[data-id="labor-price-label"]');
            this.elements.summaryStretchingPriceLabel = this.tabElement.querySelector('[data-id="stretching-price-label"]');
            this.elements.summaryPrintingPriceLabel = this.tabElement.querySelector('[data-id="printing-price-label"]');
            this.elements.summaryArtworksPriceLabel = this.tabElement.querySelector('[data-id="artworks-price-label"]');
        }

        this.elements.clearButton = this.tabElement.querySelector('[data-id="clear-button"]');
    }

    fillSelects() {
        populateSelectFromData(
            this.datas["frame_prices"],
            this.elements.frameSelect,
            "OXI", 0, 0, ';'
        );
        populateSelectFromData(
            this.datas["frame_prices"],
            this.elements.secondFrameSelect,
            "OXI", 0, 0, ';'
        );

        if (this.priceSource != "stampless") {
            populateSelectFromData(
                this.datas["back_panel_glasses_" + this.priceSource],
                this.elements.blackGlassSelect,
                "OXI", 0, 0, ';'
            );
            populateSelectFromData(
                this.datas["extra_back_frames"],
                this.elements.extraBackPanelsSelect,
                "OXI", 0, 0, ';'
            );
            populateSelectFromData(
                this.datas["mirrors"],
                this.elements.mirrorSelect,
                "OXI", 0, 0, ';'
            );
            populateSelectFromData(
                this.datas["passpartouts"],
                this.elements.passpartoutSelect,
                "OXI", 0, 0, ';'
            );
            populateSelectFromData(
                this.datas["extra_services"],
                this.elements.extraServicesSelect,
                "OXI", 0, 0, ';'
            );
            populateSelectFromData(
                this.datas["back_board_types"],
                this.elements.backBoardTypeSelect,
                "OXI", 0, 0, ';'
            );

            populateSelectFromData(
                this.datas["artwork_prices"],
                this.elements.artworkSelect,
                "OXI", 0, 0, ';'
            );
            populateSelectFromData(
                this.datas["stretchings"],
                this.elements.stretchingSelect,
                "OXI", 0, 0, ';'
            );
        }
    }

    setHandlers() {
        this.elements.form.addEventListener('input', (event) => {
            this.calculateAndSetValues();
        });

        this.elements.discountSelect.addEventListener('input', (event) => {
            this.calculateAndSetValues();
        });

        this.elements.frameSelect.addEventListener('input', (event) => {
            findRowInData(
                this.datas["frame_prices"],
                0, event.target.value).then((data) => {
                    this.states.selectedFrame = data;
                    this.elements.frameUnitPriceLabel.textContent = formatNumber(this.getFrameUnitPrice(this.priceSource));
                });

            findRowInData(
                this.datas["outer_frames"],
                0, event.target.value).then((data) => {
                    this.states.selectedOuterFrame = data;
                });
        });

        this.elements.secondFrameSelect.addEventListener('input', (event) => {
            findRowInData(
                this.datas["frame_prices"],
                0, event.target.value).then((data) => {
                    this.states.selectedSecondFrame = data;
                    this.elements.secondFrameUnitPriceLabel.textContent = formatNumber(this.getFrameUnitPrice(this.priceSource, true)); // true means second frame
                });

            findRowInData(
                this.datas["outer_frames"],
                0, event.target.value).then((data) => {
                    this.states.selectedOuterSecondFrame = data;
                });
        });

        if (this.priceSource != "stampless") {
            this.elements.blackGlassSelect.addEventListener('input', (event) => {
                findRowInData(
                    this.datas["back_panel_glasses_" + this.priceSource],
                    0, event.target.value).then((data) => {
                        this.states.selectedBackPanelGlass = data;
                    });
            });

            this.elements.extraBackPanelsSelect.addEventListener('input', (event) => {
                findRowInData(
                    this.datas["extra_back_frames"],
                    0, event.target.value).then((data) => {
                        this.states.selectedExtraBackPanel = data;
                    });
            });

            this.elements.mirrorSelect.addEventListener('input', (event) => {
                findRowInData(
                    this.datas["mirrors"],
                    0, event.target.value).then((data) => {
                        this.states.selectedMirror = data;
                    });
            });

            this.elements.passpartoutSelect.addEventListener('input', (event) => {
                findRowInData(
                    this.datas["passpartouts"],
                    0, event.target.value).then((data) => {
                        this.states.selectedPasspartout = data;
                    });
            });

            this.elements.extraServicesSelect.addEventListener('input', (event) => {
                findRowInData(
                    this.datas["extra_services"],
                    0, event.target.value).then((data) => {
                        this.states.selectedExtraService = data;
                    });
            });

            this.elements.backBoardTypeSelect.addEventListener('input', (event) => {
                findRowInData(
                    this.datas["back_board_types"],
                    0, event.target.value).then((data) => {
                        this.states.selectedBackBoardType = data;
                    });
            });

            this.elements.artworkSelect.addEventListener('input', (event) => {
                findRowInData(
                    this.datas["artwork_prices"],
                    0, event.target.value).then((data) => {
                        this.states.selectedArtwork = data;
                    });
            });

            this.elements.stretchingSelect.addEventListener('input', (event) => {
                findRowInData(
                    this.datas["stretchings"],
                    0, event.target.value).then((data) => {
                        this.states.selectedStretching = data;
                    });
            });
        }

        this.elements.clearButton.addEventListener('click', (event) => {
            this.elements.form.reset();
            // reset all selected items
            this.states.selectedFrame = null;
            this.states.selectedSecondFrame = null;
            if (this.priceSource != "stampless") {
                this.states.selectedBackPanelGlass = null;
                this.states.selectedExtraBackPanel = null;
                this.states.selectedMirror = null;
                this.states.selectedPasspartout = null;
                this.states.selectedExtraService = null;
                this.states.selectedBackBoardType = null;
                this.states.selectedArtwork = null;
                this.states.selectedStretching = null;
            }
            this.elements.discountSelect.selectedIndex = 0;

            // clear labels
            this.elements.frameUnitPriceLabel.textContent = '';
            this.elements.frameUnitLabel.textContent = '';
            this.elements.secondFrameUnitPriceLabel.textContent = '';
            this.elements.secondFrameUnitLabel.textContent = '';

            this.calculateAndSetValues();
        });
    }

    calculateAndSetValues() {
        //calculateAndDisplaySquare();
        const frameUnit = this.calculateFrameUnit();
        const secondFrameUnit = this.calculateSecondFrameUnit();


        // cost breakdown
        this.elements.summaryFramePriceLabelabel.textContent = formatNumber(this.calculateFramePrice());
        this.elements.summaryRebatePriceLabel.textContent = formatNumber(this.calculateSecondFramePrice());
        if (this.priceSource != "stampless") {
            this.elements.summaryBackPanelGlassPriceLabel.textContent = formatNumber(this.calculateBackPanelGlassPrice());
            this.elements.summaryPasspartoutPriceLabel.textContent = formatNumber(this.calculatePasspartoutPrice());
            this.elements.summaryLaborPriceLabel.textContent = formatNumber(this.calculateLaborPrice());
            this.elements.summaryMirrorPriceLabel.textContent = formatNumber(this.calculateMirrorPrice());
            this.elements.summaryStretchingPriceLabel.textContent = formatNumber(this.calculateStretchingPrice());
            this.elements.summaryPrintingPriceLabel.textContent = formatNumber(this.calculatePrintingPrice());
            this.elements.summaryArtworksPriceLabel.textContent = formatNumber(this.calculateArtworkPrice());
        }

        // totals
        this.elements.netPriceLabel.textContent = formatNumber(this.calculateNetPrice(false, this.pricesIncludeVat)); // price before discount and vat
        this.elements.discountLabel.textContent = this.elements.discountSelect.options[this.elements.discountSelect.selectedIndex].text.replace('%', ''); // discount rate

        let priceWithoutVat = this.calculateNetPrice(true, this.pricesIncludeVat);
        this.elements.afterDiscountLabel.textContent = formatNumber(priceWithoutVat); // price after discount but before vat

        let priceWithVat = priceWithoutVat * this.vatRate;
        this.elements.totalWithVatLabel.textContent = formatNumber(priceWithVat); // total price with vat

        this.elements.vatLabel.textContent = formatNumber(priceWithVat - priceWithoutVat); // vat amount

        // set values
        this.elements.frameUnitLabel.textContent = formatNumber(frameUnit);
        this.elements.secondFrameUnitLabel.textContent = formatNumber(secondFrameUnit);

        if (this.priceSource != "stampless") {
            this.elements.mirrorSquaremeterLabel.textContent = formatNumber(this.calculateSquareMeter());
            this.elements.backGlassSquaremeterPanel.textContent = formatNumber(this.calculateSquareMeter());

            if (this.elements.printingSelect.value && (this.elements.printingSelect.value == "2" || this.elements.printingSelect.value == "3")) {
                this.elements.printingSquaremeterLabel.textContent = formatNumber(this.calculateSquareMeter(8));
            } else
                this.elements.printingSquaremeterLabel.textContent = formatNumber(this.calculateSquareMeter());
        }
    }

    getPriceIndex() {
        let priceIndex = 1;
        if (this.priceSource == "wholesale") {
            priceIndex = 1;
        } else if (this.priceSource == "stampless") {
            priceIndex = 2;
        } else if (this.priceSource == "wholesaleplus") {
            priceIndex = 3;
        } else if (this.priceSource == "retail") {
            priceIndex = 4;
        }
        return priceIndex;
    }

    getFrameUnitPrice(isSecondFrame = false) {
        try {
            const frameData = isSecondFrame ? this.states.selectedSecondFrame : this.states.selectedFrame;

            if (!frameData) {
                return 0;
            };

            return frameData ? safeParseNumber(frameData[this.getPriceIndex() + 1]) : 0;
        }
        catch (error) {
            console.error('An error occured while getting frame unit price:', error);
            return null;
        }
    };

    getFrameUnit(isSecondFrame = false) {
        try {
            const frameData = isSecondFrame ? this.states.selectedSecondFrame : this.states.selectedFrame;

            if (!frameData) {
                return 0;
            };

            return frameData ? safeParseNumber(frameData[1]) : 0;
        }
        catch (error) {
            console.error('An error occured while getting frame unit price:', error);
            return null;
        }
    };

    getBackPanelGlassOuterSquareMeter() {
        try {
            return this.states.selectedBackPanelGlass ? safeParseNumber(this.states.selectedBackPanelGlass[1]) : 0;
        }
        catch (error) {
            console.error('An error occured while getting back panel glass srqmeter', error);
            return null;
        }
    };

    getBackPanelGlassOuterUnit() {
        try {
            return this.states.selectedBackPanelGlass ? safeParseNumber(this.states.selectedBackPanelGlass[2]) : 0;
        }
        catch (error) {
            console.error('An error occured while getting back panel glass unit', error);
            return null;
        }
    };

    getExtraBackPanelUnit() {
        try {
            return this.states.selectedExtraBackPanel ? safeParseNumber(this.states.selectedExtraBackPanel[this.getPriceIndex()]) : 0;
        }
        catch (error) {
            console.error('An error occured while getting extra back panel unit', error);
            return null;
        }
    };

    getPasspartoutUnitPrice() {
        try {
            return this.states.selectedPasspartout ? safeParseNumber(this.states.selectedPasspartout[this.getPriceIndex()]) : 0;
        }
        catch (error) {
            console.error('An error occured while getting extra back panel unit', error);
            return null;
        }
    };

    getExtraWorkUnitPrice() {
        try {
            return this.states.selectedExtraService ? safeParseNumber(this.states.selectedExtraService[this.getPriceIndex()]) : 0;
        }
        catch (error) {
            console.error('An error occured while getting extra work unit price', error);
            return null;
        }
    }

    getMirrorUnitPrice() {
        try {
            return this.states.selectedMirror ? safeParseNumber(this.states.selectedMirror[this.getPriceIndex()]) : 0;
        }
        catch (error) {
            console.error('An error occured while getting mirror unit price', error);
            return null;
        }
    }

    getStretchingUnitPrice() {
        try {
            return this.states.selectedStretching ? safeParseNumber(this.states.selectedStretching[this.getPriceIndex()]) : 0;
        }
        catch (error) {
            console.error('An error occured while getting stretching unit price', error);
            return null;
        }
    }

    getBackBoardTypeUnitPrice() {
        try {
            return this.states.selectedBackBoardType ? safeParseNumber(this.states.selectedBackBoardType[1]) : 0;
        }
        catch (error) {
            console.error('An error occured while getting back board type unit price', error);
            return null;
        }
    }

    getArtworkUnitPrice() {
        try {
            return this.states.selectedArtwork ? safeParseNumber(this.states.selectedArtwork[this.getPriceIndex()]) : 0;
        }
        catch (error) {
            console.error('An error occured while getting artwork unit price', error);
            return null;
        }
    }

    getDiscount(withDiscount = true) {
        return (withDiscount ? getSelectValueAsNumber(this.elements.discountSelect) : 1);
    }

    calculateOuterMeasure() {
        if (this.elements.outerMeasureSelect.value === "0") {
            return 0;
        } else {
            const outerFramePrice = this.states.selectedOuterFrame ? safeParseNumber(this.states.selectedOuterFrame[1]) : 0;
            const outerSecondFramePrice = this.states.selectedOuterSecondFrame ? safeParseNumber(this.states.selectedOuterSecondFrame[1]) : 0;
            return (outerFramePrice + outerSecondFramePrice) / 100;
        }
    }

    calculateSquareMeter(additional = 0) {
        const height = getTypedInputValue(this.elements.heightInput);
        const width = getTypedInputValue(this.elements.widthInput);
        const wear = this.calculateOuterMeasure() / 4 * 100;
        return ((height + additional - wear) * (width + additional - wear)) / 10000;
    }

    calculateSquareMeter1() {
        const height = getTypedInputValue(this.elements.heightInput);
        const width = getTypedInputValue(this.elements.widthInput);
        const wear = calculateOuterMeasure() / 4 * 100;
        return (((height - wear) + (width - wear)) * 2) / 100;
    }

    calculateFrameUnit() {
        const height = getTypedInputValue(this.elements.heightInput);
        const width = getTypedInputValue(this.elements.widthInput);
        const frameUnit = this.getFrameUnit();
        const secondFrameUnit = this.getFrameUnit(true);
        return ((((height + width) * 2) + frameUnit + secondFrameUnit) / 100) - this.calculateOuterMeasure();
    };

    calculateSecondFrameUnit() {
        const height = getTypedInputValue(this.elements.heightInput);
        const width = getTypedInputValue(this.elements.widthInput);
        const secondFrameUnit = this.getFrameUnit(true);
        return ((((height + width) * 2) + secondFrameUnit) / 100) - this.calculateOuterMeasure();
    };

    calculateFramePrice(withDiscount = true) {
        return (this.calculateFrameUnit() * this.getFrameUnitPrice()) * this.getDiscount(withDiscount);
    }

    calculateSecondFramePrice(withDiscount = true) {
        return (this.calculateSecondFrameUnit() * this.getFrameUnitPrice(true)) * this.getDiscount(withDiscount);
    }

    calculateBackPanelGlassPrice(withDiscount = true) {
        const height = getTypedInputValue(this.elements.heightInput);
        const width = getTypedInputValue(this.elements.widthInput);
        const wear = this.calculateOuterMeasure() / 4 * 100;
        return ((this.calculateSquareMeter() * this.getBackPanelGlassOuterSquareMeter()) + this.getBackPanelGlassOuterUnit() + this.getExtraBackPanelUnit()) * this.getDiscount(withDiscount);
    }

    calculatePasspartoutPrice(withDiscount = true) {
        return this.getPasspartoutUnitPrice() * this.getDiscount(withDiscount);
    }

    calculateLaborPrice(withDiscount = true) {
        return (this.calculateSquareMeter() * this.getExtraWorkUnitPrice()) * this.getDiscount(withDiscount);
    }

    calculateMirrorPrice(withDiscount = true) {
        const mirrorUnit = this.getMirrorUnitPrice();
        let price = 0;

        if (mirrorUnit == -1) {
            price = (this.calculateSquareMeter() * 39) + (this.calculateSquareMeter1() * 3);
        } else {
            price = this.calculateSquareMeter() * mirrorUnit;
        }

        return price * this.getDiscount(withDiscount);
    }

    calculategetBackBoardTypePrice() {
        return this.getBackBoardTypeUnitPrice() * getTypedInputValue(this.elements.backBoardLengthInput);
    }

    calculateStretchingPrice(withDiscount = true) {
        const height = getTypedInputValue(this.elements.heightInput);
        const width = getTypedInputValue(this.elements.widthInput);
        let price = ((((height + width) * 2) / 100) - this.calculateOuterMeasure()) * this.getStretchingUnitPrice();
        return (price + this.calculategetBackBoardTypePrice()) * this.getDiscount(withDiscount);
    }

    calculatePrintingPrice(withDiscount = true) {
        const selectedPrinting = getSelectValueAsNumber(this.elements.printingSelect);

        const squareMeter = this.calculateSquareMeter();
        const squareMeterAdditional = this.calculateSquareMeter(8);
        let cost = 0;

        if (selectedPrinting === 1) {
            if (squareMeter >= 0.75) {
                cost = squareMeter * 27;
            } else if (squareMeter >= 0.5) {
                cost = squareMeter * 30;
            } else if (squareMeter >= 0.25) {
                cost = squareMeter * 33;
            } else if (squareMeter >= 0.1) {
                cost = squareMeter * 36;
            } else if (squareMeter >= 0.00001) {
                cost = squareMeter * 40;
            }
        } else if (selectedPrinting === 2) {
            if (squareMeterAdditional >= 0.75) {
                cost = squareMeterAdditional * 30;
            } else if (squareMeterAdditional >= 0.5) {
                cost = squareMeterAdditional * 33;
            } else if (squareMeterAdditional >= 0.25) {
                cost = squareMeterAdditional * 36;
            } else if (squareMeterAdditional >= 0.1) {
                cost = squareMeterAdditional * 40;
            } else if (squareMeterAdditional >= 0.00001) {
                cost = squareMeterAdditional * 44;
            }
        } else if (selectedPrinting === 3) {
            if (squareMeterAdditional >= 0.75) {
                cost = squareMeter * 48;
            } else if (squareMeterAdditional >= 0.5) {
                cost = squareMeterAdditional * 53;
            } else if (squareMeterAdditional >= 0.25) {
                cost = squareMeterAdditional * 58;
            } else if (squareMeter >= 0.1) {
                cost = squareMeterAdditional * 64;
            } else if (squareMeterAdditional >= 0.00001) {
                cost = squareMeterAdditional * 70;
            }
        }

        if (this.priceSource == "retail")
            cost = cost * 2;

        return cost * this.getDiscount(withDiscount);
    }

    calculateArtworkPrice(withDiscount = true) {
        return this.getArtworkUnitPrice() * this.getDiscount(withDiscount);
    }

    calculateNetPrice(withDiscount = true, excludeVat = false) {
        let total = this.calculateFramePrice(withDiscount) +
            this.calculateSecondFramePrice(withDiscount);

        if (this.priceSource != "stampless") {
            total += this.calculateBackPanelGlassPrice(withDiscount) +
                this.calculatePasspartoutPrice(withDiscount) +
                this.calculateLaborPrice(withDiscount) +
                this.calculateMirrorPrice(withDiscount) +
                this.calculateStretchingPrice(withDiscount) +
                this.calculatePrintingPrice(withDiscount) +
                this.calculateArtworkPrice(withDiscount);
        }

        if (excludeVat)
            total = total / this.vatRate;
        return total;
    }

    async intiParams() {
        try {
            const params = await readParameterFile();
            // VAT rate
            if (params['vat-rate'] && !isNaN(params['vat-rate'])) {
                this.vatRate = parseFloat(params['vat-rate']);
            }
        }
        catch (error) {
            console.error('An error occured while initializing params:', error);
            return null;
        }
    }

}