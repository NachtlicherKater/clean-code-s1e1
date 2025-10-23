//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var addTaskInput = document.querySelector("#new-task"); // new-task input
var addTaskButton = document.querySelector(".todo__add-button"); // add button
var incompleteTaskList = document.querySelector("#todo__unfinished-list"); // unfinished tasks
var completedTaskList = document.querySelector("#todo__completed-list"); // completed tasks


var createNewTaskElement=function(taskString){

    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var editInput = document.createElement("input");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    var deleteButtonImg = document.createElement("img");
    
    listItem.className="todo__item";
    //
    checkBox.className = "todo__checkbox";
    checkBox.type="checkbox";
    //
    label.innerText = taskString;
    label.className = 'todo__text';
    //
    editInput.className ="todo__input";
    editInput.value = taskString;
    editInput.type = "text";
    //
    editButton.innerText="Edit";
    editButton.className="todo__edit";
    //
    deleteButton.className="todo__delete";
    deleteButtonImg.src='./assets/icons/remove.svg';
    deleteButtonImg.className="todo__icon";
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!addTaskInput.value) return;
    var listItem=createNewTaskElement(addTaskInput.value);

    //Append listItem to incompleteTaskList
    incompleteTaskList.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    addTaskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput = listItem.querySelector('.todo__input');
    var label = listItem.querySelector(".todo__text");
    var editBtn = listItem.querySelector(".todo__edit");
    var containsClass = listItem.classList.contains("editMode");
    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("editMode");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTaskList.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    incompleteTaskList.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addTaskButton.addEventListener("click",addTask);
addTaskButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox = taskListItem.querySelector(".todo__checkbox");
    var editButton = taskListItem.querySelector(".todo__edit");
    var deleteButton = taskListItem.querySelector(".todo__delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskList ul list items
//for each list item
for (var i=0; i<incompleteTaskList.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskList.children[i],taskCompleted);
}




//cycle over completedTaskList ul list items
for (var i=0; i<completedTaskList.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTaskList.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.