import * as todo from "./todo";

const categoryNames = [];
export const subCategoryButtons = [];

export function createPageSections() {
    const body = document.body;
    const header = document.createElement("header");
    const headerH = document.createElement("h4");
    headerH.textContent = "To Do List App";
    // header.appendChild(headerH);

    const clock = document.createElement("h4");
    clock.id = "clock";

    function time() {
        let d = new Date();

        let day = d.toLocaleString('en-US', {weekday: 'long'});
        let date = d.toLocaleString('default', {date: 'long'});

        clock.textContent = `${day} ${date}`;

    }
    time();
    setInterval(time, 1000);
    header.appendChild(clock);

    const leftMenu = document.createElement("menu");
    leftMenu.id = "left-menu";
    const addCategoryBtn = document.createElement("button");
    addCategoryBtn.id = "add-category";
    const addCatIcon = document.createElement("i");
    addCatIcon.classList.add("bi");
    addCatIcon.classList.add("bi-bookmarks-fill");
    addCategoryBtn.appendChild(addCatIcon);
    const addCatText = document.createElement("span");
    addCatText.textContent = "Category";
    addCategoryBtn.appendChild(addCatText);
    const addSubcatBtn = document.createElement("button");
    addSubcatBtn.id = "add-subcategory";
    const addSubcatIcon = document.createElement("i");
    addSubcatIcon.classList.add("bi");
    addSubcatIcon.classList.add("bi-bookmark-star-fill");
    addSubcatBtn.appendChild(addSubcatIcon);
    const addSubcatText = document.createElement("span");
    addSubcatText.textContent = "Subcategory";
    addSubcatBtn.appendChild(addSubcatText);

    const addTask = document.createElement("button");
    addTask.id = "add-task";
    const addIcon = document.createElement("i");
    addIcon.classList.add("bi");
    addIcon.classList.add("bi-check-circle-fill");
    addTask.appendChild(addIcon);
    const addTaskText = document.createElement("span");
    addTaskText.textContent = "Task";
    addTask.appendChild(addTaskText);

    const modalDiv = document.createElement("div");
    modalDiv.classList.add("modal");
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    const closeModal = document.createElement("span");
    closeModal.classList.add("close");
    closeModal.textContent = "X";

    modalContent.appendChild(closeModal);
    modalDiv.appendChild(modalContent);


    body.appendChild(modalDiv);

    closeModal.onclick = () => {
        modalDiv.style.display = "none";
    }

    addCategoryBtn.onclick = () => {
        while (modalContent.childNodes.length > 1) {
            modalContent.removeChild(modalContent.lastChild);
        }

        modalDiv.style.display = "inline-block";

        const catLb = document.createElement("label");
        catLb.textContent = "New Category: ";
        catLb.htmlFor = "new-cat";
        const catIn = document.createElement("input");
        catIn.type = "text";
        catIn.name = "new-cat";

        const addButton = document.createElement("button");
        addButton.textContent = "Add Category";
        addButton.type = "button";

        addButton.onclick = () => {
            let newCat = catIn.value;
            let usedName = categoryNames.filter(names => names === newCat);
            if (usedName.length > 0){
                alert("Category name already in use");
                return false;
            }
            addCategoryDom(newCat);
            modalDiv.style.display = "none";
        }

        modalContent.appendChild(catLb);
        modalContent.appendChild(catIn);
        modalContent.appendChild(addButton);

    }

    addSubcatBtn.onclick = () => {
        while (modalContent.childNodes.length > 1) {
            modalContent.removeChild(modalContent.lastChild);
        }

        modalDiv.style.display = "inline-block";
        let parentLb = document.createElement("label");
        parentLb.htmlFor = "parent-cat";
        parentLb.textContent =  "Category: ";

        let parentIn = document.createElement("select");
        let parentOpts = categoryNames.filter(names => {
            return names != "All" && names != "Unsorted";
        })
        parentOpts.forEach(opt => {
            let parentOpt = document.createElement("option");
            parentOpt.value = opt;
            parentOpt.textContent = opt;
            parentIn.appendChild(parentOpt);
        });

        let subcatLb = document.createElement("label");
        subcatLb.htmlFor = "subcat-in";
        subcatLb.textContent = "Subcategory Name: ";
        let subcatIn = document.createElement("input");
        subcatIn.name = "subcat-in";
        subcatIn.type = "text";
        console.log(subCategoryButtons);
        let addButton = document.createElement("button");
        addButton.type = "button";
        addButton.textContent = "Add Subcategory";
        addButton.onclick = () => {
            let newSubcat = subcatIn.value;
            let parentCat = parentIn.value;
            let parentSubs = subCategoryButtons.filter(btns => btns.parent === parentCat);
            let subcatNames = parentSubs.filter(btns => btns.name === newSubcat);
            if (subcatNames.length == 0) {
                addSubcategoryDom(newSubcat, parentCat);
                modalDiv.style.display = "none";
                const subcategoryDiv = document.getElementById("subcategories");

                const subCategoryObj = subCategoryButtons.filter(obj => obj.parent === parentCat);
                console.log(subCategoryObj);

                
                subCategoryObj.forEach(obj => {
                    if (document.getElementsByClassName("active")[0].textContent === parentCat) {
                        while (subcategoryDiv.childNodes.length > subCategoryObj.length) {
                            subcategoryDiv.removeChild(subcategoryDiv.lastChild);
                        }
                        subcategoryDiv.appendChild(obj.button);
                        obj.button.classList.remove("active");
                    }
                    else {

                    }
                });

                // let newSubcatObj = subCategoryButtons.filter(btn => btn.name === newSubcat);
                // console.log(newSubcatObj);
                // let newSubcatBtn = newSubcatObj.button;
                // console.log(newSubcatBtn);
                // subcategoryDiv.appendChild(newSubcatBtn);

                
            }
            else {
                alert("Subcategory name in use");
            }
        }

        modalContent.appendChild(parentLb);
        modalContent.appendChild(parentIn);
        modalContent.appendChild(subcatLb);
        modalContent.appendChild(subcatIn);
        modalContent.appendChild(addButton);

    }

    addTask.onclick = () => {
        while (modalContent.childNodes.length > 1) {
            modalContent.removeChild(modalContent.lastChild);
        }

        modalDiv.style.display = "inline-block";

        const taskForm = document.createElement("form");
        taskForm.id = "task-form";
        const titleLb = document.createElement("label");
        titleLb.htmlFor = "title";
        titleLb.textContent = "Task: ";
        const titleIn = document.createElement("input");
        titleIn.type = "text";
        titleIn.name = "title";
        titleIn.required = "true";
        taskForm.appendChild(titleLb);
        taskForm.appendChild(titleIn);

        const detailLb = document.createElement("label");
        detailLb.htmlFor = "detail";
        detailLb.textContent = "Details: ";
        const detailIn = document.createElement("textarea");
        detailIn.rows = "1";
        detailIn.cols = "16";
        detailIn.name = "detail";
        taskForm.appendChild(detailLb);
        taskForm.appendChild(detailIn);

        const dueDateLb = document.createElement("label");
        dueDateLb.htmlFor = "date";
        dueDateLb.textContent = "Due Date: ";
        const dueDateIn = document.createElement("input");
        dueDateIn.type = "datetime-local";
        dueDateIn.name = "date";
        taskForm.appendChild(dueDateLb);
        taskForm.appendChild(dueDateIn);

        const priorityList = document.createElement("div"); 
        priorityList.id = "priority-list";
        const pList = document.createElement("p");
        pList.textContent = "Priority:";
        priorityList.appendChild(pList);
        const lowPrioIn = document.createElement("input");
        lowPrioIn.type = "radio";
        lowPrioIn.id = "priority-1";
        lowPrioIn.name = "priority";
        lowPrioIn.value = "Low";
        priorityList.appendChild(lowPrioIn);
        const lowPrioLb = document.createElement("label");
        lowPrioLb.htmlFor = "priority-1";
        lowPrioLb.textContent = "Low";
        priorityList.appendChild(lowPrioLb);
        const normPrioIn = document.createElement("input");
        normPrioIn.type = "radio";
        normPrioIn.id = "priority-2";
        normPrioIn.name = "priority";
        normPrioIn.value = "Normal";
        normPrioIn.checked = true;
        priorityList.appendChild(normPrioIn);
        const normPrioLb = document.createElement("label");
        normPrioLb.htmlFor = "priority-2";
        normPrioLb.textContent = "Normal";
        priorityList.appendChild(normPrioLb);
        const hiPrioIn = document.createElement("input");
        hiPrioIn.type = "radio";
        hiPrioIn.id = "priority-3";
        hiPrioIn.name = "priority";
        hiPrioIn.value = "High";
        priorityList.appendChild(hiPrioIn);
        const hiPrioLb = document.createElement("label");
        hiPrioLb.htmlFor = "priority-3";
        hiPrioLb.textContent = "High";
        priorityList.appendChild(hiPrioLb);
        taskForm.appendChild(priorityList);

        const catLb = document.createElement("label");
        catLb.htmlFor = "category-select";
        catLb.textContent = "Category: ";
        taskForm.appendChild(catLb);
        const categoryList = document.createElement("select");
        const categoryDefault = document.createElement("option");
        categoryDefault.value = "-";
        categoryDefault.textContent = "-"
        categoryList.appendChild(categoryDefault);

        const subCatLb = document.createElement("label");
        const subCatList = document.createElement("select");

        categoryDefault.onclick = () => {
            while(subCatList.firstChild) {
                subCatList.removeChild(subCatList.firstChild);
            }
        }

        categoryList.id = "category-list";
        categoryList.name = "category-select";
        categoryNames.forEach(category => {
            if (category !== "All" && category !== "Unsorted") {
                let catOpt = document.createElement("option");
                catOpt.value = category;
                catOpt.textContent = category;
                catOpt.onclick = () => {
                    while(subCatList.firstChild) {
                        subCatList.removeChild(subCatList.firstChild);
                    }
                    console.log("subcategoryButtons:");
                    console.log(subCategoryButtons);
                    let catParent = categoryList.value;
                    console.log("catParent:");
                    console.log(catParent);
                    let subcatOptions = [];
                    subCategoryButtons.forEach(obj => {
                        if (obj.parent === catParent) {
                            subcatOptions.push(obj.name);
                        }
                    })
                    console.log("subcatOptions (array)");
                    console.log(subcatOptions);
                    let subcatDef = document.createElement("option");
                    subcatDef.value = "-";
                    subcatDef.textContent = "-";
                    subCatList.appendChild(subcatDef);
                    subcatOptions.forEach(subcat => {
                        let subcatOpt = document.createElement("option");
                        subcatOpt.value = subcat;
                        subcatOpt.textContent = subcat;
                        subcatOpt.onclick = () => {
                            subcatOpt.setAttribute("select", "true");
                        }
                        subCatList.appendChild(subcatOpt);
                    })
                }
                categoryList.appendChild(catOpt);
            }
        })
        taskForm.appendChild(categoryList);

        // const subCatLb = document.createElement("label");
        subCatLb.htmlFor = "subcat-select";
        subCatLb.textContent = "Subcategory"
        taskForm.appendChild(subCatLb);
        // const subCatList = document.createElement("select");
        subCatList.name = "subcat-select";
        subCatList.setAttribute("placeholder", "-");
        taskForm.appendChild(subCatList);

        const addButton = document.createElement("button");
        addButton.textContent = "Add Task";
        addButton.type = "button";
        // function buttonTest() {
        //     console.log("wtf is with this button");
        // }
        // addButton.addEventListener("click", buttonTest);
        addButton.onclick = function() {
            let newTask = todo.newTodo(titleIn.value, detailIn.value, dueDateIn.value, document.querySelector('input[name="priority"]:checked').value);
            newTask.category = categoryList.value;
            newTask.subcategory = subCatList.value;
            if (todo.addToList(newTask)){
                if (document.getElementsByClassName("active")[0].textContent == "All") {
                    addTodoDom(newTask);
                }
                if (document.getElementsByClassName("active")[0].textContent == categoryList.value) {
                    if (!(document.getElementsByClassName("active")[1]) || document.getElementsByClassName("active")[1].textContent === subCatList.value){
                        addTodoDom(newTask);
                        console.log("weird conditional satisfied");
                    }
                }
                modalDiv.style.display = "none";
            }
        }
        taskForm.appendChild(addButton);
        
        // const catIn = document.createElement("input");
        // catIn.setAttribute("list", "category-list");
        // catIn.name = "category-select";
        // catIn.classList.add("myarrow");
        // taskForm.appendChild(catIn);

        


        


        modalContent.appendChild(taskForm);
    }

    // const addButton = document.createElement("button");
    // addButton.type = "button";
    // addButton.textContent = "Add Task Why am i not working";
    // function buttonTest() {
    //     console.log("wtf is with this button");
    //     modalDiv.style.display = "none";
    // }
    // addButton.addEventListener("click", buttonTest);
    // modalDiv.appendChild(addButton);
    
    

    leftMenu.appendChild(addCategoryBtn);
    leftMenu.appendChild(addSubcatBtn);
    leftMenu.appendChild(addTask);

    const rightMenu = document.createElement("menu");
    rightMenu.id = "right-menu";

    
    const catIcon = document.createElement("i");
    catIcon.classList.add("bi");
    catIcon.classList.add("bi-bookmarks-fill");
    
    const subcatIcon = document.createElement("i");
    subcatIcon.classList.add("bi");
    subcatIcon.classList.add("bi-bookmark-star-fill");
    

    const categories = document.createElement("section");
    categories.id = "categories";
    const catP = document.createElement("p");
    catP.textContent = "Categories";
    categories.appendChild(catIcon);
    // categories.appendChild(catP);
    const subcategories = document.createElement("section");
    subcategories.id = "subcategories";
    const subP = document.createElement("p");
    subP.textContent = "Subcategories";
    subcategories.appendChild(subcatIcon);
    // subcategories.appendChild(subP);
    const content = document.createElement("section");
    content.id = "content";



    body.appendChild(header);
    body.appendChild(leftMenu);
    body.appendChild(rightMenu);
    body.appendChild(categories);
    body.appendChild(subcategories);
    body.appendChild(content);
}

