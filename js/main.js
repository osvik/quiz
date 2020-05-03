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
function deleteDimension(dimension) {
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

/**
 * Display dimension values in html file
 */
function displayDimensionValues() {
    const dimensions = [];
    quiz_dimensions.forEach((dimensionName)=>{
        dimensions[dimensionName] = getDimensionValue(dimensionName);
        jQuery("[data-display=" + dimensionName + "]").text(dimensions[dimensionName]);
    });
}

/**
 * Initialize page
 */
{
    jQuery(".question-block").addClass("hidden");
    jQuery(".question-block").first().removeClass("hidden");
    quiz_dimensions.forEach((dimensionName)=>{
        deleteDimension(dimensionName);
    });
}

/**
 * Click events to answer and move to the next page
 */
jQuery(".answer > *").on("click", function () {
    jQuery(this).parents(".question-block").next().removeClass("hidden");
    jQuery(this).parents(".question-block").addClass("hidden");
    const dimensions = [];
    quiz_dimensions.forEach((dimensionName)=>{
        dimensions[dimensionName] = jQuery(this).data(dimensionName) || 0;
        addToDimension(dimensionName, dimensions[dimensionName]);
    });
    if ( jQuery(this).parents(".question-block").next().length === 0 ) {
        jQuery(".answers-block").removeClass("hidden");
        jQuery(".questions-block").addClass("hidden");
        displayDimensionValues();
    }
});
