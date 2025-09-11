function getFrameUnitPrice(priceSource, isSecondFrame = false) {
    try {
        const frameData = isSecondFrame ? selectedSecondFrame : selectedFrame;

        if (!frameData) {
            return 0;
        };

        let priceIndex = 2;// default to wholesale price
        if (priceSource === 'wholesale') {
            priceIndex = 2;
        } else if (priceSource === 'retail') {
            priceIndex = 3;
        } else if (priceSource === 'wholesaleplus') {
            priceIndex = 4;
        } else if (priceSource === 'stampless') {
            priceIndex = 5;
        }
        return frameData ? safeParseNumber(frameData[priceIndex]) : 0;
    }
    catch (error) {
        console.error('An error occured while getting frame unit price:', error);
        return null;
    }
};

function getFrameUnit(isSecondFrame = false) {
    try {
        const frameData = isSecondFrame ? selectedSecondFrame : selectedFrame;

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

function getBackPanelGlassOuterSquareMeter() {
    try {
        return selectedBackPanelGlass ? safeParseNumber(selectedBackPanelGlass[1]) : 0;
    }
    catch (error) {
        console.error('An error occured while getting back panel glass srqmeter', error);
        return null;
    }
};

function getBackPanelGlassOuterUnit() {
    try {
        return selectedBackPanelGlass ? safeParseNumber(selectedBackPanelGlass[2]) : 0;
    }
    catch (error) {
        console.error('An error occured while getting back panel glass unit', error);
        return null;
    }
};

function getExtraBackPanelUnit() {
    try {
        return selectedExtraBackPanel ? safeParseNumber(selectedExtraBackPanel[1]) : 0;
    }
    catch (error) {
        console.error('An error occured while getting extra back panel unit', error);
        return null;
    }
};

function getPasspartoutUnitPrice() {
    try {
        return selectedPasspartout ? safeParseNumber(selectedPasspartout[1]) : 0;
    }
    catch (error) {
        console.error('An error occured while getting extra back panel unit', error);
        return null;
    }
};

function getExtraWorkUnitPrice() {
    try {
        return selectedExtraService ? safeParseNumber(selectedExtraService[1]) : 0;
    }
    catch (error) {
        console.error('An error occured while getting extra work unit price', error);
        return null;
    }
}

function getMirrorUnitPrice() {
    try {
        return selectedMirror ? safeParseNumber(selectedMirror[1]) : 0;
    }
    catch (error) {
        console.error('An error occured while getting mirror unit price', error);
        return null;
    }
}

function getStretchingUnitPrice() {
    try {
        return selectedStretching ? safeParseNumber(selectedStretching[1]) : 0;
    }
    catch (error) {
        console.error('An error occured while getting stretching unit price', error);
        return null;
    }
}

function getBackBoardTypeUnitPrice() {
    try {
        return selectedBackBoardType ? safeParseNumber(selectedBackBoardType[1]) : 0;
    }
    catch (error) {
        console.error('An error occured while getting back board type unit price', error);
        return null;
    }
}

function getArtworkUnitPrice() {
    try {
        return selectedArtwork ? safeParseNumber(selectedArtwork[1]) : 0;
    }
    catch (error) {
        console.error('An error occured while getting artwork unit price', error);
        return null;
    }
}

function getDiscount(withDiscount = true) {
    return (withDiscount ? getSelectValueAsNumber(discountSelect) : 1);
}

function calculateOuterMeasure() {
    if (outerMeasureSelect.value === "0") {
        return 0;
    } else {
        const outerFramePrice = selectedOuterFrame ? safeParseNumber(selectedOuterFrame[1]) : 0;
        const outerSecondFramePrice = selectedOuterSecondFrame ? safeParseNumber(selectedOuterSecondFrame[1]) : 0;
        return (outerFramePrice + outerSecondFramePrice) / 100;
    }
}

function calculateSquareMeter(additional = 0) {
    const height = getTypedInputValue(heightInput);
    const width = getTypedInputValue(widthInput);
    const wear = calculateOuterMeasure() / 4 * 100;
    return ((height + additional - wear) * (width + additional - wear)) / 10000;
}

function calculateSquareMeter1() {
    const height = getTypedInputValue(heightInput);
    const width = getTypedInputValue(widthInput);
    const wear = calculateOuterMeasure() / 4 * 100;
    return (((height - wear) + (width - wear)) * 2) / 100;
}

function calculateFrameUnit() {
    const height = getTypedInputValue(heightInput);
    const width = getTypedInputValue(widthInput);
    const frameUnit = getFrameUnit();
    const secondFrameUnit = getFrameUnit(true);
    return ((((height + width) * 2) + frameUnit + secondFrameUnit) / 100) - calculateOuterMeasure();

};

function calculateSecondFrameUnit() {
    const height = getTypedInputValue(heightInput);
    const width = getTypedInputValue(widthInput);
    const secondFrameUnit = getFrameUnit(true);
    return ((((height + width) * 2) + secondFrameUnit) / 100) - calculateOuterMeasure();
};

function calculateFramePrice(withDiscount = true) {
    return (calculateFrameUnit() * getFrameUnitPrice(priceSource)) * getDiscount(withDiscount);
}

function calculateSecondFramePrice(withDiscount = true) {
    return (calculateSecondFrameUnit() * getFrameUnitPrice(priceSource, true)) * getDiscount(withDiscount);
}

function calculateBackPanelGlassPrice(withDiscount = true) {
    const height = getTypedInputValue(heightInput);
    const width = getTypedInputValue(widthInput);
    const wear = calculateOuterMeasure() / 4 * 100;
    return ((calculateSquareMeter() * getBackPanelGlassOuterSquareMeter()) + getBackPanelGlassOuterUnit() + getExtraBackPanelUnit()) * getDiscount(withDiscount);
}

function calculatePasspartoutPrice(withDiscount = true) {
    return getPasspartoutUnitPrice() * getDiscount(withDiscount);
}

function calculateLaborPrice(withDiscount = true) {
    return (calculateSquareMeter() * getExtraWorkUnitPrice()) * getDiscount(withDiscount);
}

function calculateMirrorPrice(withDiscount = true) {
    const mirrorUnit = getMirrorUnitPrice();
    let price = 0;

    if (mirrorUnit == -1) {
        price = (calculateSquareMeter() * 39) + (calculateSquareMeter1() * 3);
    } else {
        price = calculateSquareMeter() * mirrorUnit;
    }

    return price * getDiscount(withDiscount);
}

function calculategetBackBoardTypePrice() {
    return getBackBoardTypeUnitPrice() * getTypedInputValue(backBoardLengthInput);
}

function calculateStretchingPrice(withDiscount = true) {
    const height = getTypedInputValue(heightInput);
    const width = getTypedInputValue(widthInput);
    let price = ((((height + width) * 2) / 100) - calculateOuterMeasure()) * getStretchingUnitPrice();
    return (price + calculategetBackBoardTypePrice()) * getDiscount(withDiscount);
}

function calculatePrintingPrice(withDiscount = true) {
    const selectedPrinting = getSelectValueAsNumber(printingSelect);

    const squareMeter = calculateSquareMeter();
    const squareMeterAdditional = calculateSquareMeter(8);
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

    return cost * getDiscount(withDiscount);
}

function calculateArtworkPrice(withDiscount = true) {
    return getArtworkUnitPrice() * getDiscount(withDiscount);
}

