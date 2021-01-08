
var examNameArray=JSON.parse(localStorage.getItem("examName"));
var questionsArray=JSON.parse(localStorage.getItem("Questions"));
var responseForm =JSON.parse(localStorage.getItem("responseForm"));
var answerQuestion =JSON.parse(localStorage.getItem("answer"));

var notNowTheExamDiv=document.getElementById("notNowTheExam");
var submitFormExam=document.getElementById("submit-form");
var ResponseParentDiv=document.getElementsByClassName("ResponseParentDiv")[0];

/**************************** time ******************************************/
var examTimeStart=responseForm[0];
var examTimeEnd=responseForm[1];
var examDate=responseForm[2];

//    check current time with start exam and finish

var timeNow=new Date();

checkTime(examTimeStart,examTimeEnd,timeNow);
function checkTime(tStart,tEnd,tNow){
    tStart=changeTimeFormate(tStart);
    tEnd=changeTimeFormate(tEnd);
    
    console.log("tStart "+tStart);
    console.log("tEnd   "+tEnd);
    console.log("tNow   "+tNow);
    if(tStart<=tNow && tNow<=tEnd)
    {
        //alert("accept");
        ResponseParentDiv.setAttribute("style","display: block;");
        submitFormExam.setAttribute("style","display: inline-block;");
        notNowTheExamDiv.setAttribute("style","display: none;")
        return 1;
    }
    else{
        //alert("Not now");
        notNowTheExamDiv.setAttribute("style","display: block;");
        ResponseParentDiv.setAttribute("style","display: none;")
        submitFormExam.setAttribute("style","display: none;");
        return 0
    }
    
}
//to make date time and assign date to tstart and end
function changeTimeFormate(time){
    var hours = time.split(":")[0];
    var x=time.split(":")[1];  //:20 pm
    var minutes = x.split(" ")[0];
    
    var examDateAfterSplit=changeDateFormate(examDate);
    var timeConvert=new Date();
    timeConvert.setHours(hours);
    timeConvert.setMinutes(minutes);
    timeConvert.setSeconds(0);
    timeConvert.setDate(parseInt(examDateAfterSplit[0]))
    timeConvert.setMonth(parseInt(examDateAfterSplit[1])-1)
    timeConvert.setFullYear(parseInt(examDateAfterSplit[2]));
    
    return timeConvert; 
}
function changeDateFormate(date){
    var year = date.split("-")[0];
    var month = date.split("-")[1];
    var day = date.split("-")[2];
    var examDate=[day,month,year]
   
    return examDate; 
}



/**************************** assign question to exam ******************************************/

examNameFinishedEdit(examNameArray);    //examNameArray
function printFullQuestionFromLocalStorage(){
    for(var i=0;i<questionsArray.length;i++){
        
        questionDiv(questionsArray[i]);
        //console.log("***********")
    }
    
}
printFullQuestionFromLocalStorage()


/**************************** Responses container ******************************************/
function examNameFinishedEdit(array){
    var examNameFinishedEdit=document.createElement("div");
    examNameFinishedEdit.setAttribute("class","examNameFinishedEdit");
    var examName=document.createElement("h2");
    examName.setAttribute("id","examName");
    examName.textContent=array[0];     //////////
    var examDescription=document.createElement("p");
    examDescription.setAttribute("id","examDescription");
    examDescription.textContent=array[1];
    examNameFinishedEdit.appendChild(examName);
    examNameFinishedEdit.appendChild(examDescription);
    ResponseParentDiv.appendChild(examNameFinishedEdit);


}

function questionElement(array,index){
    var questionElement=document.createElement("div");
    questionElement.setAttribute("class","question-element");
    var optionChoose=document.createElement("input");
    optionChoose.setAttribute("type","radio");
    optionChoose.setAttribute("name","q"+array[0]);            ///////////////
    optionChoose.setAttribute("value",array[index]);  

    var optionText=document.createElement("span");
    optionText.textContent=array[index];        //////////////
    questionElement.appendChild(optionChoose);
    questionElement.appendChild(optionText);
    return questionElement;
}

function questionDiv(array){
    var question=document.createElement("div");
    question.setAttribute("class","question");
    //part 1  questionTitle
    var questionTitle=document.createElement("div");
    questionTitle.setAttribute("class","question-title");
    var questionNumber=document.createElement("div");
    questionNumber.setAttribute("class","question-number");
    questionNumber.textContent=array[0]; //////
    
    var questionName=document.createElement("div");
    questionName.setAttribute("class","question-name");
    questionName.textContent=array[1];    ////////
    /*    edit 20-12-2020 */
    /*
    <div class="questioninformation">
        * (3point)
    </div>*/
    var questioninformation=document.createElement("div");
    questioninformation.setAttribute("class","questioninformation");
    var areRequired;
    if(array[2]=="required"){
        areRequired="*"
    }else{
        areRequired=""
    }
    questioninformation.innerHTML="<span style='color: red;font-size: larger;'>"+areRequired+"</span>"+" ("+array[3]+" point)";


    questionTitle.appendChild(questionNumber);
    questionTitle.appendChild(questionName);
    questionTitle.appendChild(questioninformation);
    //part 2   questioElements  choose
    var questioElements=document.createElement("div");
    questioElements.setAttribute("class","questio-elements");
    //  for loop
    for(var i=4;i<array.length;i++){
        questioElements.appendChild(questionElement(array,i));                     //////////
    }
    
    //append
    question.appendChild(questionTitle);
    question.appendChild(questioElements);
    ResponseParentDiv.appendChild(question);
}

