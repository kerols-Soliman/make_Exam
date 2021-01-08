
var counter = 0;
var questionContainer = document.getElementsByClassName("question-container")[0];
var makeQuestionElement;
var makeQuestioElements;



function addNewOption(count) {
    makeQuestionElement = document.createElement("div");////////////
    makeQuestionElement.setAttribute("class", "make-question-element");
    var radioButtonForChoose = document.createElement("input");
    radioButtonForChoose.setAttribute("type", "radio");
    //create own name
    radioButtonForChoose.setAttribute("name", "q" + count);
    var textButtonForChoose = document.createElement("input");
    textButtonForChoose.setAttribute("type", "text");
    textButtonForChoose.setAttribute("placeholder", "option");
    textButtonForChoose.setAttribute("name", "q" + count);
    textButtonForChoose.setAttribute("class", "ques");
    
    makeQuestionElement.appendChild(radioButtonForChoose);
    makeQuestionElement.appendChild(textButtonForChoose);

    return makeQuestionElement;
}

function AddNewQuestion() {
    counter++;
    var makeQuestion = document.createElement("div");
    makeQuestion.setAttribute("class", "make-question");
    //    make-question-title
    var makeQuestionTitle = document.createElement("div");
    makeQuestionTitle.setAttribute("class", "make-question-title");
    //   makeQuestion   append makeQuestionTitle
    makeQuestion.appendChild(makeQuestionTitle);
    var makeQuestionNumber = document.createElement("span");
    makeQuestionNumber.setAttribute("class", "make-question-number");
    makeQuestionNumber.textContent = counter + ".";
    var makeQuestionName = document.createElement("input");
    makeQuestionName.setAttribute("type", "text");
    makeQuestionName.setAttribute("class", "make-question-name");
    makeQuestionName.setAttribute("value", "Question");
    makeQuestionName.setAttribute("name", "q" + counter);
    // makeQuestionTitle   = makeQuestionNumber + makeQuestionName
    makeQuestionTitle.appendChild(makeQuestionNumber);
    makeQuestionTitle.appendChild(makeQuestionName);
        //  make-questio-elements
    /**/ makeQuestioElements = document.createElement("div");
    makeQuestioElements.setAttribute("class", "make-questio-elements");
    makeQuestioElements.setAttribute("data-counter", counter);   // to when add new optin take his div counter
    makeQuestioElements.appendChild(addNewOption(makeQuestioElements.getAttribute("data-counter")));
    makeQuestioElements.appendChild(addNewOption(makeQuestioElements.getAttribute("data-counter")));

    var addOptionElement = document.createElement("button");
    addOptionElement.setAttribute("class", "add-option-element");
    addOptionElement.setAttribute("onclick", "buttonAddOption(this)");
    addOptionElement.textContent = "Add option";
    /* makeQuestion
    <div class="degree-Div">
        <div class="requiredDiv">
            <input type="checkbox" name="requird" id="requiredQuestion" value="required"> Is Required
        </div>
        The Degree : <input type="number" id="questionDegree" min="1" value="1">
    </div> 
    */
    //degree
    var degreeDiv = document.createElement("div");
    degreeDiv.setAttribute("class", "degree-Div");

    var requiredDiv = document.createElement("div");
    requiredDiv.setAttribute("class", "requiredDiv");
    var requiredQuestion = document.createElement("input");
    requiredQuestion.setAttribute("type", "checkbox");
    requiredQuestion.setAttribute("name", "requird");
    requiredQuestion.setAttribute("class", "requiredQuestion");
    requiredQuestion.setAttribute("value", "required");
    requiredDiv.appendChild(requiredQuestion);
    requiredDiv.innerHTML+=" Is Required ";
    
    // questionDegreeDiv.appendChild(requiredDiv);
    // questionDegreeDiv.textContent="The Degree : ";
    var questionDegreeDiv = document.createElement("div");
    questionDegreeDiv.setAttribute("class", "questionDegreeDiv");
    questionDegreeDiv.textContent="The Degree : ";
    var questionDegree = document.createElement("input");
    questionDegree.setAttribute("type", "number");
    questionDegree.setAttribute("class", "questionDegree");
    questionDegree.setAttribute("min", "1");
    questionDegree.setAttribute("value", "1");
    questionDegreeDiv.appendChild(questionDegree);
    /*   degreeDiv= requiredDiv+ questionDegreeDiv*/
    degreeDiv.appendChild(requiredDiv)
    degreeDiv.appendChild(questionDegreeDiv)
    

    makeQuestion.appendChild(makeQuestioElements);
    /**/makeQuestion.appendChild(addOptionElement)
    makeQuestion.appendChild(degreeDiv)

    questionContainer.appendChild(makeQuestion);
}


