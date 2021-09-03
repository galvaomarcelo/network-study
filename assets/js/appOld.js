var logHeader = "participantId, route, type, name, value, answer, mapA, mapB, trueValue, figure, timeStamp \r\n";
var logArray = [];
var logText;

var routeName, participantId;

var allRoutesArray = ["route1", "route2", "route3", "route4", "route5"];

var routeAnswersLog;

var mapA, mapB;

var routeIndex = 0;

var semanticScale1 = ["On map \"A\" is much better.", "On map \"A\" is better.", "No preference.", "On map \"B\"is better.", "On map \"B \"is much better."];

function loadExperiment(routeName) {


  logText = logHeader;
  var totalOfRoutes;
  if (routeName == "all") {
    allRoutesArray = ["route1", "route2", "route3", "route4", "route5"];
    totalOfRoutes = allRoutesArray.length
    routeName = allRoutesArray[0];
  } else {
    allRoutesArray = [routeName];
    totalOfRoutes = 1;
  }


  questionsPerRoute = 3;
  console.log(totalOfRoutes);
  logArray = new Array();
  logIndex = 0;
  loadRouteQuery(routeName)

}



function loadRouteQuery(routeName) {

  $("#start-message").hide();

  mapA = "NRS";
  mapB = "NS";

  if(mapA == "NRS"){
    var fig0 = "assets/img/" + routeName + ".png";
    var fig1a = "assets/img/" + routeName + "Q1aNRS.png";
    var fig2a = "assets/img/" + routeName + "Q2aNRS.png";
    var fig3a1 = "assets/img/" + routeName + "Q3a.png";
    var fig3a2 = "assets/img/" + routeName + "Q3aNRS.png";
  }


  $("#fig0").attr("src", fig0);
  $("#fig1a").attr("src", fig1a);
  $("#fig2a").attr("src", fig2a);
  $("#fig3a1").attr("src", fig3a1);

  var paintCanvas3a2 = document.getElementById('q3a-draw-canvas');
  loadPaintCanvas(fig3a2, paintCanvas3a2);

  $("#main-route-figure").show();
  $(".question-container").attr("style", "display: grid;")



  routeAnswersLog = {
    Q1a: undefined,
    Q2a: undefined,
    Q3a: undefined
  };


}


function loadPaintCanvas(figureURL, paintCanvas) {

  var createdImage = backgroundImage(figureURL);
  //wait till image is loaded then draw canvas
  createdImage.onload = function() {

    var context = paintCanvas.getContext("2d");
    context.clearRect(0, 0, paintCanvas.width, paintCanvas.height);

    paintCanvas.width = createdImage.width;
    paintCanvas.height = createdImage.height;

    context.drawImage(createdImage, 0, 0);

    context.strokeStyle = "#e58c10";
    context.lineWidth = 3;

  }


}

function backgroundImage(figureURL) {
  var background = new Image();
  background.src = figureURL;

  return background;
}


function createQuestionLog(type, name, value, answer, figure, time) {
  if(mapA == "NS"){
    trueValue = value - 2;
  }
  else if(mapA == "NRS"){
    trueValue = (4 - value) - 2;
  }
  var log = {
    participantId: participantId,
    routeName: routeName,
    type: type,
    name: name,
    value: value,
    answer: answer,
    mapA: mapA,
    mapB: mapB,
    trueValue: trueValue,
    figure: figure,
    time: time
  };

  return log;
}

function allAnswered(arrayOfLogs) {
  for (var i = 0; i < arrayOfLogs.length; i++) {
    if (!arrayOfLogs[i]) {
      return false;
    }
  }
  return true;
}



function routeQuestionsAswered(log) {
  for (var i = 0; i < log.length; i++) {


    if (log[i] == undefined) {
      return false;
    }
  }
  return true;

}

