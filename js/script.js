'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

let todoData = [
    // {
    //     value: 'Сварить кофе',
    //     completed: false
    // },
    // {
    //     value: 'Помыть посуду',
    //     completed: true
    // }
];
//////////////////////////////////////////////////////////////////////////////////////
const addChangeToLocalStorage = function() {
    localStorage.setItem('localData', JSON.stringify(todoData));
};
//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////
const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item, i) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';
            
        if(item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnToDoRemove = li.querySelector('.todo-remove');
        btnToDoRemove.addEventListener('click', function() {
            delete todoData[i];
            addChangeToLocalStorage();
            render();
        });
        
        const btnToDoCompleted = li.querySelector('.todo-complete');
        btnToDoCompleted.addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });
        
        addChangeToLocalStorage();
    });
};

todoControl.addEventListener('submit', function(event) {
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false
    };

    if(headerInput.value.trim() === '') {
        alert('Введите корректное название задачи');
        headerInput.value = '';
        return;
    }

    todoData.push(newTodo);
    headerInput.value = '';
    
    render();
});

let getItemFromStorage = function() {
    if (!localStorage.getItem('localData')) {
        return;
    }
    let getLocStorData = JSON.parse(localStorage.getItem('localData'));
    for (let item in getLocStorData) {
        if (getLocStorData[item] === null) {
            delete todoData[item];
            delete getLocStorData[item];
            localStorage.setItem('localData', todoData);
            
        }
        addChangeToLocalStorage();
    }
    todoData = getLocStorData;
};

getItemFromStorage();

render();