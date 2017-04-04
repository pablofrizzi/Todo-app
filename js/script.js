$(document).ready(main);

function main() {
    elements.addButton.attr('disabled', true);
    elements.todoInput.on('keyup', toggleAddButton);
    elements.addButton.on('click', addTodo);
    elements.todosList.on('click', '.delete-btn', deleteTodo);
    elements.todosList.on('click', '.edit-btn', startEditTodo);
    elements.todosList.on('click', '.save-btn', saveTodo);
    elements.todosList.on('click', '.cancel-btn', cancelEdit);
    
}

var elements = {
    addButton: $('#add-btn'),
    todosList: $('.todos'),
    todoInput: $('#todo-input'),
    noTodoText: $('#no-todo')
};

function toggleAddButton() {

    if(elements.todoInput.val().length > 0) {
        elements.addButton.attr('disabled', false);
    } else {
        elements.addButton.attr('disabled', true);
    }

}

function showNoTodoText() {
    if(elements.todosList.children().length === 0) {
        elements.noTodoText.show();
    }
}

function hideNoTodoText() {
    elements.noTodoText.hide();
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
}

function addTodo() {
    var todo = $(todoTemplate);
     
    todo.find('.buttons .editing').hide();
    todo.find('.content .todo-edit-input').hide();

    todo.find('.todo-text').text( elements.todoInput.val() );
    todo.hide();

    elements.todosList.append(todo);

    todo.fadeIn();

    hideNoTodoText();

    elements.todoInput.val('');

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
    <li class="todo">
    <div class="content">
      <p class="todo-text"></p>
      <input type="text" class="todo-edit-input">
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
    </li>`;