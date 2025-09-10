function getFrameUnitPrice(priceSource, isSecondFrame = false) {
    try {
        const frameData = isSecondFrame ? selectedSecondFrameData : selectedFrameData;

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
        const frameData = isSecondFrame ? selectedSecondFrameData : selectedFrameData;

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

function calculateFrameUnit() {
    const height = getTypedInputValue('height-input');
    const width = getTypedInputValue('width-input');
    const frameUnitPrice = getFrameUnit();
    const secondFrameUnitPrice = getFrameUnit(true);
    frameUnit.textContent = ((((height + width) * 2) + frameUnitPrice + secondFrameUnitPrice) / 100) - 0; // in the excel it look outer/inner measurement. but both values are zero. 
};

function calculateSecondFrameUnit() {
    const height = getTypedInputValue('height-input');
    const width = getTypedInputValue('width-input');
    const frameUnitPrice = getFrameUnit();
    const secondFrameUnitPrice = getFrameUnit(true);
    secondFrameUnit.textContent = ((((height + width) * 2) + secondFrameUnitPrice) / 100) - 0; // in the excel it look outer/inner measurement. but both values are zero. 
};