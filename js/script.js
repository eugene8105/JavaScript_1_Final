
$(document).ready(function () {

    // event handlers
    $("#tabs a").click(showTab);


    // other functions
    function showTab(event) {
        event.preventDefault();
        $(this).tab("show");
    }



});