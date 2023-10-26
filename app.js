// inputs
const day_in = document.getElementById("day_input");
const month_in = document.getElementById("month_input");
const year_in = document.getElementById("year_input");


// outputs
const day_out = document.getElementById('day_output');
const month_out = document.getElementById('month_output');
const year_out = document.getElementById('year_output');

const day_error = document.querySelector('.day_error');
const month_error = document.querySelector('.month_error');
const year_error = document.querySelector('.year_error');

// error messages
const error_day = document.getElementById("day_input_label");
const error_month = document.getElementById("month_input_label");
const error_year = document.getElementById("year_input_label");

// other definitions
const input_fields = document.querySelector("label");

const submit_button = document.querySelector(".submit_button");
submit_button.addEventListener('click', calculate_Duration);

const days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


console.log("in app.js");

function calculate_Duration() {
    console.log("in calculate");
    day_error.innerHTML = " ";
    month_error.innerHTML = " ";
    year_error.innerHTML = " ";
    error_day.classList.remove('label_input_error');
    error_month.classList.remove('label_input_error');
    error_year.classList.remove('label_input_error');
    day_in.classList.remove('border_input_error');
    month_in.classList.remove('border_input_error');
    year_in.classList.remove('border_input_error');

    var validation_Passed = true;

    if (!day_in.value) {
        day_error.innerHTML = "This field is required";
        error_day.classList.add('label_input_error');
        day_in.classList.add('border_input_error');
        validation_Passed = false;
    }
    if (!month_in.value) {
        month_error.innerHTML = "This field is required";
        error_month.classList.add('label_input_error');
        month_in.classList.add('border_input_error');
        validation_Passed = false;
    }
    if (!year_in.value) {
        year_error.innerHTML = "This field is required";
        error_year.classList.add('label_input_error');
        year_in.classList.add('border_input_error');
        validation_Passed = false;
    }


    if (validation_Passed) {
        if (year_in.value <= 2023) {
            validation_Passed = true;
        } else {
            year_error.innerHTML = "Must be valid year";
            error_year.classList.add('label_input_error');
            year_in.classList.add('border_input_error');
            validation_Passed = false;
        }

        if (day_in.value < 1 || day_in.value > 31) {
            console.log(" value of day:" + day_in.value + " failed");
            day_error.innerHTML = "Must be valid day";
            error_day.classList.add('label_input_error');
            day_in.classList.add('border_input_error');
            validation_Passed = false;
        }

        if (month_in.value > 0 && month_in.value < 13) {
            if (days_in_month[parseInt(month_in.value) - 1] >= day_in.value) {
                validation_Passed = true;
            } else {
                day_error.innerHTML = "Must be valid day";
                error_day.classList.add('label_input_error');
                day_in.classList.add('border_input_error');
                validation_Passed = false;
            }

        } else {
            month_error.innerHTML = "Must be valid month";
            error_month.classList.add('label_input_error');
            month_in.classList.add('border_input_error');
            validation_Passed = false;
        }
    }

    if (validation_Passed) {

        const start_date = new Date(parseInt(year_in.value) + "/" + parseInt(month_in.value) + "/" + parseInt(day_in.value));
        const end_date = new Date();

        // Make sure that the date the user entered is less than today's date
        if (start_date >= end_date) {
            day_error.innerHTML = "Must be valid day";
            error_day.classList.add('label_input_error');
            day_in.classList.add('border_input_error');

            month_error.innerHTML = "Must be valid month";
            error_month.classList.add('label_input_error');
            month_in.classList.add('border_input_error');
            validation_Passed = false;

            // The user entered date is less than today's date
        } else {

            const mstart_day = parseInt(day_in.value);
            const mstart_month = parseInt(month_in.value);
            const mstart_year = parseInt(year_in.value);

            const mend_day = end_date.getDate();
            const mend_month = end_date.getMonth() + 1;
            const mend_year = end_date.getFullYear();

            let year_duration = mend_year - mstart_year;
            let month_duration = mend_month - mstart_month;

            if (month_duration < 0) {
                year_duration--;
                month_duration += 12;
            }
            let day_duration = mend_day - mstart_day;

            if (day_duration < 0) {
                if (month_duration > 0) {
                    month_duration--;
                } else {
                    year_duration--;
                    month_duration = 11;
                }
                day_duration += days_in_month[mend_month - 1];

            }

            animateResultCount(year_duration, "year_output");
            animateResultCount(month_duration, "month_output");
            animateResultCount(day_duration, "day_output");

        }
    }
}


function animateResultCount(target, elem) {
    var i = 0;
    if (i <= target) {
        var interval = setInterval(function () {
            document.getElementById(elem).innerHTML = i;
            if (i >= target) {
                clearInterval(interval);
                return;
            }
            i++;
        }, 40);
    }
}
