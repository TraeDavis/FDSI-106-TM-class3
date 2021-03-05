let isItImportant = false;
let detailsShown = true;
const serverUrl = "http://fsdi.azurewebsites.net/api";

function toggleDetails(){
    // hide/show capture
    if(detailsShown){
    $("#btnDetails").text("Show Details");
    $("#capture").animate({"left":"50%"}).hide(1);
     detailsShown = false;

    } else {
        $("#btnDetails").text("Hide Details");
        $("#capture").animate({"left":'0%'}).show();
        detailsShown = true;
    }
}

function toggleImportant(){
    
    if(!isItImportant){
        $("#imp-star").removeClass('far').addClass('fas');
        isItImportant = true;
    } else{
        $("#imp-star").removeClass('fas').addClass('far');
        isItImportant = false;
    }
}



function saveTask(){
    // Capture input from form
    let titleTxt = $("#title").val();
    let dateTxt = $("#date").val();
    let statusTxt = $("#status").val();
    let locationTxt = $("#location").val();
    let descriptionTxt = $("#taskInfo").val();
    let colorTxt = $("#colorInput").val();
    // If title, status, or description is left empty shows error message above form
        if(titleTxt.length < 1 || statusTxt === null || dateTxt === ""){
            $("#form-error").fadeIn(1000).fadeOut(6000);
            return;
            }else{
            $("#form-error").hide();
            }
    

    let myTask = new Task(0, titleTxt, isItImportant, dateTxt, statusTxt, locationTxt, descriptionTxt, colorTxt);

    console.log(myTask);
    // Save to server
    $.ajax({
        url: serverUrl + '/tasks',
        type: "POST",
        data: JSON.stringify(myTask),
        contentType: "application/json",

        success: function(res){
            console.log("Server says: ", res);
            
            

            // display task
            displayTask(res);
            // clear form after info entered
            $("#myForm").trigger("reset");
            // reset important star
            if(isItImportant === true){
            $("#imp-star").removeClass('fas').addClass('far');
            isItImportant = false;
            }
        },
        error: function(errorDet){
            console.log("Error ", errorDet);
        }
    });

    
    
    
}

function displayTask(task){
   

    // Create the syntax
    let syntax = `<div class="new-task mb-3" style="background-color: ${task.alertText};"> 
    
                    <div onclick="" class="important-container">
                     <i id="test" class="${task.important} far fa-star"></i>
                    </div>

                    <div class="task-container">
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    </div>

                    <div class="date-icon">
                    <label><b>Due Date:</b><br>
                    ${task.dueDate}</label>
                    <label><b>Location:</b><br>${task.location}</label>
                    </div>

                    <button type="button" class=" btnDelete${task.id} btn btn-danger" onclick="deleteTaskServer(${task.id})"><i class="far fa-trash-alt"></i></button>
                
                    

                  </div>`;

    // append the syntac to html
    $("#task-list").append(syntax);
    
    // mark important on creating new task if selected
    if(task.important === true ){
        $(".true").addClass('fas');
    }

}

function retrieveData(){
    $.ajax({
        url: serverUrl + '/tasks',
        type: "GET",

        success: function(res){

            for(var i=0; i<res.length; i++){
                let task = res[i];
                
                    if(task.user === "Trae"){
                        
                    displayTask(task);
                }
            }
            
        },
        error: function(errorDet){
            console.log("Error ", errorDet);
        }
    });
}


function deleteTaskServer(id){

    // create an ajax
    $.ajax({
        url: serverUrl + "/tasks/" + id,
        type:"DELETE",
        // remove task from screen on success
        success: function(){
            console.log("Deleted from server:", id);
            const item = $(`.btnDelete${id}`);

            if(item){
            const todo = item[0].parentElement;
            todo.remove();
            }
        
        },
        error: function(errorDetails){
            console.log("Error: "+ errorDetails);
        }
        

    });
    
}

function init(){
    console.log("Task Manager");
    retrieveData();
    $("#form-error").hide();
    // events
    $("#imp-star").click(toggleImportant);
    $("#save-btn").click(saveTask);
    $("#btnDetails").click(toggleDetails);
    
    $("#taskInfo").keypress(function(e){
        if(e.keyCode === 13){
            saveTask();
        }
    });
}



window.onload = init;