function saveRouteLogAndLoadNextRoute() {

  allAnswerd = false;
  if (routeAnswersLog.Q1a == undefined)
    window.alert("please answer Q1a");
  else if (routeAnswersLog.Q2a == undefined)
    window.alert("please answer Q2a");
  else if (routeAnswersLog.Q3a == undefined)
    window.alert("please answer Q3a");
  else allAnswerd = true;


  if (allAnswerd) {
    logArray.push(routeAnswersLog.Q1a);
    logArray.push(routeAnswersLog.Q2a);
    logArray.push(routeAnswersLog.Q3a);

    routeIndex++;
    if (routeIndex < allRoutesArray.length - 1) {
      loadRouteQuery(allRoutesArray[routeIndex]);
    } else {
      window.alert("You finish the experiment. Save the you answer files. ");
      saveLogFile()
    }
  }

}

function saveLogFile() {

  /*Log data structure*/
  /* var  log = {
     participantId: participantId,
     routeName: routeName,
     type: type,
     name: name,
     value: q1aValue,
     answer: q1aAnswer,
     mapA: undefined,
     mapB: undefined,
     figure: figure,
     time: time
   };*/
  for (var i = 0; i < logArray.length; i++) {
    /*var logHeader = "participantId, route, type, name, value, answer, mapA, mapB, figure, timeStamp \r\n";*/
    var interationLog = "" + logArray[i].participantId + ", " + logArray[i].routeName + ", " + logArray[i].type + ", " + logArray[i].name + ", " + logArray[i].value + ", " + logArray[i].answer + ", " + logArray[i].mapA + ", " + logArray[i].mapB + ", " + logArray[i].trueValue + ", " + logArray[i].figure + ", " + logArray[i].time;

    interationLog += "\r\n";
    //console.log(interationLog);
    logText = logText.concat(interationLog);
  }



  var logSubmitTime = new Date();

  console.log(logText);
  var blob = new Blob([logText], {
    type: "text/plain;charset=utf-8"
  });

  var fileName = "networkstudy".concat("-").concat(participantId).concat("-").concat(logSubmitTime.toISOString().slice(0, 19)).concat(".csv");

  saveAs(blob, fileName);
}



