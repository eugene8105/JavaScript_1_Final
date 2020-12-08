
$(document).ready(function () {

    // event handlers
    $("#tabs a").click(showTab);


    // other functions
    function showTab(event) {
        event.preventDefault();
        $(this).tab("show");
    }


    // start form
    var myRules = {

        salary: {
            required: true,
            min: 0,
            max: 2000000,
            digits: true
        },

        credit: {
            required: true,
            min: 300,
            max: 850,
            digits: true
        },

        months: {
            required: true,
            min: 0,
            max: 600,
            digits: true
        }

    };

    var myMessages = {
        salary: {
            required: "Salary is required.",
            min: "Can not be negotiv.",
            max: "Maximum is 2,000,000.",
            digits: "Must be a whole number"
        },

        credit: {
            equired: "Need your credit score.",
            min: "Minimum is 300.",
            max: "Maximum is 850.",
            digits: "Must be a whole number"
        },
        months: {
            required: "true",
            min: "Minimum 0",
            max: "Maximum monthes can be no more then 600",
            digits: "Must be a whole number"
        }
    };

    function loanApprov() {

        var approved = false;

        var decision = " ";

        // get salary
        var salary = parseInt($("#salary").val());

        // get credit score
        var credit = parseInt($("#credit").val());

        // get how long at current job
        var months = parseInt($("#months").val());

        // calculation - determine loan approval
        if (salary >= 40000) {
            if (credit >= 600) {
                approved = true;
            } else {
                if (months > 12) {
                    approved = true;
                } else {
                    approved = false;
                }
            }
        } else {
            if (credit >= 600) {
                if (months > 12) {
                    approved = true;
                } else {
                    approved = false;
                }
            } else {
                approved = false;
            }
        }

        if (approved === true) {
            decision = "can";
        } else {
            decision = "can not";
        }


        // output on the screen
        $("#message").text(`You ${decision} get a loan from Diamond Lending Bank.`);

        // $("p.output").show();

    }

    $("form").validate({
        submitHandler: loanApprov,
        rules: myRules,
        message: myMessages
    });
    // end of the form


});