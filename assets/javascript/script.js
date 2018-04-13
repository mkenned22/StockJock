$(document).ready(function(){

    var key = 'UPT0YN3AFDMRA5ZY' // valid license key for AlphaVantage
    getCompanies();

    function getCompanies(){
        var requestURL = 'https://mkenned22.github.io/StockJock/assets/data/companies.json';
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function() {
            companies = request.response;
            console.log(companies);
        }
    }

    // creates the Welcome Page
    function goWelcomePage(){
        
        var div = $("<div>").attr("id","center");
        var img = $("<img>").attr("src","assets/images/logo.png");
        img.attr("id","logo");
        div.append(img);

        div.append("<br><br>");

        var button = $("<button>").attr("id","getStartedButton");
        button.text("Get Started");
        button.addClass("btn btn-success");
        div.append(button);

        $("body").append(div)
    }

    // on click event for the "Get Started" button
    $(document).on("click", "#getStartedButton", function () {
        goGetStartedPage(); // go to the get started page
    });

    // creates Get Started Page
    function goGetStartedPage(){

        $("body").text(""); // clears out the body
        
        var div = $("<div>");
        div.attr("id","center");
        
        var form = $("<form>"); // form
        form.attr("id","nameForm");

        var label = $("<label>"); // label
        label.attr("for","username");
        label.text("Please enter your username:");
        form.append(label);
        form.append($("<br>"));

        var input = $("<input>"); // input filed
        input.attr("type","text");
        input.attr("name","username");
        input.attr("id","username");
        input.attr("placeholder","here");
        form.append(input);

        var button = $("<button>"); // submit button
        button.attr("id","submitButton");
        button.attr("disabled", "disabled");
        button.addClass("btn btn-success");
        button.text("Let's Go!")

        div.append(form);
        div.append(button);

        $("body").append(div); // append elements to the body
    }

    // validates the username that is entered
    // must be more than one character
    function validateUsername() {
        if ($("#username").val().length > 0) {
            $("#submitButton").removeAttr("disabled");
        }
        else {
            $("#submitButton").prop("disabled", true)
        }
    }

    // on key up validate the username
    $(document).on("keyup", "#username", function () {
        var name = $("#username").val()
        validateUsername();
    });

    $(document).on("keypress", "#username", function (e) {
        if (e.which == 13) {//Enter key pressed
            goStockPage();//Trigger search button click event
        }
    });

    // on click event for submit button to go to Stock Page
    $(document).on("click", "#submitButton", function () {
        goStockPage(); // go to stock page
    });

    // Create stock page
    function goStockPage(){

        $("body").text(""); // clears body

        var container = $("<div>") // container
        container.addClass("container");

        var row = $("<div>"); // row
        row.addClass("row");

        var col1 = $("<div>"); // col1 
        col1.addClass("col-md-6");

        var col2 = $("<div>"); // col2
        col2.addClass("col-md-6");

        row.append(col1); // adding columns to rows
        row.append(col2);
        container.append(row); // adding row to container

        // begin col1
        // col1 includes all of the stock data
        var inputData = $("<div>"); // creating siv for the form
        inputData.attr("id","inputData");

        var form = $("<form>"); // form
        form.attr("id","stockForm");

        var label = $("<label>"); // label
        label.attr("for","stockname");
        label.text("Please enter your stock ticker or company name:");
        form.append(label);

        var input = $("<input>"); // input
        input.attr("type","text");
        input.attr("name","stockname");
        input.attr("id","stockname");
        input.attr("placeholder","here");
        form.append(input);

        var button = $("<button>"); // button
        button.attr("id","stockButton");
        button.attr("disabled", "disabled");
        button.addClass("btn btn-success");
        button.text("Get Stock Info");

        inputData.append(form); // adding elements to input data div
        inputData.append(label);
        inputData.append(input);
        inputData.append(button); 
        col1.append(inputData);
        col1.append($("<div>").attr("id","stockValidation"));

        col1.append("<br><br>");

        var data1 = $("<div>"); // adding divs for stock data
        data1.attr("id","data1");

        var graph = $("<div>");
        graph.attr("id","graph");
    
        var data2 = $("<div>");
        data2.attr("id","data2");

        var idloading = $("<img>");
        idloading.attr("id","idloading");

        col1.append(data1);
        col1.append(idloading);
        col1.append(graph);
        col1.append(data2);

        // end col1
        // begin col2
        // col2 contains all of the news data

        var news = $("<div>"); // news div
        news.attr("id","news");

        var form = $("<form>"); // form
        form.attr("id","newsForm");
        form.append($("<h1>").text("Your News Search"));

        news.append(form);

        var buttonDiv = $("<div>");
        buttonDiv.attr("id","buttons");

        var button = $("<button>"); //button
        button.attr("id","searchData");
        button.addClass("btn btn-success");
        button.text("Search");
        
        var input = $("<input>"); //input
        input.attr("type","text");
        input.attr("id","searchTerm");
        input.attr("name","searchTerm");
        input.attr("placeholder","Enter your search here...");

        buttonDiv.append(button); // add button and input to button div and form
        buttonDiv.append(input);
        form.append(buttonDiv);

        var articles = $("<div>"); // create landing pad for articles from AJAX call
        articles.attr("id","article_search_appears")
        form.append(articles);

        col2.append(form); // add the form to col2

        // creating video div
        var topVideo = $("<div>");
        topVideo.attr("id","todayVideo");
        topVideo.append($("<h1>").text("Today's Top Video"));
        
        var idplayer = $("<div>");
        idplayer.attr("id","idplayer");
        idplayer.css("width", "605px");
        idplayer.css("height","505px");
        idplayer.css("overflow","hidden");
        topVideo.append(idplayer);
        
        var idvideoframe = $("<iframe>");
        idvideoframe.attr("id","idvideoframe");
        idvideoframe.css("width", "100%");
        idvideoframe.css("height","450px");
        idvideoframe.css("frameBorder","0");
        idvideoframe.css("allowfullscreen", "false");
        idvideoframe.attr("scrolling", "no");
        idvideoframe.css("position", "relative");
        idvideoframe.css("top", "-125px");
        idvideoframe.css("left", "-20px");
        idvideoframe.css("border", "5px solid white");
        idvideoframe.attr("src","https://www.cnbc.com/top-video/");
        idplayer.append(idvideoframe);

        col2.append(topVideo);
        
        $("body").append(container); // add the bootstrap container to the body

        populateArticles(); // calls the function to populate top 3 news articles by default

    }

    // validate that the stock name is more than one character
    // this will get updated
    function validateStockName() {

        if ($("#stockname").val().length > 0) {
            $("#stockButton").removeAttr("disabled");
        }
        else {
            $("#stockButton").prop("disabled", true)
        }
    }


// var requestURL = 'https://mkenned22.github.io/StockJock/assets/data/companies.json';
//     var request = new XMLHttpRequest();
//     request.open('GET', requestURL);
//     request.responseType = 'json';
// request.send();
// request.onload = function() {
//   var companies = request.response;
//   console.log(companies)

    // on key event to validate the stock name
    $(document).on("keyup", "#stockname", function () {
        var name = $("#stockname").val()
        validateStockName();

    });
    
    // add stock buttons function
    function addStockButton(){
        ticker = $("#stockname").val();
        for(i=0;i<companies.length;i++){
            if(companies[i].Symbol == ticker.toUpperCase()){
                //$("#stockValidation").text("");
                company = companies[i].Name;
                var button = $("<button>");
                button.attr("id",ticker);
                button.attr("name", company);
                button.addClass("companyButtons")
                button.text(company);
                $("#inputData").append(button);
                //populateStockArticles(company); // hard coded for now
                //getStockData($("#stockname").val(), key);
                $("#stockname").val("");
            }
            else {
                $("#stockname").val("");
                //$("#stockValidation").text("Not a valid ticker").css("color","red");

            }
        }
    }

    // on click event to call addStockButton function
    $(document).on("click", "#stockButton", function () {
        addStockButton();
    });

    $(document).on("keypress", "#stockname", function (e) {
        if (e.which == 13) {//Enter key pressed
            addStockButton();//Trigger search button click event
        }
    });

    // on click event associated to all ticker buttons
    $(document).on("click", ".companyButtons", function () {
        company = this.name;
        getStockData(this.id, key);
        populateStockArticles(this.id);
    });
        // display loading gif function
        function displayLoading(){
            $("#graph").empty();
            $("#data1").empty();
            $("#data2").empty();
            $("#idloading").css("width", "200px");
            $("#idloading").css("height","300px");
            $("#idloading").attr("src", "assets/images/loading.gif");
        }
        function clearLoading(){
            //$("#idloading").removeAttr("src");
            $("#idloading").css("width", "0px");
            $("#idloading").css("height","0px");
        }

    // function to get stock data 
    // will subsequently call functions to clear the page, display the graph, and display the current stock info
    function getStockData(symbol,apikey){
        var queryURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=1min&outputsize=compact'
        queryURL = queryURL + '&symbol=' + symbol + '&apikey=' + apikey;

    // First clear existing graph then show loading gif
    displayLoading();

        jQuery.ajax({
            type: "GET",
            url: queryURL,
        }).done(function (response) {
            var data = response["Time Series (1min)"];
            //clear loading div
            clearLoading();
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

        var queryURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=compact'
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
            div.append("<h5>"+company+"</h5>");
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
            if(diff < 0){span.css("color","red")}
            else{span.css("color","green")}
            span.css("font-size","18px");
            span.text("  "+diff.toFixed(2)); // difference from previous close
            div.append(span);

            var percent  = ((parseFloat(dailyPoint["4. close"])-parseFloat(prevPoint["4. close"]))/parseFloat(prevPoint["4. close"]))*100
            var span = $("<span>");
            if(percent < 0){span.css("color","red")}
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

            $("#data2").append($("<div>").html("<strong>10d AVG</strong>: " +getAverageforXDays(dailyPoints,10).toFixed(2)+"  "));
            $("#data2").append($("<div>").html("<strong>5d AVG</strong>: " +getAverageforXDays(dailyPoints,5).toFixed(2)+"  "));
            $("#data2").append($("<div>").html("<strong>3d AVG</strong>: " +getAverageforXDays(dailyPoints,3).toFixed(2)+"  "));

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
            var article = $("<div>").html('<a href="'+results[i].url+'"><div class="row"><div class="col-md-12"><div class="thumbnail"><img class="thumbnailImg" src="'+results[i].urlToImage+'"><div class="caption"><h3>'+results[i].title+'</h3><p>'+results[i].description+'</p></div></div></div></div></a>');

            var j = i + 1;
            //var p = $("<div>").html("<img src="+ results[i].urlToImage +"></img>")
            //var p1 = $("<div>").text("Article " + j + ": " + results[i].title);
            //var p2 = $("<div>").text("Descripion: " + results[i].description);
            //var p3 = $("<div>").text("Author: " + results[i].author);
            //var p4 = $("<div>").text("Published: " + results[i].publishedAt);
            //var a = $("<a>").text("Click Here");
            //a.attr("href",results[i].url);
            //a.attr("target","blank");   
            //div.append(p);
            div.append(article);         
            //div.append(p1);
            //div.append(p2);
            //div.append(p3);
            //div.append(p4);
            //div.append(a);
            $("#article_search_appears").append(div);
            $("#article_search_appears").append($("<br>"));
        }    
    });      //this finishes the "document ready - default headlines" ajax call

    }

    $(document).on("click", "#searchData", function (event) {
        event.preventDefault();
        var search = $("#searchTerm").val();
        populateStockArticles(search);
    });     //this finishes the "on-click" ajax call

    function populateDefaultArticles() {

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
        }).done(function (response) {
            console.log(response);
            console.log(response.articles);
            var results = response.articles;
            for (i = 0; i < 3; i++) {
                var div = $("<div>");
                var article = $("<div>").html('<a href="'+results[i].url+'"><div class="row"><div class="col-md-12"><div class="thumbnail"><img class="thumbnailImg" src="'+results[i].urlToImage+'"><div class="caption"><h3>'+results[i].title+'</h3><p>'+results[i].description+'</p></div></div></div></div></a>');

                var j = i + 1;
                // var p1 = $("<div>").text("Article " + j + ": " + results[i].title);
                // var p2 = $("<div>").text("Descripion: " + results[i].description);
                // var p3 = $("<div>").text("Author: " + results[i].author);
                // var p4 = $("<div>").text("Published: " + results[i].publishedAt);
                // var a = $("<a>").text("Click Here");
                // a.attr("href", results[i].url);
                // a.attr("target", "blank");
                // div.append(p1);
                // div.append(p2);
                // div.append(p3);
                // div.append(p4);
                div.append(article);
                $("#article_search_appears").append(div);
                $("#article_search_appears").append($("<br>"));
            }
        });      //this finishes the "document ready - default headlines" ajax call

    }

    function populateStockArticles(company){
        
        //company = "Facebook" // hard coded for now

        var requestParameters = "&language=en&sortBy=popularity&sources=cnbc";
        var cnbcsearchKey = "35f3a4574f3e46b5b91902719212dc95";
        var queryURL = "https://newsapi.org/v2/everything?q=" + company + requestParameters
            + "&apikey=" + cnbcsearchKey;

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            console.log(response.articles);
            var results = response.articles;
            $("#article_search_appears").empty();
            for (i = 0; i < 3; i++) {
                var div = $("<div>");
                var article = $("<div>").html('<a href="'+results[i].url+'"><div class="row"><div class="col-md-12"><div class="thumbnail"><img class="thumbnailImg" src="'+results[i].urlToImage+'"><div class="caption"><h3>'+results[i].title+'</h3><p>'+results[i].description+'</p></div></div></div></div></a>');

                var j = i + 1;
                // var p1 = $("<div>").text("Article " + j + ": " + results[i].title);
                // var p2 = $("<div>").text("Descripion: " + results[i].description);
                // var p3 = $("<div>").text("Author: " + results[i].author);
                // var p4 = $("<div>").text("Published: " + results[i].publishedAt);
                // var a = $("<a>").text("Click Here");
                // a.attr("href", results[i].url);
                // a.attr("target", "blank");
                // div.append(p1);
                // div.append(p2);
                // div.append(p3);
                // div.append(p4);
                div.append(article);
                $("#article_search_appears").append(div);
                $("#article_search_appears").append($("<br>"));
            }
        });
    }
    

    goWelcomePage();

}); //document load


