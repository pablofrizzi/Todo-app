$(document).ready(main);

function main() {
    addButton.attr('disabled', true);
    todoInput.on('keyup', toggleAddButton);
    addButton.on('click', addTodo);
    todosList.on('click', '.delete-btn', deleteTodo);
    todosList.on('click', '.edit-btn', startEditTodo);
    todosList.on('click', '.save-btn', saveTodo);
    todosList.on('click', '.cancel-btn', cancelEdit);
    
}

var addButton = $('#add-btn');
var todosList = $('.todos');
var todoInput = $('#todo-input');
var noTodoText = $('#no-todo');

function toggleAddButton() {
    if(todoInput.val().length > 0) {
        addButton.attr('disabled', false);
    } else {
        addButton.attr('disabled', true);
    }
}

function showNoTodoText() {
    if(todosList.children().length === 0) {
        noTodoText.show();
    }
}

function hideNoTodoText() {
    noTodoText.hide();
}

function getParentTodo(button) {
    return $(button).closest('.todo');
}

function getTodoProperties(todo) {
     return {
         todoText: todo.find('.content .todo-text'),
         todoEditInput: todo.find('.content .todo-edit-input'),
         editButtons: todo.find('.buttons .editing'),
         displayButtons: todo.find('.buttons .display')
     }
}

function cancelEdit() {
    var todo = getParentTodo(this);
    var todoElements = getTodoProperties(todo);

    todoElements.editButtons.hide();
    todoElements.displayButtons.show();
    todoElements.todoEditInput.hide();
    todoElements.todoText.show();
}

function saveTodo() {
    var todo = getParentTodo(this);
    var todoElements = getTodoProperties(todo);
  
    todoElements.editButtons.hide();
    todoElements.displayButtons.show();
    todoElements.todoText.text(todoElements.todoEditInput.val());
    todoElements.todoText.show();
    todoElements.todoEditInput.hide();  
}

function startEditTodo() {
    var todo = getParentTodo(this);
    var todoElements = getTodoProperties(todo);
    
    todoElements.displayButtons.hide();
    todoElements.editButtons.show();
    todoElements.todoText.hide();
    todoElements.todoEditInput.val(todoElements.todoText.text());
    todoElements.todoEditInput.show();
    
    function adjust() {
        todo.find('textarea').css('height', 'auto').css('height', todo.find('textarea')[0].scrollHeight );
    }
    
    todo.find('textarea').on('keyup', adjust);
}

function addTodo() {
    var todo = $(todoTemplate);
     
    todo.find('.buttons .editing').hide();
    todo.find('.content .todo-edit-input').hide();
    todo.find('.todo-text').text(todoInput.val() );
    todo.hide();

    todosList.append(todo);
    todo.fadeIn();
    hideNoTodoText();
    todoInput.val('');
    toggleAddButton();
}

function deleteTodo() {
    var todo = getParentTodo(this);
    function doThisAfterAnimation() {
        todo.remove();
        showNoTodoText();
    }

    todo.fadeOut(doThisAfterAnimation);
}

var todoTemplate = `
    <li class="row todo">
        <div class="col-xs-12 col-md-8 col-md-offset-2">
        <div class="content">
          <p class="todo-text"></p>
          <textarea class="form-control todo-edit-input"></textarea>
        </div>
        <div class="buttons">
          <div class="display">
            <button class="btn btn-info edit-btn">Edit</button>
            <button class="btn btn-danger delete-btn">Delete</button>
          </div>
          <div class="editing">
            <button class="btn btn-success save-btn">Save</button>
            <button class="btn btn-danger cancel-btn">Cancel</button>
          </div>
        </div>
        </div>
    </li>`;