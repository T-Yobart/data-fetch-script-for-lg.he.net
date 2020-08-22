///////////////////////////
/// inclusion of Jquery ///
///////////////////////////
var script = document.createElement('script'); 
 
script.src = '//code.jquery.com/jquery-1.11.0.min.js'; 
document.getElementsByTagName('head')[0].appendChild(script); 

///////////////////////////
///    variables init   ///
///////////////////////////

//outputs
var neighbors= []; // ASN of all found BGP neighbors
var duplicates= []; // ASN with multiple BGP sessions
var i =0;   // number of sent requests

//script variables
var table;  //Output of Latest POST request
var doc;    //HTML Document parsed from table
var parser = new DOMParser(); //initialization of string to HTML parser
var routers =$("#lg_routers").find("ul ul li input"); //fetching all input nodes relating routers

///////////////////////////
///    sub functions    ///
///////////////////////////

function sleep(ms) {
    //function used to emulate a delay
    return new Promise(resolve => setTimeout(resolve, ms));
};

function sort (data){
    //parsing of the received POST request to fetch the DOM
    //and sorting the output into output arrays

    table = data;
    doc = parser.parseFromString(table, "text/html");

    $(doc).find(".tablesorter tbody tr ").each(function(){
        var asn = $(this).find("td:eq(1)").text();
        if(!neighbors.includes(asn) && asn != ""){
            neighbors.push(asn);
        }else{
            if(!duplicates.includes(asn) && asn != ""){
                duplicates.push(asn);
            };
        };
    });
};

function send (){  
    //used to asynchronously send a request to the server

    var form = $("form");
    var url = form.attr('action');

    $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(), // serializes the form's elements.
        success: function(data){
            sort(data);
        }
    })
};

///////////////////////////
///        main         ///
///////////////////////////
$(document).ready(async function(){

    //selection of the command to be used
    $("#command_bgpsummary6").prop("checked", true);
    
    //deselecting all routers
    $(routers).each(function(){
        $(this).prop( "checked", false );
    });
    
    //main loop
    for (var router; i < routers.length; i++) {
        //selecting router sending request and waiting for
        //the cooldown to en in order to continue iteration

        router = routers[i];
        $(router).prop( "checked", true );
        send();
        $(router).prop( "checked", false );
        await sleep(60000);
    };
  
}); 