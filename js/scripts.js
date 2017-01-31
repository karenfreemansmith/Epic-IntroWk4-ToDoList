//<!-- Back End -->
function Task(description, assignedTo){
  this.taskName = description;
  this.finished = false;
  this.assignedTo = assignedTo;
}

Task.prototype.toggleTask = function() {
  this.finished = !this.finished;
}

function getTasks() {
  var tasks=[];
  if(localStorage.myTasks) {
    tasks=JSON.parse(localStorage.getItem("myTasks"));
  } else {
    console.log("Tasks not found");
  }
  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function resetTasks() {
  localStorage.removeItem("myTasks");
}



//<!-- Front End  -->
$(document).ready(function(){
  
  var tasks = getTasks();
  console.log(tasks);
  
  showTasks(tasks);

  $("form#inputForm").submit(function(event){
    event.preventDefault();
    var myTask = new Task($("#input").val(), $("#assignTo").val().toLowerCase());
    tasks.push(myTask);
    
    showTasks(tasks);
    


    saveTasks(tasks);
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
        saveTasks(tasks);
      }
    });
  } );
  
  function showTasks(tasks) {
    clearTasks();
    tasks.forEach(function(task) {
      $("#result ul#"+task.assignedTo).append("<li>" + task.taskName + "</li>");
      $("ul#"+task.assignedTo + " li").last().dblclick(function() {
          task.toggleTask();
          if(task.finished) {
            $(this).addClass("done");
          } else {
            $(this).removeClass("done");
          }
      });
    });
  }
  
  function clearTasks() {
    $("#result ul#android, #result ul#java, #result ul#javascript, #result ul#html").empty();
  }
});
