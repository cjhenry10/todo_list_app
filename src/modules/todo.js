export const todoList = [];

export const newTodo = (title, details, dueDate, priority) => {
    let category, subcategory = "-";
    let done = false;
    return { title, details, dueDate, priority, category, subcategory, done }
}

export function addToList(todo) {
    if (todo.title == "") {
        alert("Title required");
        return false;
    }
    else if (todoList.filter(item => item.title == todo.title).length == 0){
        todoList.push(todo);
        return true;
    }
    else {
        alert("todo already added, try another name");
        return false;
    }

}

export function removeTodo(title) {
    let objIndex = todoList.findIndex((obj) => obj.title === title);
    todoList.splice(objIndex, 1);
}

export const getCategoryTodos = (name, mainTodoList) => {
    if (name === "All") {
        return { name: name, array: mainTodoList };
    }
    const unsortedTodo = mainTodoList.filter(obj => obj.category === "-");
    if (name === "Unsorted") {
        return { name: name, array: unsortedTodo };
    }

    const filteredTodoList = mainTodoList.filter(obj => obj.category === name);
    return { name: name, array: filteredTodoList };
}

export const getSubcategoryTodos = (name, parentCategory, mainTodoList) => {
    let button;
    const unsortedTodo = mainTodoList.filter(obj => obj.subcategory === "-");
    if (name === "Unsorted") {
        return { name: name, parent: parentCategory, array: unsortedTodo }
    }

    const filteredTodoList = mainTodoList.filter(obj => obj.subcategory === name);
    return { name: name, parent: parentCategory, array: filteredTodoList, button }
}