
$(document).ready(function () {

    // event handlers
    $("#tabs a").click(showTab);
    $("#calculateButton").click(calculateMonthlyPayment);

    // $("#displayChart").click(testChart);

    // other functions
    function showTab(event) {
        event.preventDefault();
        $(this).tab("show");
    }

    var orgMonthlyPayment = 0;
    var monthsMortgage = 0;
    // var month = 0;
    // var newMonthlyPayment = 0;
    var convertInterestRate = 0;
    var loanAmount = 0;

    var amorPaymentsSchedule = [];
    var amorPayMonth = {};

    // start


    //end

    // display amortization schedule from an array
    function displayAmortizSchedule() {

        amorPaymentsSchedule.forEach(function (amorMonth) {

            $("#columnOne").append(`${amorMonth.month} <br>`);

            $("#columnTwo").append(`$${amorMonth.interest.toFixed(2)} <br>`);

            $("#columnThree").append(`$${amorMonth.principal.toFixed(2)} <br>`);
            console.log(amorMonth.month, amorMonth.interest, amorMonth.principal);
        })

        runChart();

    }

    function amortizationSchedule() {

        for (var i = 1; i < monthsMortgage; i++) {

            var interestPaid = (loanAmount * convertInterestRate) / 12
            var principalPaid = orgMonthlyPayment - interestPaid;
            loanAmount = loanAmount - principalPaid;

            amorPayMonth = {
                month: i,
                interest: interestPaid,
                principal: principalPaid
            }
            amorPaymentsSchedule.push(amorPayMonth);
        }

        console.log(amorPaymentsSchedule);

        displayAmortizSchedule();
    }

    // start

    function runChart() {

        var dataPoints = [];

        for (var i = 0; i < amorPaymentsSchedule.length; i++) {
            dataPoints.push({ "label": amorPaymentsSchedule[i].month, y: amorPaymentsSchedule[i].principal })
        }

        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "light1", // "light2", "dark1", "dark2"
            animationEnabled: false, // change to true		
            title: {
                text: "Morgage Amortization"
            },

            data: [
                {
                    type: "column",
                    dataPoints: dataPoints
                }
            ]
        });
        chart.render();

        explanation();

    }

    function explanation() {
        $("#monthlyPayment").text(`Your monthly payment is $${orgMonthlyPayment.toFixed(2)}.`)
        $("#chart").html(`As you can see in the beginning, a big part of your payment will go toward the interest, not the principal.<br>
        Chart is showing how principal payments increase with ongoing months.`)
    }

    // edn

    function calculateMonthlyPayment() {


        // get loanAmount
        loanAmount = parseFloat($("#loanAmount").val());
        // get interest rate
        var interestRate = parseFloat($("#interestRate").val())

        convertInterestRate = interestRate / 100;
        // get morgage term in years - convert into monthes
        var yearsMorgage = parseInt($("#yearsMorgage").val());
        // convert years to a monthes
        monthsMortgage = yearsMorgage * 12;

        // calculat monthly payment

        // calculate monthly interest rate
        var monthlyInterest = convertInterestRate / 12;

        // separating a part of fraction calculation for easy modifications and troubleshooting
        var numerator = monthlyInterest * (Math.pow(1 + monthlyInterest, monthsMortgage));
        var denominator = Math.pow(1 + monthlyInterest, monthsMortgage) - 1;

        orgMonthlyPayment = loanAmount * numerator / denominator;


        // testing output
        // with 100000 loanAmount, 6.5 interestRate and 30 years
        // monthly payment will be 632
        console.log(orgMonthlyPayment);

        $("p.amortLink").show();

        amortizationSchedule();

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
        $("#message").text(`You ${decision} get a loan with our Lending Bank.`);

        // $("p.output").show();

    }

    $("form").validate({
        submitHandler: loanApprov,
        rules: myRules,
        message: myMessages
    });
    // end of the form

});