/******************************************************************************/
var progressCircle = document.getElementsByClassName("progress")[0];
var radius = progressCircle.r.baseVal.value;


var mohet = radius * 2 * Math.PI;
progressCircle.style.strokeDasharray = mohet;
//0-100
var timstart=changeTimeFormate(examTimeStart);
var timeend=changeTimeFormate(examTimeEnd);

var totaltimeInSecond = timeend-timstart;
var valueDegreeInSecond = totaltimeInSecond / 100;

var timeSpent = (timeNow-timstart)-timeNow.getSeconds();
var val=timeSpent/valueDegreeInSecond;
val=parseInt(val);
// var val = 0;
console.log("first "+val)
if(val<0){
    document.getElementById("parcentText").textContent = 0;
}else if(val<=100&&val>-1){
    setProgress(val)
    document.getElementById("parcentText").textContent = val;
}else{
    document.getElementById("parcentText").textContent = 100;
}

var r = setInterval(function () {
    if (val <= 100 && val>-1) {
        //console.log(val)
        setProgress(val);
        document.getElementById("parcentText").textContent = val;
        val++;
    }
}, valueDegreeInSecond)

function setProgress(percent) {
    progressCircle.style.strokeDashoffset = mohet - (percent / 100) * mohet;

}



/**************************** End the exam and submit ******************************************/
var studentName;
var counter=questionsArray.length;
submitFormExam.addEventListener("click",function(){
    var timNow=new Date();
    if(checkRequiredIsDone()){
        if(checkTime(examTimeStart,examTimeEnd,timNow)){
            //alert("done");
            while(!studentName){
                studentName=prompt('Your Name :');
            };
            correctExam();
            this.setAttribute("style","display:none")
    
        }else{
            alert("Sorry!\nThe time is out.");
        }
    }else{
        alert("solve required Question")
    }
    
})
// check Required question Is solved
function checkRequiredIsDone(){
    
    var questionElementsSelector=document.querySelectorAll(".questio-elements");     //the div contain all choise of question
    var isChecked=0;
    var isCheckedTotal=1;

    for(var i=0;i<questionElementsSelector.length;i++){
        isChecked=0;
        questionElementsSelector[i].parentElement.removeAttribute("style")
        if(questionsArray[i][2]=="required"){
            var choice=questionElementsSelector[i].children;
            for(var j=0;j<choice.length;j++){
                if(choice[j].children[0].checked){
                    isChecked=1;
                }
            }
            if(!isChecked){
                questionElementsSelector[i].parentElement.setAttribute("style","border:1px solid red");
                isCheckedTotal=0;
            }
        }
        
    }
    if(isCheckedTotal==0){
        return 0
    }
    return 1;
    
}
function correctExam(){
    //create array correctionExam

    var radioButton=document.querySelectorAll('input[type="radio"]');
    var studentDegree=0;

    var solutionArray=new Array(counter)//counter
    //make array 2d
    for(var i=0;i<solutionArray.length;i++){
        solutionArray[i]=new Array(2);
    }
    
    ///   save q1,q2 .....q(counter)
    for(var i=0;i<counter;i++){ 
        solutionArray[i][0] = "q"+(i+1);
    }
    
    for(var i=0;i<radioButton.length;i++){ 
        if(radioButton[i].checked){
            for(var j=0;j<counter;j++){
                if(answerQuestion[j][0]==radioButton[i].name){
                    if(answerQuestion[j][1]==radioButton[i].value){

                        solutionArray[j][1]=radioButton[i].value;  //save solition
                        studentDegree=parseFloat(studentDegree)+parseFloat(questionsArray[j][3]);
                        radioButton[i].parentElement.setAttribute("style","background:lightgreen;padding-top: 10px;padding-bottom: 10px;")
                    }else{
                        solutionArray[j][1]=radioButton[i].value;  //save solition
                        radioButton[i].parentElement.setAttribute("style","background:rgb(255,11,17,.5);padding-top: 10px;padding-bottom: 10px;")
                    }
                }
            }
        }
    }
    solutionArray.push(studentName)
    solutionArray.push(studentDegree)
    
    localStorage.setItem("student",JSON.stringify(solutionArray));
    console.log(solutionArray)
}