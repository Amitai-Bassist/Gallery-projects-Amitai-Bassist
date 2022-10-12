'use strict'

function onInit() {
    renderTodos()
}


function renderTodos() {

    const todos = getTodosForDisplay()

    const strHTMLs = todos.map(todo => `
        <li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
            ${todo.txt}
            <button onclick="onRemoveTodo(event,'${todo.id}')" >X</button>
        </li>
    `)
    document.querySelector('ul').innerHTML = strHTMLs.join('')
    if (!todos.length){
        if (getTotalCount()){
            if (getActiveCount()) {
                document.querySelector('.stat').innerText = 'No Done Todos'
            }else{
                document.querySelector('.stat').innerText = 'No Active Todos'
            }
        }else{
            document.querySelector('.stat').innerText = 'No todos'
        }
    }else{
        var strHTML = `Total: <span class="total">3</span> Active: <span class="active">2</span>` 
        document.querySelector('.stat').innerHTML = strHTML
        document.querySelector('span.total').innerText = getTotalCount()
        document.querySelector('span.active').innerText = getActiveCount()
    }
}


function onRemoveTodo(ev, todoId) {
    if (!confirm('Are you sure?')){
        toggleTodo(todoId)
        return
    } 
    ev.stopPropagation()
    console.log('Removing:', todoId)
    removeTodo(todoId)
    renderTodos()
}

function onToggleTodo(todoId) {
    console.log('Toggling:', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('[name=txt]')
    const txt = elTxt.value
    if (txt) {addTodo(txt)} else {return}
    renderTodos()
    elTxt.value = ''
}

function onSetFilter(filterBy) {
    console.log('filterBy:', filterBy)
    setFilter(filterBy)
    renderTodos()
}

function onSetFilter2(filterBy){
    var importance = 'none'
    var txt = 'none'
    var created = 'none'

    if (filterBy === 'importance'){
        importance = 'inline'
    } else if (filterBy === 'created'){
        created = 'inline'
        renderTimestamps()
    } else{
        txt = 'inline'
    }
    var elImportance = document.querySelector('.importance')
    elImportance.style.display = `${importance}`;
    var elTxt = document.querySelector('.text-filter')
    elTxt.style.display = `${txt}`;
    var elImportance = document.querySelector('.created')
    elImportance.style.display = `${created}`;
}

function renderTimestamps(){
    const timestamps =  getTimestamps()
    console.log(timestamps);
    var strHTMLs = timestamps.map(time => `
    <option value="${time}">${time}</option>
    `)
    strHTMLs =`<option value="5">chose timestamp</option>` + strHTMLs.join('')
    document.querySelector('.created').innerHTML = strHTMLs
}

function onSetImportantFilter(filterBy){
    setSecondaryFilter(filterBy)
    renderTodos()
}


function onSetFilterByTxt(txt) {
    console.log('Filtering by txt', txt)
    setFilterByTxt(txt)
    renderTodos()
}
