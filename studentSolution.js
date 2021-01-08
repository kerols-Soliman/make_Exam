var examNameArray=JSON.parse(localStorage.getItem("examName"));
var questionsArray=JSON.parse(localStorage.getItem("Questions"));
var responseForm =JSON.parse(localStorage.getItem("responseForm"));
var answerQuestion =JSON.parse(localStorage.getItem("answer"));

var notNowTheExamDiv=document.getElementById("notNowTheExam");
var submitFormExam=document.getElementById("submit-form");
var ResponseParentDiv=document.getElementsByClassName("ResponseParentDiv")[0];

/**************************** time ******************************************/

ResponseParentDiv.setAttribute("style","display: block;");

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

/**************************     student solved         ****************************************** */
studentSolve()
function studentSolve(){
    solveArray=JSON.parse(localStorage.getItem("student"));
    var answerQuestion =JSON.parse(localStorage.getItem("answer"));
    
    
    var questionElementsSelector=document.querySelectorAll(".questio-elements");     //the div contain all choise of question
    for(var i=0;i<questionElementsSelector.length;i++){
        var choice=questionElementsSelector[i].children;
        for(var j=0;j<choice.length;j++){
            if(choice[j].children[0].name==solveArray[i][0] && choice[j].children[0].value==solveArray[i][1]){
                choice[j].children[0].checked=true;
                // to color it
                if(answerQuestion[i][1]==choice[j].children[0].value){
                    choice[j].setAttribute("style","background:lightgreen;padding-top: 10px;padding-bottom: 10px;");
                }else{
                    choice[j].setAttribute("style","background:rgb(255,11,17,.5);padding-top: 10px;padding-bottom: 10px;")
                }
            }
        }
    }    
}
