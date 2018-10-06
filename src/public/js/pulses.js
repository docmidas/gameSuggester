//alert("Javascript is working");

//     Handlebars.registerHelper('summarize', function(object) {
//   //var words = Handlebars.escapeExpression(object.slice(0,10));

//   return new Handlebars.SafeString(
//     // words
//     "What it do?";
//   );
// });



var pulseCounter = 0;
var silhouette = document.getElementById("screen");
var opaFactor = .015;
var opaLevel = 0;

var throbSpeed;

// var pageHeight = Math.max(document.body.offsetHeight, 
//                                 document.documentElement.clientHeight, document.documentElement.offsetHeight);

function createPulse(pulseFreq) {
    for (var i = 0; i < pulseFreq; i++) {
        var elem = document.createElement('img'); 
        elem.src = "/images/elec_pulse.png";
        elem.style.position = "absolute";
        elem.style.left = getRandom(window.innerWidth -200) + 'px';
        elem.style.top = getRandom(window.pageHeight -10) + 'px';
        // elem.style.top = getRandom(window.innerHeight -100) + 'px';

    //elem.setAttribute("class", "sparks"+pulseCounter);
    elem.setAttribute("class", "sparks1");
    document.body.appendChild(elem);
        
    };
}

function getRandom (max) {
    var ranResult = Math.round(Math.random() * max);
    //console.log(ranResult);
    return ranResult;   
}

/////************////////
/////*Move Sparks
/////************////////
function moveSparks() {

    var group1 = document.getElementsByClassName("sparks1");
    if(group1.length == 0){
        //moveCount = 0;
        return;
    }
        for (var x = 0; x < group1.length; x++) {
            if(group1[x].offsetLeft < (window.innerWidth-130)){
                group1[x].style.left = (group1[x].offsetLeft + 10) + "px";  
            }
            else{
                //console.log("disapeared at " + group1[x].style.left) ;
                document.body.removeChild(group1[x]);
            }
        }       
        if(group1.length >0){
            window.requestAnimationFrame(moveSparks);
            //setInterval(removeSpark, 1000);
        }
}



function removeSpark2 () {
    var group1Remove = document.getElementsByClassName("sparks1");
    if ( group1Remove.length >0 ){
        if(getRandom(4) >= 3) {
            document.body.removeChild(group1Remove[getRandom(group1Remove.length-1)]);
            //console.log("REMOVAL HIT!!!!");
        }
    }
    else{
        return;
    }
}

// window.setInterval(function(){
//     createPulse(8); 
//     moveSparks();
//     removeSpark2();
// }, 300);

// window.setInterval(function(){

//     screenThrob();

//     }, 30);


function screenThrob() {
    opaLevel += opaFactor;
    if (opaLevel >= .5 || opaLevel <0) {
        opaFactor *= -1;
    };
        silhouette.style.opacity = opaLevel.toString();     
}
