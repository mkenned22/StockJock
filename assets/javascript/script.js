$(document).ready(function(){

    var key = 'UPT0YN3AFDMRA5ZY'

    function goWelcomePage(){
        
        var div = $("<div>");
        div.attr("id","center");
        
        var img = $("<img>");
        img.attr("src","assets/images/logo.png");
        div.append(img);

        div.append("<br><br>");

        var button = $("<button>");
        button.attr("id","getStartedButton");
        button.click(goGetStartedPage);
        button.text("Get Started");
        div.append(button);

        $("body").append(div)

    }

    function goGetStartedPage(){

        $("body").text("");
        
        var div = $("<div>");
        div.attr("id","center");
        
        var form = $("<form>");
        form.attr("id","nameForm");

        var label = $("<label>");
        label.attr("for","username");
        label.text("Please enter your username:");
        form.append(label);

        var input = $("<input>");
        input.attr("type","text");
        input.attr("name","username");
        input.attr("id","username");
        input.attr("placeholder","here");
        form.append(input);

        var button = $("<button>");
        button.attr("id","submitButton");
        button.attr("disabled", "disabled");

        div.append(form);
        div.append(button);

        $("body").append(div);

    }

    function goStockPage(){

        $("body").text("");

        var container = $("<div>")
        container.addClass("container");

        var row = $("<div>");
        row.addClass("row");

        var col1 = $("<div>");
        col1.addClass("col-md-6");

        var col2 = $("<div>");
        col2.addClass("col-md-6");

        row.append(col1);
        row.append(col2);
        container.append(row);

        var inputData = $("<div>");
        inputData.attr("id","inputData");

        var form = $("<form>");
        form.attr("id","stockForm");

        var label = $("<label>");
        label.attr("for","stockname");
        label.text("Please enter your stock ticker or company name:");
        form.append(label);

        var input = $("<input>");
        input.attr("type","text");
        input.attr("name","stockname");
        input.attr("id","stockname");
        input.attr("placeholder","here");
        form.append(input);

        var button = $("<button>");
        button.attr("id","stockButton");
        button.attr("disabled", "disabled");

        inputData.append(form);
        inputData.append(label);
        inputData.append(input);
        inputData.append(button); 
        col1.append(inputData);

        col1.append("<br><br>");

        var data1 = $("<div>");
        data1.attr("id","data1");

        var graph = $("<div>");
        graph.attr("id","graph");
    
        var data2 = $("<div>");
        data2.attr("id","data2");

        col1.append(data1);
        col1.append(graph);
        col1.append(data2);

        // end col1
        // begin col2

        var news = $("<div>");
        news.attr("id","news");

        var form = $("<form>");
        form.attr("id","newsForm");
        form.append($("<h1>").text("Your News Search"));

        news.append(form);

        var buttonDiv = $("<div>");
        buttonDiv.attr("id","buttons");

        var button = $("<button>");
        button.attr("id","searchData");

        var input = $("<input>");
        input.attr("type","text");
        input.attr("id","searchTerm");
        input.attr("name","searchTerm");
        input.attr("placeholder","Enter your search here...");

        buttonDiv.append(button);
        buttonDiv.append(input);
        form.append(buttonDiv);

        var articles = $("<div>");
        articles.attr("id","article_search_appears")

        form.append(articles);

        col2.append(form);

        $("body").append(container);

        populateArticles();

    }

    function addStockButton(){
        userInput = $("#stockname").val();
        var button = $("<button>");
        button.attr("id",userInput);
        button.attr("class","companyButtons")
        button.text(userInput);
        $("#inputData").append(button);

    }

    function validateUsername() {
        if ($("#username").val().length > 0) {
            $("#submitButton").removeAttr("disabled");
            //$(“input[type=submit]“).prop(“disabled”, false);
            //alert(“valid”)
        }
        else {
            $("#submitButton").prop("disabled", true)
            //alert(“invalid”)
            //$(“input[type=submit]“).prop(“disabled”, true);
        }
    }

    function validateStockName() {
        if ($("#stockname").val().length > 0) {
            $("#stockButton").removeAttr("disabled");
            //$(“input[type=submit]“).prop(“disabled”, false);
            //alert(“valid”)
        }
        else {
            $("#stockButton").prop("disabled", true)
            //alert(“invalid”)
            //$(“input[type=submit]“).prop(“disabled”, true);
        }
    }


    $(document).on("keyup", "#username", function () {
        var name = $("#username").val()
        validateUsername();
    });

    $(document).on("keyup", "#stockname", function () {
        var name = $("#stockname").val()
        validateStockName();
    });

    $(document).on("click", "#submitButton", function () {
        goStockPage();
    });

    $(document).on("click", "#getStartedButton", function () {
        goGetStartedPage();
    });

    $(document).on("click", "#stockButton", function () {
        addStockButton();
    });

    $(document).on("click", ".companyButtons", function () {
        getStockData(this.id,key);
    });

    // function to get stock data 
    // will subsequently call functions to clear the page, display the graph, and display the current stock info
    function getStockData(symbol,apikey){
        var queryURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=1min&outputsize=full'
        queryURL = queryURL + '&symbol=' + symbol + '&apikey=' + apikey;

        jQuery.ajax({
            type: "GET",
            url: queryURL,
        }).done(function (response) {
            var data = response["Time Series (1min)"];
            //createPageLayout();

            displayGraph(data);
            displayStockInfo(data,symbol,key);
            localStorage.setItem(symbol,JSON.stringify(data));
        });
    }

    // function to display the graph
    // uses canvas JS
    function displayGraph(intradayPoints){
        // this value will change when I start to change the date range
        //var defaultLength = 391;

        var keys = Object.keys(intradayPoints);
        var length = Object.keys(intradayPoints).length;
        
        var data = [];
        var dataSeries = { type: "line" };
        var dataPoints = [];

        for(i=length-1;i>-1;i--){
           
            var point = intradayPoints[Object.keys(intradayPoints)[i]];
            var j = keys[i];
            j = j.substring(5,16);
            var k = point["4. close"];
            
            dataPoints.push({
                //x: new Date(j),
                label: j,
                y: parseFloat(k)
            });
        }

        dataSeries.dataPoints = dataPoints;
        data.push(dataSeries);

        //Better to construct options first and then pass it as a parameter
        var options = {
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            zoomEnabled: true,
            animationEnabled: true,
            axisX:{
                title: "Date/Time (MM-DD hh:mm)",
                labelAngle: -30
            },
            axisY: {
                includeZero: false,
                title: "USD"
            },
            data: data 
        };
        
        $("#graph").CanvasJSChart(options);
    }   

    function displayStockInfo(intradayPoints,symbol,apikey){

        var queryURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY'
        queryURL = queryURL + '&symbol=' + symbol + '&apikey=' + apikey;
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var dailyPoints = response["Time Series (Daily)"];
            var dailyPoint = dailyPoints[Object.keys(dailyPoints)[0]];
            var prevPoint = dailyPoints[Object.keys(dailyPoints)[1]];

            var keys = Object.keys(intradayPoints);
            var length = Object.keys(intradayPoints).length;
            var intradayPoint = intradayPoints[Object.keys(intradayPoints)[0]];

            // display the stock ticker and company name
            var div = $("<div>");
            div.attr("id","title");
            div.append("<h1>"+(symbol).toUpperCase()+"</h1>");
            div.append("<h5>Microsoft Corporation</h5>");
            $("#data1").append(div);

            // div to hold the stock price, difference from previous close, percent change
            var div = $("<div>");

            var span = $("<span>");
            span.css("font-size","22px");
            span.text(parseFloat(intradayPoint["4. close"]).toFixed(2)); // current price
            div.append(span);
            var span = $("<span>");
            span.css("font-size","14px");
            span.text(" USD"); // USD after stock price
            div.append(span);

            var diff = parseFloat(dailyPoint["4. close"]) - parseFloat(prevPoint["4. close"]);
            var span = $("<span>");
            if(diff < 1){span.css("color","red")}
            else{span.css("color","green")}
            span.css("font-size","18px");
            span.text("  "+diff.toFixed(2)); // difference from previous close
            div.append(span);

            var percent  = ((parseFloat(dailyPoint["4. close"])-parseFloat(prevPoint["4. close"]))/parseFloat(prevPoint["4. close"]))*100
            var span = $("<span>");
            if(percent < 1){span.css("color","red")}
            else{span.css("color","green")}
            span.css("font-size","18px");
            span.text("  ("+percent.toFixed(2)+"%)"); // percent difference from previous close
            div.append(span);

            $("#data1").append(div); // append the div to info div
            // div
            
            // div to hold the open, high, and low prices
            var div = $("<div>");
            div.attr("id","openHighLow");
            div.append($("<span>").html("<strong>Open</strong>: " +parseFloat(dailyPoint["1. open"]).toFixed(2) + "  "));
            div.append($("<span>").html("<strong>High</strong>: "+parseFloat(dailyPoint["2. high"]).toFixed(2) + "  "));
            div.append($("<span>").html("<strong>Low</strong>: "+parseFloat(dailyPoint["3. low"]).toFixed(2) + "  "));
            $("#data1").append(div);
            // div

            if(getAverageforXDays(dailyPoints,10) > getAverageforXDays(dailyPoints,5) && getAverageforXDays(dailyPoints,5) > getAverageforXDays(dailyPoints,3)){
                var trend = "Down";
            }
            else if(getAverageforXDays(dailyPoints,10) < getAverageforXDays(dailyPoints,5) && getAverageforXDays(dailyPoints,5) < getAverageforXDays(dailyPoints,3)){
                var trend = "Up";
            }
            else{
                var trend = "No Trend"
            }

            var h5 = $("<h5>");
            h5.text("Trend: ");

            var span = $("<span>");
            if(trend === "Up"){
                span.css("color","green");
            }
            else{
                div.css("color","red");
            }
            span.html(trend);
            h5.append(span);
            $("#data2").append(h5);

            $("#data2").append($("<span>").html("<strong>10d AVG</strong>: " +getAverageforXDays(dailyPoints,10).toFixed(2)+"  "));
            $("#data2").append($("<span>").html("<strong>5d AVG</strong>: " +getAverageforXDays(dailyPoints,5).toFixed(2)+"  "));
            $("#data2").append($("<span>").html("<strong>3d AVG</strong>: " +getAverageforXDays(dailyPoints,3).toFixed(2)+"  "));

            var div = $("<div>");
            div.html("<strong>Last Updated</strong>: " +keys[0]);
            $("#data2").append(div);

        }); //then
    }

    function getAverageforXDays(data,int){
        var sum=0;
        for(i=0;i<int;i++){
            var point = data[Object.keys(data)[i]];
            sum += parseFloat(point["4. close"]);
        }
        var avg = sum/int;
        return avg
    }

    function createPageLayout() {
        $("#mike").text("");

        // div
        var div1 = $("<div>");
        div1.attr("id","info");

        // div
        var div2 = $("<div>");
        div2.attr("id","graph");

        // div
        var div3 = $("<div>");
        div3.attr("id","trends");

        // column
        var column = $("<div>");
        column.addClass("col-md-12");
        column.attr("id", "content");
        column.append(div1);
        column.append(div2);
        column.append(div3);

        // row
        var row = $("<div>");
        row.addClass("row");
        $(row).append(column);

        $("#mike").append(row);
    }

    function populateArticles(){

        $("#article_search_appears").empty();
    var search = $("#searchTerm").val();
    var requestParameters = "&language=en&sortBy=popularity&sources=cnbc";
    var cnbcsearchKey = "35f3a4574f3e46b5b91902719212dc95";
    var queryURL = "https://newsapi.org/v2/top-headlines?q=" + requestParameters
       + "&apikey=" + cnbcsearchKey;

    console.log(queryURL);

      $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        console.log(response.articles);
        var results = response.articles;
        for(i=0;i<3;i++){
            var div = $("<div>");
            var j = i + 1;
            var p1 = $("<div>").text("Article " + j + ": " + results[i].title);
            var p2 = $("<div>").text("Descripion: " + results[i].description);
            var p3 = $("<div>").text("Author: " + results[i].author);
            var p4 = $("<div>").text("Published: " + results[i].publishedAt);
            var a = $("<a>").text("Click Here");
            a.attr("href",results[i].url);
            a.attr("target","blank");            
            div.append(p1);
            div.append(p2);
            div.append(p3);
            div.append(p4);
            div.append(a);
            $("#article_search_appears").append(div);
            $("#article_search_appears").append($("<br>"));
        }    
    });      //this finishes the "document ready - default headlines" ajax call

    }

    $("#searchData").on("click",function(event){
        event.preventDefault();
        //clearing div on click
        $("#article_search_appears").empty();
        var search = $("#searchTerm").val().trim();
        var requestParameters = "&language=en&sortBy=popularity&sources=cnbc";
        var cnbcsearchKey = "35f3a4574f3e46b5b91902719212dc95";
        var queryURL = "https://newsapi.org/v2/everything?q=" + search + requestParameters
           + "&apikey=" + cnbcsearchKey;
    
        console.log(queryURL);
    
          $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);
            console.log(response.articles);
            var results = response.articles;
            for(i=0;i<3;i++){
                var div = $("<div>");
                var j = i + 1;
                var p1 = $("<div>").text("Article " + j + ": " + results[i].title);
                var p2 = $("<div>").text("Descripion: " + results[i].description);
                var p3 = $("<div>").text("Author: " + results[i].author);
                var p4 = $("<div>").text("Published: " + results[i].publishedAt);
                var a = $("<a>").text("Click Here");
                a.attr("href",results[i].url);
                a.attr("target","blank");            
                div.append(p1);
                div.append(p2);
                div.append(p3);
                div.append(p4);
                div.append(a);
                $("#article_search_appears").append(div);
                $("#article_search_appears").append($("<br>"));
            }    
          });
        });     //this finishes the "on-click" ajax call
    

    goWelcomePage();

}); //document load