export function addTodoDom(todoObject) {
    const parent = document.getElementById("content");

    const newTodo = document.createElement("div");
    newTodo.classList.add("todo");
    if (todoObject.done === true) {
        newTodo.classList.add("done");
    }
    const todoText = document.createElement("div");
    todoText.classList.add("todo-text");

    const todoInfo = document.createElement("div");
    todoInfo.classList.add("todo-info");
    const todoTitle = document.createElement("h3");
    const todoIcon = document.createElement("i");
    todoIcon.classList.add("bi");
    todoIcon.classList.add("bi-check-circle-fill");
    // todoTitle.appendChild(todoIcon);
    const todoTitleText = document.createElement("span");
    todoTitleText.textContent = todoObject.title;
    todoTitle.appendChild(todoTitleText);
    const todoDetail = document.createElement("p");
    todoDetail.textContent = todoObject.details;
    todoInfo.appendChild(todoTitle);
    todoInfo.appendChild(todoDetail);
    todoText.appendChild(todoInfo);

    const todoShow = document.createElement("button");
    todoShow.style.cursor = "pointer";
    const moreIcon = document.createElement("i");
    moreIcon.classList.add("bi");
    moreIcon.classList.add("bi-caret-down-fill");
    todoShow.appendChild(moreIcon);
    todoShow.classList.add("more-less");
    const lessIcon = document.createElement("i");
    lessIcon.classList.add("bi");
    lessIcon.classList.add("bi-caret-up-fill");
    todoShow.onclick = function() {
        if (newTodo.classList.contains("todo-show")) {
            newTodo.classList.toggle("todo-show");
            todoShow.removeChild(lessIcon);
            todoShow.appendChild(moreIcon);
        }
        else {
            newTodo.classList.toggle("todo-show");
            todoShow.removeChild(moreIcon);
            todoShow.appendChild(lessIcon);
        }
    }

    if (todoDetail.textContent.length > 125) {
        todoText.appendChild(todoShow);
    }

    
    const todoCategory = document.createElement("div");
    todoCategory.classList.add("todo-categories");
    const category = document.createElement("h4");
    category.textContent = todoObject.category;
    const subcategory = document.createElement("p");
    subcategory.textContent = todoObject.subcategory;
    todoCategory.appendChild(category);
    todoCategory.appendChild(subcategory);
    todoText.appendChild(todoCategory);


    newTodo.appendChild(todoText);


    const todoDue = document.createElement("div");
    todoDue.classList.add("todo-due");
    const due = document.createElement("p");
    due.textContent = todoObject.dueDate;
    const prioP = document.createElement("p");
    prioP.textContent = todoObject.priority;
    todoDue.appendChild(due);
    todoDue.appendChild(prioP);
    newTodo.appendChild(todoDue);

    const todoButtons = document.createElement("div");
    todoButtons.classList.add("todo-buttons");
    const completeBtn = document.createElement("button");
    completeBtn.style.width = "2rem";
    const noCheckIcon = document.createElement("i");
    noCheckIcon.classList.add("bi");
    noCheckIcon.classList.add("bi-circle-fill");
    const checkIcon = document.createElement("i");
    checkIcon.classList.add("bi");
    checkIcon.classList.add("bi-check-circle-fill");
    if (todoObject.done) completeBtn.appendChild(checkIcon);
    else completeBtn.appendChild(noCheckIcon);

    completeBtn.onclick = function() {
        if (todoObject.done === false) {
            todoObject.done = true;
            completeBtn.removeChild(noCheckIcon);
            completeBtn.appendChild(checkIcon);
            newTodo.classList.toggle("done");
        }
        else {
            todoObject.done = false;
            completeBtn.removeChild(checkIcon);
            completeBtn.appendChild(noCheckIcon);
            newTodo.classList.toggle("done");
        }
    }
    todoButtons.appendChild(completeBtn);
    const deleteBtn = document.createElement("button");
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("bi");
    deleteIcon.classList.add("bi-x-lg");
    deleteBtn.appendChild(deleteIcon);
    deleteBtn.onclick = function() {
        if (confirm("Delete this task?")) {
            todo.removeTodo(todoObject.title);
            parent.removeChild(newTodo);
        }
    }
    todoButtons.appendChild(deleteBtn);
    newTodo.appendChild(todoButtons);


    parent.appendChild(newTodo);
}

