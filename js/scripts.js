//<!-- Back End -->
function Task(description, assignedTo){
  this.taskName = description;
  this.finished = false;
  this.assignedTo = assignedTo;
}

Task.prototype.toggleTask = function() {
  this.finished = !this.finished;
}



//<!-- Front End  -->
$(document).ready(function(){
  
  if(localStorage.myTasks) {
    var tasks=JSON.parse(localStorage.getItem("myTasks"));
    console.log(tasks);
    // we are getting tasks here, and adding new tasks, but they are not being added to the lists on load...so lots of duplicates at this point...
  } else {
    var tasks=[];
    console.log("Tasks not found");
  }

  $("form#inputForm").submit(function(event){
    event.preventDefault();
    var myTask = new Task($("#input").val(), $("#assignTo").val().toLowerCase());
    tasks.push(myTask);
    
    // This should be pulled out into a function that 
    // 1) clears the lists, and 
    // 2) rewrites the whole list
    $("#result ul#"+myTask.assignedTo).append("<li>" + myTask.taskName + "</li>");
    $("ul#"+myTask.assignedTo + " li").last().dblclick(function() {
      myTask.toggleTask();
      if(myTask.finished) {
        $(this).addClass("done");
      } else {
        $(this).removeClass("done");
      }
    });
    console.log(tasks);
    localStorage.setItem("myTasks", JSON.stringify(tasks));
    $("form")[0].reset();
  });
  
  $("#android, #java, #javascript, #html" ).sortable({
    connectWith: ".connectedSortable"
  }).disableSelection();
  
  $("#android, #java, #javascript, #html" ).on( "sortreceive", function( event, ui ) {
    var newAssignment = $(this).attr("id");
    var thisTask = ui.item.text();
    tasks.forEach(function(task){
      if(task.taskName === thisTask){
        task.assignedTo = newAssignment;
        // probably need to be saving the whole task list from here (as well?) need a "save" function to keep code dry...
      }
    })
  } );
  
});