var AddQuestionContainer = document.getElementsByClassName("Add-question-container")[0];
AddQuestionContainer.addEventListener("click", function () {
    AddNewQuestion();
});

function buttonAddOption(th) {
    var x = addNewOption(th.previousElementSibling.getAttribute("data-counter"));
    th.previousElementSibling.appendChild(x);

    //th.parentElement.appendChild(x);       //th.previousElementSibling.appendChild(x);
}


/******************change between question and response ******************************/
var saveFormDiv=document.getElementsByClassName("save-form-div")[0];
var QuestionParentDiv=document.getElementsByClassName("QuestionParentDiv")[0];
var ResponseParentDiv=document.getElementsByClassName("startEndExam")[0];
function changeSelectedToQuestion(th) {
    var selectedOptin1=document.getElementById("selectedOptin1");
    var optionBorderTop=selectedOptin1.getElementsByClassName("optionBorderTop")[0];    
    optionBorderTop.setAttribute("style", "opacity:1");
    var optionBorderTop=selectedOptin1.getElementsByClassName("option")[0];
    optionBorderTop.setAttribute("style", "background-color: white;");
    QuestionParentDiv.setAttribute("style","display:block");
    saveFormDiv.setAttribute("style","display:block");

    var selectedOptin2=document.getElementById("selectedOptin2");
    var optionBorderTop=selectedOptin2.getElementsByClassName("optionBorderTop")[0];
    optionBorderTop.setAttribute("style", "opacity:0");
    var optionBorderTop=selectedOptin2.getElementsByClassName("option")[0];
    optionBorderTop.setAttribute("style", "background-color: #f3f6fb;");
    ResponseParentDiv.setAttribute("style","display:none");
}
function changeSelectedToResponses(th){
    var selectedOptin2=document.getElementById("selectedOptin2");
    var optionBorderTop=selectedOptin2.getElementsByClassName("optionBorderTop")[0];    
    optionBorderTop.setAttribute("style", "opacity:1");
    var optionBorderTop=selectedOptin2.getElementsByClassName("option")[0];
    optionBorderTop.setAttribute("style", "background-color: white;");
    QuestionParentDiv.setAttribute("style","display:none");
    saveFormDiv.setAttribute("style","display:none");

    var selectedOptin1=document.getElementById("selectedOptin1");
    var optionBorderTop=selectedOptin1.getElementsByClassName("optionBorderTop")[0];
    optionBorderTop.setAttribute("style", "opacity:0");
    var optionBorderTop=selectedOptin1.getElementsByClassName("option")[0];
    optionBorderTop.setAttribute("style", "background-color: #f3f6fb;");
    ResponseParentDiv.setAttribute("style","display:block");
}


/**************************** Save form in local Storage ******************************************/
var saveForm=document.getElementById("save-form");
function saveInLocalStorage(){
    var makeQuestion=document.getElementsByClassName("make-question");
    var examNameEditDetails=document.getElementsByClassName("examNameEditDetails")[0];
    var examNameArray=new Array(2);
    var QuestionArray=new Array(makeQuestion.length);
    
    // to fill array of exam name
    examNameArray[0]=examNameEditDetails.children[0].value;
    examNameArray[1]=examNameEditDetails.children[1].value;
    console.log(examNameArray);
    //requiredQuestion questionDegree
    var requiredQuestion=document.getElementsByClassName("requiredQuestion");
    var questionDegree=document.getElementsByClassName("questionDegree");


    // to fill array of question
    for(var i=0;i<makeQuestion.length;i++){
        var numberOfOptions=makeQuestion[i].children[1].children.length;
        var titleQuestionDetails=makeQuestion[i].children[0].children[1].value;   // ex. the size of int data type is
        var optionsInQuestion=makeQuestion[i].children[1].children;         // ex option1   ,option2  and more
        //  edit  20-12-2020
        QuestionArray[i]=new Array(numberOfOptions+4);     //4 = number question + name question +requird+degree
        for(var j=0;j<QuestionArray[i].length;j++){
            if(j==0){
                QuestionArray[i][j]=i+1;              //save counter
            }else if(j==1){
                QuestionArray[i][j]=titleQuestionDetails;      //save question name
            }else if(j==2){
                if(requiredQuestion[i].checked){
                    QuestionArray[i][j]=requiredQuestion[i].value;
                }else{
                    QuestionArray[i][j]="";
                }
            }else if(j==3){
                QuestionArray[i][j]=questionDegree[i].value;
            }else if(j>3){
                QuestionArray[i][j]=optionsInQuestion[j-4].children[1].value;   //to save option
            }
        }
    }
    console.log(QuestionArray);
    
    localStorage.setItem("examName",JSON.stringify(examNameArray));
    localStorage.setItem("Questions",JSON.stringify(QuestionArray));
    //console.log(JSON.parse(localStorage.getItem("examName")));
    //console.log(JSON.parse(localStorage.getItem("Questions")));
}
saveForm.addEventListener("click",function(){
    saveInLocalStorage();
    alert("Question are saved.\nplease selet respose of the exam");
    changeSelectedToResponses(null)
    saveAnswer()

})