export function addSubcategoryDom(name, parentCategory) {
    // const newSubCategory = createSubcategory(name, parentCategory);
    // subCategories.push(newSubCategory);
    // const todoListFiltered = todo.todoList.filter(obj => obj.category === parentCategory);

    const subcategoryButton = document.createElement("button");
    subcategoryButton.textContent = name;
    // subcategoryButton.classList.add("subcategory");
    
    subcategoryButton.name = parentCategory;
    let subcatTodos = todo.getSubcategoryTodos(name, parentCategory, todo.todoList);
    subcategoryButton.onclick = function() {
    subcatTodos = todo.getSubcategoryTodos(name, parentCategory, todo.todoList);
        const load = (todo, i) => {
            setTimeout(function() {
                addTodoDom(todo);
            }, i * 100);
        }
        const parentContent = document.getElementById("content");
        while (parentContent.firstChild) {
            parentContent.removeChild(parentContent.firstChild);
        }
        
        for (let i = 0; i < subcatTodos.array.length; i++) {
            load(subcatTodos.array[i], i);
        }
        let subcategoryDiv = document.getElementById("subcategories");
        subcategoryDiv.childNodes.forEach(btn => btn.classList.remove("active"));
        subcategoryButton.classList.add("active");
    }
    subcatTodos.button = subcategoryButton;
    subCategoryButtons.push(subcatTodos);


}

