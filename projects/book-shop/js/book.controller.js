'use strict'

var gIdxBookOpen

function onInit(){
    renderFilterByQueryStringParams()
    setBookSort({price: 1})
    renderMode()
    renderBooks()
    renderReadBook()
}

function renderBooks(){
    var mode = getUserMode() || 'table'
    var books = getBooksForDisplay()
    var strHtmls
    var elSection = document.querySelector('.books-for-shop')
    var elTbody = document.querySelector('tbody')
    var elTable = document.querySelector('table')
    elSection.style.display = (mode === 'cards') ? '' : 'none'
    elTable.style.display = (mode === 'cards') ? 'none' : ''
    if (mode === 'table'){
        strHtmls = books.map(book => {
            return `<tr>
            <td class="id">${book.id}</td>
            <td class="book-title">${book.name}</td>
            <td class="price">${book.price}</td>
            <td class="book-buttons">
            <button class="read" onclick="onReadBook('${book.id}')">Read</button>
            <button class="update" onclick="onUpdateBook('${book.id}')">Update</button>
            <button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
            </td>
            </tr>`
        })
        
        elTbody.innerHTML = strHtmls.join('')
    } else{
        strHtmls = books.map(book => {
            return `<div class="card" style="display: inline-block;" >
            <h3>${book.name}</h3>
            Price: ${book.price}<br>
            Id: ${book.id}<br>
            <button class="read" onclick="onReadBook('${book.id}')">Read</button>
            <button class="update" onclick="onUpdateBook('${book.id}')">Update</button>
            <button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
            </div>`
        })
        
        elSection.innerHTML = strHtmls.join('')
    }
}

function onAddBook(){
    const bookName = prompt('books name:')
    const bookPrice = prompt('price:')
    addBook(bookName,bookPrice)
    renderBooks()
}

function onReadBook(bookId){
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'block';
    const elBooksName = document.querySelector('.modal h2')
    elBooksName.innerText = getBookName(bookId)
    const strHtmls = `<button class="decrease-rate" onclick="decreaseRate('${bookId}')">-</button>
                    <span class="rate">${getBookRate(bookId)}</span>
                    <button class="add-rate" onclick="addRate('${bookId}')">+</button>`
    const elRate = document.querySelector('.book-rate')
    elRate.innerHTML = strHtmls
    setLocationState(bookId)
}

function closeModal(){
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none';
}

function onUpdateBook(bookId){
    const newPrice = prompt('new price:')
    updateBook(bookId, newPrice)
    onSetSortBy()
    renderBooks()
}

function onRemoveBook(bookId){
    removeBook(bookId)
    renderBooks()
}

function decreaseRate(bookId){
    decreaseBookRate(bookId)
    const elRate = document.querySelector('.rate')
    elRate.innerText = getBookRate(bookId)
}

function addRate(bookId){
    addBookRate(bookId)
    const elRate = document.querySelector('.rate')
    elRate.innerText = getBookRate(bookId)
}

function onSetFilter(value){
    const elTxt = document.querySelector('.text-filter')
    elTxt.placeholder = (value === '') ? 'type txt...' : 'Type a number...'
    setFilterStatus(value)
    setLocationState()
}

function onSetFilterByTxt(value){
    setFilterValue(value)
    renderBooks()
    setLocationState()
}

function onSetSortBy(){
    const prop = document.querySelector('.sort-books').value
    const isDesc = document.querySelector('.sort-desc').checked

    const sortBy = {
        [prop]: (isDesc) ? -1 : 1
    }

    setBookSort(sortBy)
    renderBooks()
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        status: queryStringParams.get('status') || 'price',
        filterValue: +queryStringParams.get('filterValue') || ''
    }

    if (!filterBy.status && !filterBy.filterValue) return

    document.querySelector('.sort-by').value = filterBy.status
    document.querySelector('.text-filter').value = filterBy.filterValue
    setFilterStatus(filterBy.status)
    setFilterValue(filterBy.filterValue)
}

function setLocationState(bookId = ''){
    var filterBy = setBooksFilter()
    var mode = getUserMode()

    const queryStringParams = `?status=${filterBy.status}&filterValue=${filterBy.filterValue}
    &readBook=${bookId}&mode=${mode}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function renderReadBook(){
    const queryStringParams = new URLSearchParams(window.location.search)
    const bookToRead = queryStringParams.get('readBook') || ''
    if (bookToRead) onReadBook(bookToRead)
}

function renderMode(){
    const queryStringParams = new URLSearchParams(window.location.search)
    const mode = queryStringParams.get('mode') || ''
    const elTable = document.querySelector('.table') 
    const elCards = document.querySelector('.cards')
    console.log(mode);
    if (!mode) return
    if (mode === 'cards'){
        elCards.classList.add('selected') 
        elTable.classList.remove('selected') 
    }else{
        elTable.classList.add('selected') 
        elCards.classList.remove('selected') 
    }
    setUserMode(mode)
}

function onChangePage(change){
    changePage(change)
    renderBooks()
    const pageNum = getPageNum()
    const elPage = document.querySelector('.page-num')
    elPage.innerText = pageNum
    const elFirst = document.querySelector('.first')
    const elSecond = document.querySelector('.second')
    const elThird = document.querySelector('.third')
    elFirst.innerText = pageNum - 1
    elSecond.innerText = pageNum
    elThird.innerText = (isLastPage())? pageNum + 1 : ''
    if (pageNum === 1){
        elFirst.innerText = 1
        elSecond.innerText = 2
        elThird.innerText = 3
    }
    elFirst.disabled =  (pageNum === 1)? true: false
    elSecond.disabled =  (pageNum === 1)? false: true
}

function onChangeMode(mode){
    const elTable = document.querySelector('.table') 
    const elCards = document.querySelector('.cards') 
    if (mode === 'cards'){
        elCards.classList.add('selected') 
        elTable.classList.remove('selected') 
    }else{
        elTable.classList.add('selected') 
        elCards.classList.remove('selected') 
    }
    setUserMode(mode)
    setLocationState()
    renderBooks()
}