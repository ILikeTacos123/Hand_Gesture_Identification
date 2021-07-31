var prediction1;

Webcam.set({
    width : 350,
    height : 300,
    image_format : "png",
    png_quality : 90
});

Webcam.attach("#camera");

function takesnapshot(){
    Webcam.snap(function(datauri){
        document.getElementById("result").innerHTML="<img src="+datauri+" id='captured-image'>"
    });
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/rkDjkDAXV/model.json",modelLoaded);

function modelLoaded(){
    console.log("The model is loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speakdata = "The meaning of the gesture is " + prediction1;
    utterThis = new SpeechSynthesisUtterance(speakdata);
    synth.speak(utterThis)
}

function check(){
    img = document.getElementById("captured-image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        prediction1 = results[0].label;
        document.getElementById("gesture_name1").innerHTML = prediction1;
        speak()
        if(prediction1 == "Point"){
            document.getElementById("emoji_1").innerHTML = "&#9755;";
        }
        if(prediction1 == "Thumbs Up"){
            document.getElementById("emoji_1").innerHTML = "&#128077;";
        }
        if(prediction1 == "Hi-Five"){
            document.getElementById("emoji_1").innerHTML = "&#128400;";
        }
    }
}
