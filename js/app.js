let isItImportant = false;
let detailsShown = true;

function toggleDetails(){
    // hide/show capture
    if(detailsShown){
    $("#capture").hide();
     detailsShown = false;
    } else {
        $("#capture").show();
        detailsShown = true;
    }
}

function toggleImportant(){
    console.log('clicked');
    if(!isItImportant){
        $(this).removeClass('far').addClass('fas');
        isItImportant = true;
    } else{
        $(this).removeClass('fas').addClass('far');
        isItImportant = false;
    }
}



function saveTask(){
    // Capture input from form
    let titleTxt = $("#title").val();
    let dateTxt = $("#date").val();
    let statusTxt = $("#status").val();
    let locationTxt = $("#location").val();
    let taskInfoTxt = $("#taskInfo").val();
    let colorTxt = $("#colorInput").val();

    let myTask = new Task(0, titleTxt, isItImportant, dateTxt, statusTxt, locationTxt, taskInfoTxt, colorTxt);

    console.log(myTask);


    // display task
    displayTask(myTask);

    // clear form after info entered
    $("#myForm").trigger("reset");
}

function displayTask(task){
    
    // Create the syntax
    let syntax = `<div class="new-task mb-3" style="background-color: ${task.color};"> 
                    <div class="important-container">
                     <i class="imp-task far fa-star"></i>
                    </div>

                    <div class="task-container">
                    <h3>${task.title}</h3>
                    <p>${task.taskInfo}</p>
                    </div>

                    <div class="date-icon">
                    <label><b>Due Date:</b><br>
                    ${task.dueDate}</label>
                    <label><b>Location:</b><br>${task.location}</label>
                    </div>

                    <button type="button" class=" btnDelete btn btn-danger"><i class="far fa-trash-alt"></i></button>
                
                    

                  </div>`;

    // append the syntac to html
    $("#task-list").append(syntax);
}

function deleteTaskMarkImportant(e){
    const item = e.target;
    
    if(item.classList[0] === 'btnDelete'){
        const todo = item.parentElement;
        todo.remove();
    }
    // Mark task as important
    if(item.classList[0] === 'imp-task'){
        
        item.classList.toggle('fas');
    }
}

function init(){
    console.log("Task Manager");

    // events
    $("#imp-star").click(toggleImportant);
    $("#save-btn").click(saveTask);
    $("#btnDetails").click(toggleDetails);
    $("#task-list").click(deleteTaskMarkImportant);
    
    $("#taskInfo").keypress(function(e){
        if(e.keyCode === 13){
            saveTask();
        }
    });
}



window.onload = init;
