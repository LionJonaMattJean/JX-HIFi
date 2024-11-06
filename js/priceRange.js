window.onload = function () {
    slideMin();
    slideMax();
};

const minVal = document.querySelector(".slideMinVal");
const maxVal = document.querySelector(".slideMaxVal");
const priceInputMin = document.querySelector(".txtMinVal");
const priceInputMax = document.querySelector(".txtMaxVal");
const minTooltip = document.querySelector(".minTooltip");
const maxTooltip = document.querySelector(".maxTooltip");
const minGap = 0;
const range = document.querySelector(".sliderTrack");
const sliderMinValue = parseInt(minVal.min);
const sliderMaxValue = parseInt(maxVal.max);

function slideMin() {
    let gap = parseInt(maxVal.value) - parseInt(minVal.value);
    if (gap <= minGap) {
        minVal.value = parseInt(maxVal.value) - minGap;
    }
    //   minTooltip.innerHTML = "$" + minVal.value;
    priceInputMin.value = minVal.value;
    setArea();
}

function slideMax() {
    let gap = parseInt(maxVal.value) - parseInt(minVal.value);
    if (gap <= minGap) {
        maxVal.value = parseInt(minVal.value) + minGap;
    }
    priceInputMax.value = maxVal.value;
    setArea();
}

function setArea() {
    // range.style.left = `${((minVal.value - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100
    //     }%`;

    range.style.left = (minVal.value / sliderMaxValue) * 100 + "%";
    minTooltip.style.left = (minVal.value / sliderMaxValue) * 100 + "%";
    range.style.right = 100 - (maxVal.value / sliderMaxValue) * 100 + "%";
    // range.style.right = `${100 -
    //     ((maxVal.value - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100
    //     }%`;
    maxTooltip.style.right = 100 - (maxVal.value / sliderMaxValue) * 100 + "%";
}

function setMinInput() {
    let minPrice = parseInt(priceInputMin.value);
    if (minPrice < sliderMinValue) {
        priceInputMin.value = sliderMinValue;
    }
    minVal.value = priceInputMin.value;
    slideMin();
}

function setMaxInput() {
    let maxPrice = parseInt(priceInputMax.value);
    if (maxPrice > sliderMaxValue) {
        priceInputMax.value = sliderMaxValue;
    }
    maxVal.value = priceInputMax.value;
    slideMax();
}