export function addCategoryDom(name) {
    
    categoryNames.push(name);
    const categoryDiv = document.getElementById("categories");
    const categoryButton = document.createElement("button");
    categoryButton.textContent = name;
    categoryButton.classList.add("category");
    if (name === "All") categoryButton.classList.add("active");
    categoryButton.onclick = function() {
        const load = (todo, i) => {
            setTimeout(function() {
                addTodoDom(todo);
            }, i * 100);
        }

        categoryDiv.childNodes.forEach(btn => btn.classList.remove("active"));
        categoryButton.classList.add("active");

        const parentContent = document.getElementById("content");
        

        while (parentContent.firstChild) {
            parentContent.removeChild(parentContent.firstChild);
        }

        // -- //
        const categoryTodos = todo.getCategoryTodos(name, todo.todoList);
        for (let i = 0; i < categoryTodos.array.length; i++) {
            load(categoryTodos.array[i], i);
        }

        // -- //
        const subcategoryDiv = document.getElementById("subcategories");
        while (subcategoryDiv.childNodes.length > 1) {
            subcategoryDiv.removeChild(subcategoryDiv.lastChild);
        }

        const subCategoryObj = subCategoryButtons.filter(obj => obj.parent === name);

        
        subCategoryObj.forEach(obj => {
            subcategoryDiv.appendChild(obj.button);
            obj.button.classList.remove("active");
        });


    }
    categoryDiv.appendChild(categoryButton);

}