/* Document Ready */
$(document).ready(function() {
  var startTime = new Date();
  // startTime = "" + startTime;
  // startTime = startTime.substr(-8)
  participantId = "P" + startTime.getTime()
  participantId = participantId.slice()
  $("#participant-tb").val("P" + startTime.getTime());
  $(window).resize(function() {

  });


  /********LOAD BUTTON************************/
  $("#load-btn").click(function() {
    routeName = $("#route-video-db").val();
    participantId = $("#participant-tb").val();


    instructionsURL = $("#route-video-db").val().slice(0, 7) + ".csv";



    logText = logHeader;

    loadExperiment(routeName);
    $('#sidebar').hide();


  });


  $("#sidebar-toggle-btn").click(function() {
    $("#sidebar").toggle();
    /*  google.maps.event.trigger(map, "resize");*/
    return false;
  });

  $("#list-btn").click(function() {

    $('#sidebar').toggle();

    return false;
  });

  $("#sidebar-hide-btn").click(function() {
    $('#sidebar').hide();
    /*  google.maps.event.trigger(map, "resize");*/
  });

  $("#full-extent-btn").click(function() {

    return false;
  });

  /**Q1a**/
  $("#q1a-slider").on('input', function(e) {
    var value = $("#q1a-slider").val();

    $("#q1a-value").text(semanticScale1[value]);

  });
  $("#q1a-btn").click(function() {

    var value = $("#q1a-slider").val();
    console.log('Q1a value: ' + value);
    var answer = $("#q1a-value").text();

    var answerTime = new Date();
    var questionLog = createQuestionLog("Q1", "Q1a", value, answer, undefined, answerTime.getTime());
    routeAnswersLog.Q1a = questionLog;
    $("#q1a-window").hide();
    $("#q1a-answer-again-container").show();

  });
  $("#q1a-answer-again-btn").click(function() {
    routeAnswersLog.Q1a = undefined;
    console.log("answer again");
    $("#q1a-answer-again-container").hide();
    $("#q1a-window").show();
  });

  /**Q2a**/
  $("#q2a-slider").on('input', function(e) {
    var val = $("#q2a-slider").val();
    $("#q2a-value").text(semanticScale1[val]);
  });
  $("#q2a-btn").click(function() {
    var value = $("#q2a-slider").val();
    console.log('Q2a value: ' + value);
    var answer = $("#q2a-value").text();
    var answerTime = new Date();
    var questionLog = createQuestionLog("Q2", "Q2a", value, answer, undefined, answerTime.getTime());
    routeAnswersLog.Q2a = questionLog;
    $("#q2a-window").hide();
    $("#q2a-answer-again-container").show();

  });
  $("#q2a-answer-again-btn").click(function() {
    routeAnswersLog.Q2a = undefined;
    console.log("answer again");
    $("#q2a-answer-again-container").hide();
    $("#q2a-window").show();
  });



  /**Q3a**/
  $("#q3a-slider").on('input', function(e) {
    var val = $("#q3a-slider").val();
    $("#q3a-value").text(semanticScale1[val]);
  });
  $("#q3a-btn").click(function() {
    var value = $("#q3a-slider").val();
    console.log('Q3a value: ' + value);
    var answer = $("#q3a-value").text();
    var answerTime = new Date();
    var figureName = "" + participantId + routeName + "Q3a" + ".png"
    var questionLog = createQuestionLog("Q3", "Q3a", value, answer, figureName, answerTime.getTime());
    routeAnswersLog.Q3a = questionLog;


    var paintCanvas3a2 = document.getElementById('q3a-draw-canvas');
    paintCanvas3a2.toBlob(function(blob) {
      saveAs(blob, figureName);
    });

    $("#q3a-window").hide();
    $("#q3a-answer-again-container").show();

  });
  $("#q3a-answer-again-btn").click(function() {
    routeAnswersLog.Q3a = undefined;
    console.log("answer again");
    $("#q3a-answer-again-container").hide();
    $("#q3a-window").show();
  });
  $("#clear-btn3a").click(function() {
    var fig3a2 = "assets/img/" + routeName + "Q3a.png";
    var paintCanvas3a2 = document.getElementById('q3a-draw-canvas');
    loadPaintCanvas(fig3a2, paintCanvas3a2);

  });





  $("#next-route-btn").click(function() {

    saveRouteLogAndLoadNextRoute();

  });


  $("#submit-btn").click(function() {

  });




  //const paintCanvas = document.querySelector( '.js-paint' );
  var paintCanvas3a2 = document.getElementById('q3a-draw-canvas');
  //alert(c.height + ' ' + c.width);

  //alert(c.height + ' ' + c.width);
  const context = paintCanvas3a2.getContext('2d');
  context.lineCap = 'round';

  // var background = new Image();
  //   background.src = "assets/img/markstructuresample.png";
  //
  //   paintCanvas.height = background.height;
  //   paintCanvas.width = background.width;
  //
  //   context.drawImage(background,0,0);

  //Color picker and pen width
  // const colorPicker = document.querySelector( '.js-color-picker');
  //
  // colorPicker.addEventListener( 'change', event => {
  //     console.log(event.target.value);
  //     context.strokeStyle = event.target.value;
  // } );
  //
  // const lineWidthRange = document.querySelector( '.js-line-range' );
  // const lineWidthLabel = document.querySelector( '.js-range-value' );
  //
  // lineWidthRange.addEventListener( 'input', event => {
  //     const width = event.target.value;
  //     lineWidthLabel.innerHTML = width;
  //     context.lineWidth = width;
  // } );
  context.strokeStyle = "#e58c10";
  context.lineWidth = 3;
  let x = 0,
    y = 0;
  let isMouseDown = false;

  const stopDrawing = () => {
    isMouseDown = false;
  }
  const startDrawing = event => {
    isMouseDown = true;
    [x, y] = [event.offsetX, event.offsetY];
  }
  const drawLine = event => {
    if (isMouseDown) {
      const newX = event.offsetX;
      const newY = event.offsetY;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(newX, newY);
      context.stroke();
      //[x, y] = [newX, newY];
      x = newX;
      y = newY;
    }
  }

  paintCanvas3a2.addEventListener('mousedown', startDrawing);
  paintCanvas3a2.addEventListener('mousemove', drawLine);
  paintCanvas3a2.addEventListener('mouseup', stopDrawing);
  paintCanvas3a2.addEventListener('mouseout', stopDrawing);







}); //end getdocument ready
