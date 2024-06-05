function ajouterTache() {
    const task = document.getElementById('task');
    const taskName = task.value.trim();
    if (taskName === '') return;

    const newTask = document.createElement('li');
    newTask.innerHTML = taskName;
    $(newTask).on('swipeleft', swipeLeftHandler1);
    $(newTask).on('swiperight', swipeRightHandler1);
    $('#taskListOngoing').append(newTask).listview('refresh');

    task.value = '';
    task.focus();
}

function reinitialiserListe() {
    $('#taskListDone').empty().listview('refresh');
    $('#taskListOngoing').empty().listview('refresh');
}

function swipeLeftHandler1() {
    console.log("swipe left effectué");
    $(this).hide('slow', function () {
        $(this).remove();
        $('#taskListOngoing').listview('refresh');
    });
}

function swipeRightHandler1() {
    console.log("swipe right effectué");
    const taskName = $(this).text();
    const newTask = document.createElement('li');
    newTask.innerHTML = taskName;
    $(newTask).on('swipeleft', swipeLeftHandler2);
    $('#taskListDone').append(newTask).listview('refresh');
    $(this).hide('slow', function () {
        $(this).remove();
        $('#taskListOngoing').listview('refresh');
    });
}

function swipeLeftHandler2() {
    console.log("swipe left effectué");
    $(this).hide('slow', function () {
        $(this).remove();
        $('#taskListDone').listview('refresh');
    });
}
