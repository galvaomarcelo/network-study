var logHeader = "participantId, routeOrder, route, type, name, value, answer, mapA, mapB, figure, timeStamp, gender, age, expertise, licence \r\n";
var logArray = [];
var logText;

var routeName, participantId, gernder, age, expertise, licence;

var allRoutesArray = ["route1", "route2", "route3", "route4", "route5", "route6"];

var routeAnswersLog;

var mapA, mapB;

var routeIndex = 0;



function loadExperiment(loadRouteName) {

  routeIndex = 0;
  //$("#start-message").hide();
  $("#start-message").attr("style", "display: none;");
  var totalOfRoutes;
  if (loadRouteName == "all") {


    shuffleArray(allRoutesArray);
  } else {
    allRoutesArray = [loadRouteName];
  }

  totalOfRoutes = allRoutesArray.length

  console.log(totalOfRoutes);
  logArray = new Array();
  logIndex = 0;

  $(".demo-question-container").attr("style", "display: grid;");


  if( Math.random() >= 0.5){
    mapA = "NRS";
    mapB = "NS";
  }
  else{
    mapA = "NS";
    mapB = "NRS";
  }

  loadRouteQuery(allRoutesArray[0])

}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}



function loadRouteQuery(routeName1) {


  routeName = routeName1;



  $("input:radio").attr("checked", false);

  if( mapA == "NS"){
    mapA = "NRS";
    mapB = "NS";
  }
  else{
    mapA = "NS";
    mapB = "NRS";
  }



  var fig1a = "assets/img/" + routeName + "/" + routeName + "Q1" + mapA + ".png";
  var fig2a = "assets/img/" + routeName + "/" + routeName + "Q2a" + mapA + ".png";
  var fig2b = "assets/img/" + routeName + "/" + routeName + "Q2b" + mapA + ".png";
  var fig3a = "assets/img/" + routeName + "/" + routeName + "Q3a.png";
  var fig3b = "assets/img/" + routeName + "/" + routeName + "Q3b.png";
  var fig3base = "assets/img/" + routeName + "/" + routeName + "Q3" + mapA + ".png";




  $("#fig1a").attr("src", fig1a);
  $("#fig2a").attr("src", fig2a);
  $("#fig2b").attr("src", fig2b);
  $("#fig3a1").attr("src", fig3a);
  var paintCanvas3a2 = document.getElementById('q3a-draw-canvas');
  loadPaintCanvas(fig3base, paintCanvas3a2);
  $("#fig3b1").attr("src", fig3b);
  var paintCanvas3b2 = document.getElementById('q3b-draw-canvas');
  loadPaintCanvas(fig3base, paintCanvas3b2);


  //$(".question-container").attr("style", "display: grid;")



  routeAnswersLog = {
    Q1a: undefined,
    Q2a: undefined,
    Q2b: undefined,
    Q3a: undefined,
    Q3b: undefined
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


function createQuestionLog(type, name, value, figure, time) {

  if(value == "A"){

      trueValue = mapA;
  }
  else if(value == "B"){

      trueValue = mapB;
  }
  else {
    trueValue = value;
  }



/*var logHeader = "participantId, routeOrder, route, type, name, value, answer, mapA, mapB, figure, timeStamp, gender, age, expertise, licence \r\n"; \r\n";*/

  var log = {
    participantId: participantId,
    routeOrder: routeIndex,
    routeName: routeName,
    type: type,
    name: name,
    value: value,
    trueValue: trueValue,
    mapA: mapA,
    mapB: mapB,
    figure: figure,
    time: time,
    gender: gender,
    age: age,
    expertise: expertise,
    licence: licence
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

  if ($("#radio1").is(":checked")) {
     // do something
  }

  if (routeAnswersLog.Q1a == undefined){
    window.alert("please answer Question 1.");
    document.getElementById("q1").scrollIntoView();
    //scrollToResolver("q1");
  }
  else if (routeAnswersLog.Q2a == undefined){
    window.alert("please answer Question 2a.");
    document.getElementById("q2a").scrollIntoView();
  }
  else if (routeAnswersLog.Q2b == undefined){
    window.alert("please answer Question 2b.");
    document.getElementById("q2b").scrollIntoView();
  }
  else if (routeAnswersLog.Q3a == undefined){
    window.alert("please download Question 3a figure with you answer.");
    document.getElementById("q3a").scrollIntoView();
  }
  else if (routeAnswersLog.Q3b == undefined){
    window.alert("please download  Question 3b figure with you answer.");
    document.getElementById("q3b").scrollIntoView();
  }
  else allAnswerd = true;


  if (allAnswerd) {
    logArray.push(routeAnswersLog.Q1a);
    logArray.push(routeAnswersLog.Q2a);
    logArray.push(routeAnswersLog.Q2b);
    logArray.push(routeAnswersLog.Q3a);
    logArray.push(routeAnswersLog.Q3b);

    routeIndex++;
    if (routeIndex < allRoutesArray.length ) {
      document.getElementById("q1").scrollIntoView();
      loadRouteQuery(allRoutesArray[routeIndex]);
    } else {
      window.alert("Great, you finish the experiment! In the next step, save the data file with your answers. ");

      saveLogFile();

      $(".demo-question-container").attr("style", "display: none;");
      $(".question-container").attr("style", "display: none;");
      $("#final-message-container").attr("style", "display: grid;");

      document.getElementById("final-message-container").scrollIntoView();
    }
  }

}

function saveLogFile() {
   logText = logHeader;
  /*Log data structure*/
  /* var log = {
    participantId: participantId,
    routeName: routeName,
    type: type,
    name: name,
    value: value,
    trueValue: trueValue,
    mapA: mapA,
    mapB: mapB,
    figure: figure,
    time: time
  };
   };*/
  for (var i = 0; i < logArray.length; i++) {
    /*var logHeader = "participantId, routeOrder, route, type, name, value, answer, mapA, mapB, figure, timeStamp, gender, age, expertise, licence \r\n"; \r\n";*/
    var interationLog = "" + logArray[i].participantId + ", " + logArray[i].routeOrder + ", " + logArray[i].routeName + ", " + logArray[i].type + ", " + logArray[i].name + ", " + logArray[i].value + ", "  + logArray[i].trueValue +  ", " + logArray[i].mapA + ", " + logArray[i].mapB + ", " + logArray[i].figure + ", " + logArray[i].time+ ", " + logArray[i].gender + ", " + logArray[i].age + ", " + logArray[i].expertise + ", " + logArray[i].licence;

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


function toFullScreen(){
  console.log("to full screen");
  var elem = document.getElementsByTagName("BODY")[0];

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }

}


function confirmConsentForm() {

    if(document.getElementById('consent1').checked &&
      document.getElementById('consent2').checked &&
      document.getElementById('consent3').checked &&
      document.getElementById('consent4').checked
    ){
        document.getElementById('instruction-info-close').disabled = false;

    }




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
    var loadRouteName = $("#route-video-db").val();
    participantId = $("#participant-tb").val();

    $("#video-opening-tag").trigger('pause');
    $(".question-container").attr("style", "display: none;");


    loadExperiment(loadRouteName);
    $('#sidebar').hide();

    toFullScreen();

    $("#instruction-info").removeClass("hidden");

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
  $('input[type=radio][name=q1a]').change(function() {
      var value = this.value;
      var answerTime = new Date();

      var questionLog = createQuestionLog("Q1", "Q1a", value, undefined, answerTime.toISOString().slice(0, 19));
      routeAnswersLog.Q1a = questionLog;
  });

  $('input[type=radio][name=q2a]').change(function() {
      var value = this.value;
      var answerTime = new Date();
      var questionLog = createQuestionLog("Q2", "Q2a", value, undefined, answerTime.toISOString().slice(0, 19));
      routeAnswersLog.Q2a = questionLog;
  });

  $('input[type=radio][name=q2b]').change(function() {
      var value = this.value;
      var answerTime = new Date();
      var questionLog = createQuestionLog("Q2", "Q2b", value, undefined, answerTime.toISOString().slice(0, 19));
      routeAnswersLog.Q2b = questionLog;
  });


  $("#q3a-save-img-btn").click(function() {

    var paintCanvas3a2 = document.getElementById('q3a-draw-canvas');
    paintCanvas3a2.toBlob(function(blob) {
      saveAs(blob, figureName);
    });

    var answerTime = new Date();
    var figureName = "" + participantId + routeName + "Q3a" + ".png"
    var questionLog = createQuestionLog("Q3", "Q3a", undefined, figureName, answerTime.toISOString().slice(0, 19));
    routeAnswersLog.Q3a = questionLog;

  });
  $("#clear-btn3a").click(function() {
    var fig3base = "assets/img/" + routeName + "/" + routeName + "Q3" + mapA + ".png";
    var paintCanvas3a2 = document.getElementById('q3a-draw-canvas');
    loadPaintCanvas(fig3base, paintCanvas3a2);

  });



  $("#q3b-save-img-btn").click(function() {

    var paintCanvas3a2 = document.getElementById('q3b-draw-canvas');
    paintCanvas3a2.toBlob(function(blob) {
      saveAs(blob, figureName);
    });

    var answerTime = new Date();
    var figureName = "" + participantId + routeName + "Q3b" + ".png"
    var questionLog = createQuestionLog("Q3", "Q3b", undefined, figureName, answerTime.toISOString().slice(0, 19));
    routeAnswersLog.Q3b = questionLog;

  });
  $("#clear-btn3b").click(function() {
    var fig3base = "assets/img/" + routeName + "/" + routeName + "Q3" + mapA + ".png";
    var paintCanvas3a2 = document.getElementById('q3b-draw-canvas');
    loadPaintCanvas(fig3base, paintCanvas3a2);

  });





  $("#next-route-btn").click(function() {

    saveRouteLogAndLoadNextRoute();

  });

  $("#confirm-demo-btn").click(function() {
    gender = $("input[type='radio'][name='gender']:checked").val();
    age  = $("#age").val();
    expertise = $("input[type='radio'][name='expertise']:checked").val();
    licence = $("input[type='radio'][name='licence']:checked").val();

    console.log($("input[type='radio'][name='gender']:checked").val())


    $(".demo-question-container").attr("style", "display: none;")
    $(".question-container").attr("style", "display: grid;")

  });


  $("#submit-btn").click(function() {
    saveLogFile();

  });

  $("#full-extent-btn").click(function() {
    toFullScreen();
  });




  $("#instruction-info-close").click(function() {

    $('#instruction-info').addClass("hidden");

  });


  //const paintCanvas = document.querySelector( '.js-paint' );
  var paintCanvas3a = document.getElementById('q3a-draw-canvas');
  var paintCanvas3b = document.getElementById('q3b-draw-canvas');
  //alert(c.height + ' ' + c.width);

  //alert(c.height + ' ' + c.width);
  const contexta = paintCanvas3a.getContext('2d');
  contexta.lineCap = 'round';
  contexta.strokeStyle = "#e58c10";
  contexta.lineWidth = 3;

  const drawLinea = event => {
    if (isMouseDown) {
      const newX = event.offsetX;
      const newY = event.offsetY;
      contexta.beginPath();
      contexta.moveTo(x, y);
      contexta.lineTo(newX, newY);
      contexta.stroke();
      //[x, y] = [newX, newY];
      x = newX;
      y = newY;
    }
  }


  const contextb = paintCanvas3b.getContext('2d');
  contextb.lineCap = 'round';
  contextb.strokeStyle = "#e58c10";
  contextb.lineWidth = 3;

  const drawLineb = event => {
    if (isMouseDown) {
      const newX = event.offsetX;
      const newY = event.offsetY;
      contextb.beginPath();
      contextb.moveTo(x, y);
      contextb.lineTo(newX, newY);
      contextb.stroke();
      //[x, y] = [newX, newY];
      x = newX;
      y = newY;
    }
  }


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


  paintCanvas3a.addEventListener('mousedown', startDrawing);
  paintCanvas3a.addEventListener('mousemove', drawLinea);
  paintCanvas3a.addEventListener('mouseup', stopDrawing);
  paintCanvas3a.addEventListener('mouseout', stopDrawing);

  paintCanvas3b.addEventListener('mousedown', startDrawing);
  paintCanvas3b.addEventListener('mousemove', drawLineb);
  paintCanvas3b.addEventListener('mouseup', stopDrawing);
  paintCanvas3b.addEventListener('mouseout', stopDrawing);







}); //end getdocument ready
