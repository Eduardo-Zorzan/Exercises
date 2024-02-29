const newTask = document.querySelector('.task-name input');
const taskAdd = document.querySelector('.add-task');
const taskList = document.querySelector('.task-list');
let taskArray = [];
let taskArrayJSON;
let timer = 0;
let taskItem;
let deleteItem;
let numberDeleted = 0;
let taskItemContent;

function createLi () {
    let li = document.createElement('li');
    return li
}

function createElementLi () {
    let li = taskList.appendChild(createLi());
    return li
}

function createP () {
    let p = document.createElement('p');
    return p
}

function createElementP () {
    let li = createElementLi();
    let p = li.appendChild(createP());
    return p
}

function contentP () {
    let p = createElementP().innerText = newTask.value;
    return p
}

function createDelete () {
    let del = document.createElement('button');
    return del
}

function createElementDelete () {
    let li = taskList.querySelector('li:nth-last-child(1)');
    li.appendChild(createDelete())
    let del = li.querySelector('button')
    return del
}

function deleteContent () {
    let del = createElementDelete().innerText += 'delete';
    let li = taskList.querySelector('li:nth-last-child(1)');
    del = li.querySelector('button')
    return del
}

function createClassDel () {
    let del = deleteContent().classList.add('delete')
    return del
}

function addInArray () {
    let taskItem = contentP();
    taskArray.push(taskItem)
    return taskArray
}

function deleteFunction (target) {
    let parentButton = target.parentElement
    parentButton.remove()
    return parentButton
}

function saveTaskArray () {
    taskArrayJSON = JSON.stringify(taskArray);
    localStorage.setItem('taskArray', taskArrayJSON)
    console.log(taskArrayJSON)
}

function getTaskArray () {
    let stringTaskArray = localStorage.getItem('taskArray');
    taskArray = JSON.parse(stringTaskArray);
    if (taskArray) {
        for (let i of taskArray) {
            createElementP().innerText = i;
            createClassDel()
        }
    } else {
        taskArray = []
    }
}

function removeInArray (target2) {
    let parentButton = deleteFunction(target2).querySelector('p');
    let contentParentButton = parentButton.innerText;
    for (let i in taskArray) {
        if (taskArray[i] === contentParentButton) {
            taskArray.splice(i, 1);
            console.log(taskArray)
            saveTaskArray();
            return taskArray;
        } else {
            continue;
        }
    }
}

function createLiplusDel () {
    let array = addInArray();
    let delButton = createClassDel();
    saveTaskArray()
    return array
}

function eventListener () {
    getTaskArray()
    document.addEventListener('click', function (value) {
        let event = value.target
        if (event.classList.contains('add-task')){
            if (newTask.value) {
                taskItem = createLiplusDel();
            }
            newTask.value = ''
        }
        if (event.classList.contains('delete')) {
            removeInArray(event)
        }
        
    })
}

function reOrder (array) {
    let length = array.length;
    let biggerNumber = array[0]
    let positionBigger = 0;
    for (let i = 0; i < length; i++) {
        biggerNumber = array[0]
        for (let a = 0; a < length - i; a++) {
            if (biggerNumber < array[a]) {
                biggerNumber = array[a];
                positionBigger = a;
            } else if (biggerNumber === array[a]) {
                continue
            } else {
                array[positionBigger] = array[a];
                array[a] = biggerNumber;
                positionBigger = a
            }
        }
    }
    return array
}

eventListener()



