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
    var inputContent = elements.todoInput.val();
    if(inputContent.length > 0) {
        elements.addButton.attr('disabled', false);
    } else {
        elements.addButton.attr('disabled', true);
    }

}

function showNoTodoText() {
    var todoChildren = elements.todosList.children();

    if(todoChildren.length === 0) {
        elements.noTodoText.show();
    }
}

function hideNoTodoText() {
    elements.noTodoText.hide();
}

function getParentTodo(button) {
    var todo = $(button).closest('.todo');
    return todo;
}

function cancelEdit() {
    var todo = getParentTodo(this);
    var todoEditInput = todo.find('.content .todo-edit-input');
    var todoText = todo.find('.content .todo-text');
    var editButtons = todo.find('.buttons .editing');
    var displayButtons = todo.find('.buttons .display');

    editButtons.hide();
    displayButtons.show();

    todoEditInput.hide();
    todoText.show();
}

function saveTodo() {
    var todo = getParentTodo(this);
    var todoEditInput = todo.find('.content .todo-edit-input');
    var todoText = todo.find('.content .todo-text');
    var editButtons = todo.find('.buttons .editing');
    var displayButtons = todo.find('.buttons .display');
  
    editButtons.hide();
    displayButtons.show();
  
    todoText.text(todoEditInput.val());
    todoText.show();
    todoEditInput.hide();  
}

function startEditTodo() {
    var todo = getParentTodo(this);
    var todoText = todo.find('.content .todo-text');
    var todoEditInput = todo.find('.content .todo-edit-input');
    var editButtons = todo.find('.buttons .editing');
    var displayButtons = todo.find('.buttons .display');

    displayButtons.hide();
    editButtons.show();

    todoText.hide();
    todoEditInput.val(todoText.text());
    todoEditInput.show();
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