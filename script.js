var iToday = moment();
$("#today").text(iToday.format("dddd, MMMM Do"));

for (i = 0; i < 24; i++) {
    if(i<10)
    {
        var time = '0'+i+':00'
    }
    else
    {
        var time = i+':00';
    }
  var block = '<div id="'+i+'" class="row task-info  " style="width:70%"><div class="col-1 hour my-auto">'+time+'</div><div class="col task"></div><button class="btn btn-primary col-1 saveButton d-flex justify-content-center align-items-center">Save</button></div>'
 $('#contentarea').append(block)
}
function getTasks() {

    var savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
        tasks = savedTasks

        $.each(tasks, function(hour, task) {
            var hourElement = $("#" + hour);
            ShowTask(task, hourElement);
        })
    }

    checkTasks()
}




function ShowTask(task, hour) {

    var taskElement = hour.find(".task");
    var taskData = $("<p>")
        .addClass("description")
        .text(task)
    taskElement.html(taskData);
}
 function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function checkTasks() {

    var currentHour = moment().hour();
    $(".task-info").each( function() {
        var BlockHour = parseInt($(this).attr("id"));
        if ( BlockHour < currentHour ) {
            $(this).removeClass(["presentBlock", "futureBlock"]).addClass("pastBlock");
        }
        else if ( BlockHour === currentHour ) {
            $(this).removeClass(["pastBlock", "futureBlock"]).addClass("presentBlock");
        }
        else {
            $(this).removeClass(["pastBlock", "presentBlock"]).addClass("futureBlock");
        }
    })
};

function Textarea( textareaElement) {

    var taskData = textareaElement.closest(".task-info");
    var textArea = taskData.find("textarea");

    var time = taskData.attr("id");
    var text = textArea.val().trim();

    tasks[time] = [text]; 
    saveTasks();
    ShowTask(text, taskData);
}


$(".task").click(function() {

    
    var time = $(this).closest(".task-info").attr("id");
    if (parseInt(time) >= moment().hour()) {

        var text = $(this).text();
        var textInput = $("<textarea>")
            .addClass("form-control")
            .val(text);

        $(this).html(textInput);
        textInput.trigger("focus");
    }
})

$(".saveButton").click(function() {
    console.log('fdsfdf')
    Textarea($(this));
})

var tasks = {
   
};

time = 3600000 - iToday.milliseconds(); 
setTimeout(function() {
    setInterval(checkTasks, 3600000)
}, time);

getTasks();