/****************************   Save Response (time) in local Storage   ************************************/
var responseArray=new Array(3);
var responseForm=document.getElementsByClassName("response-form")[0];
responseForm.addEventListener("click",function(){
    var startTime=document.getElementById("startTime").value;
    var endTime=document.getElementById("endTime").value;
    var examDate=document.getElementById("examDate").value;
    
    console.log("s "+startTime);
    console.log("e "+endTime);
    console.log("d "+examDate);
    
    responseArray[0]=startTime;
    responseArray[1]=endTime;
    responseArray[2]=examDate;
    
    //save in localstorage
    localStorage.setItem("responseForm",JSON.stringify(responseArray));
    console.log(JSON.parse(localStorage.getItem("responseForm")));
    
})



/***************************  save answer **************************** */
//create array

function saveAnswer(){
    
    var answerArray=new Array(counter)//counter        //answerArray=counter,solution,required,degree
    for(var i=0;i<answerArray.length;i++){
        answerArray[i]=new Array(2);
    }
    
    //alert("answerArray "+answerArray.length)
    var questionText=document.getElementsByClassName("ques");  //return all input type text with checkbox
    var radioButton=document.querySelectorAll('input[type="radio"]');
    

    // assign the value of textbox to radio valur
    for(var i=0;i<questionText.length;i++){
        questionText[i].previousElementSibling.value=questionText[i].value;
    }
    var j=0;
    /******************  edit  20-12-2020 ************* */
    // //requiredQuestion questionDegree
    // var requiredQuestion=document.getElementsByClassName("requiredQuestion");
    // var questionDegree=document.getElementsByClassName("questionDegree");
    ///   save q1,q2 .....q(counter)
    for(var i=0;i<counter;i++){ 
        answerArray[i][0] = "q"+(i+1);
    }
    
    for(var i=0;i<radioButton.length;i++){ 
        if(radioButton[i].checked){
            for(var j=0;j<counter;j++){
                if(answerArray[j][0]==radioButton[i].name){
                    answerArray[j][1]=radioButton[i].value;
                    // if(requiredQuestion[j].checked){
                    //     answerArray[j][2]=requiredQuestion[j].value;
                    // }else{
                    //     answerArray[j][2]="";
                    // }
                    // answerArray[j][3]=questionDegree[j].value;
                }
            }
        }
    }
    //if not choose radio button
    // for(var i=0;i<counter;i++){ 
    //     if(answerArray[i][1]==null){
    //         if(requiredQuestion[i].checked){
    //             answerArray[i][2]=requiredQuestion[i].value;
    //         }else{
    //             answerArray[i][2]="";
    //         }
    //         answerArray[i][3]=questionDegree[i].value;
    //     }
    // }
    

    localStorage.setItem("answer",JSON.stringify(answerArray));
    console.log("/////////////*******answer*******/////////////////")
    console.log(JSON.parse(localStorage.getItem("answer")));
}


/************   student present  ******************** */
/*
<div class="presentStudents">
                    <div class="student">
                        <div class="studentName">
                            kerolos
                        </div>
                        <div class="studentDegree">
                            15 point
                        </div>
                        <div class="studentSolve">
                            go to solve
                        </div>
                    </div>
                </div>*/
function presentStudent(){
    //load from database
    var studentEvaluate=JSON.parse(localStorage.getItem("student"));
    

    // create present student
    var presentStudents=document.createElement("div");
    presentStudents.setAttribute("class","presentStudents")
    var student=document.createElement("div");
    student.setAttribute("class","student")

    var studentName=document.createElement("div");
    studentName.setAttribute("class","studentName")
    /**/studentName.textContent=studentEvaluate[studentEvaluate.length-2]
    var studentDegree=document.createElement("div");
    studentDegree.setAttribute("class","studentDegree")
    /* */studentDegree.textContent=studentEvaluate[studentEvaluate.length-1]+" point"
    var studentSolve=document.createElement("div");
    studentSolve.setAttribute("class","studentSolve")
    /** */studentSolve.innerHTML="<a href='studentSolution.html'>Show The Answer</a>"

    student.appendChild(studentName)
    student.appendChild(studentDegree)
    student.appendChild(studentSolve)
    presentStudents.appendChild(student)
    ResponseParentDiv.appendChild(presentStudents)
    
}
try{
    presentStudent()
}catch(exception){
        
}