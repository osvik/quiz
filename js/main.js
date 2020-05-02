/* jshint browser: true,  esversion: 6 */
/* global jQuery */

/**
 * Get dimension value
 * @param   {string} dimension Dimension name
 * @returns {number} Dimension value
 */
function getDimensionValue(dimension) {
    if (sessionStorage.getItem(dimension) === null) {
        return 0;
    } else {
        return Number(sessionStorage.getItem(dimension));    
    }
    
}

/**
 * Delete dimension
 * @param {string} dimension Dimension name
 */
function deleteDimension(dimension){
    sessionStorage.removeItem(dimension);
}

/**
 * Add value to dimension
 * @param {string} dimension Dimension name
 * @param {number} value     Value to add / subtract
 */
function addToDimension(dimension, value) {
    let dimensionValue = getDimensionValue(dimension);
    dimensionValue = dimensionValue + value;
    sessionStorage.setItem(dimension, dimensionValue);
}

function displayDimensionValues(){
    const dimension1 = getDimensionValue("dimension1");
    const dimension2 = getDimensionValue("dimension2");
    jQuery(".dimension1").text(dimension1);
    jQuery(".dimension2").text(dimension2);
}

deleteDimension("dimension1");
deleteDimension("dimension2");

jQuery(".answer button").on("click", function () {
    const dimension1 = jQuery(this).data("dimension1");
    const dimension2 = jQuery(this).data("dimension2");
    addToDimension("dimension1", dimension1);
    addToDimension("dimension2", dimension2);
});

jQuery(".answers-block button").on("click", function () {
    displayDimensionValues();
});