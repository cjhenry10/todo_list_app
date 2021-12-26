// import {todo, addTodoArray, removeTodo, todoList} from './modules/todo';
import * as todo from './modules/todo';
import {createPageSections, addTodoDom, addCategoryDom, addSubcategoryDom, subCategoryButtons } from './modules/dom';
import './style.css';

createPageSections();

let newTodo = todo.newTodo("to do test", "asdf", "12/20", 5);
newTodo.category = "category2";
newTodo.subcategory = "subcategory";

// addTodoDom(newTodo);
todo.addToList(newTodo);

let newTodo1 = todo.newTodo("to do test1", "asdfg", "12/21", 3);
newTodo1.category = "category2";
newTodo1.subcategory = "subcategory2";

todo.addToList(newTodo1);

let newTodo2 = todo.newTodo("to do test2", "asdfg", "12/21", 3);
newTodo2.category = "category2";
newTodo2.subcategory = "subcategory2";

todo.addToList(newTodo2)

let newTodo3 = todo.newTodo("to do test3", "asdfg", "12/21", 3);
newTodo3.category = "category2";
newTodo3.subcategory = "subcategory";

todo.addToList(newTodo3);

todo.todoList.forEach(item => addTodoDom(item));
// addTodoArray(newTodo1);
// addTodoDom(newTodo2);
// addTodoArray(newTodo2);
// addTodoDom(newTodo3);
// addTodoArray(newTodo3);
// addTodoDom(newTodo4);
// addTodoArray(newTodo4);
console.log(todo.todoList);

addCategoryDom("All");
addCategoryDom("Unsorted");
addCategoryDom("category");
addCategoryDom("category2");
addSubcategoryDom("subcategory2", "category2");
addSubcategoryDom("subcategory1", "category2");
addSubcategoryDom("subcategory3", "category");


console.log(subCategoryButtons);