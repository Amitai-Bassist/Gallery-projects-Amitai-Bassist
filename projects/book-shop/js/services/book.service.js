'use strict'

const STORAGE_KEY = 'booksDB'
const PAGE_SIZE = 5

var gBooksNames = ['Harry Potter','Percy Jackson','Hamosad','puki','5 Baloons','The Maze','Hanger games',
                'The Bible','it','I am So Glad You Were Born',
                'Busy Betty','Stephen King','The Boys from Biloxi','Cooking from the Spirit']

var gBooks
var gPageIdx = 0
var gFilterBy = {
    status: 'price',
    filterValue: ''
}

_createBooks()

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)

    if (!books || !books.length) {
        books = gBooksNames
        books = books.map(name => _createBook(name, getRandomIntInclusive(50, 500)))
    }
    gBooks = books
    _saveBooksToStorage()
}

function addBook(name, price) {
    const book = _createBook(name, price)
    gBooks.unshift(book)
    _saveBooksToStorage()
}

function _createBook(name, price) {
    return {
        id: makeId(),
        name,
        price,
        imgUrl: '',
        rate: 0
    }
}

function getBooksForDisplay() {
    const startIdx = gPageIdx * PAGE_SIZE

    if (gFilterBy.status === ''){
        var books = gBooks.filter(book => {
            return book.name.toLowerCase().includes(gFilterBy.filterValue.toLowerCase())
        })
        return books.slice(startIdx, startIdx + PAGE_SIZE)
    }else if (gFilterBy.filterValue){
        var books = gBooks.filter(book => {
            return (book.price <= +gFilterBy.filterValue && gFilterBy.status === 'price') ||
            (gFilterBy.status === 'min-rate' && book.rate >= gFilterBy.filterValue)})
            return books.slice(startIdx, startIdx + PAGE_SIZE)
    }
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function updateBook(bookId, newPrice) {
    const book = _getBookById(bookId)
    book.price = newPrice
    _saveBooksToStorage()
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function getBookName(bookId) {
    return _getBookById(bookId).name
}

function decreaseBookRate(bookId) {
    const book = _getBookById(bookId)
    book.rate--
    _saveBooksToStorage()
}

function addBookRate(bookId) {
    const book = _getBookById(bookId)
    book.rate++
    _saveBooksToStorage()
}

function _getBookById(bookId){
    return gBooks.find(book => book.id === bookId)
}

function getBookRate(bookId){
    const book = _getBookById(bookId)
    return book.rate
}

function setFilterStatus(value){
    gFilterBy.status = value
}

function setFilterValue(value){
    gFilterBy.filterValue = value
}

function setBooksFilter() {
    return gFilterBy
}

function setBookSort(sortBy = {}){
    if (sortBy.price !== undefined) {
        gBooks.sort((c1, c2) => (c1.price - c2.price) * sortBy.price)
    } else if (sortBy.name !== undefined) {
        gBooks.sort((c1, c2) => c1.name.localeCompare(c2.name) * sortBy.name)
    }
}

function changePage(change){
    switch(change) {
        case 'next':
            gPageIdx++
          break;
        case 'prev':
            gPageIdx--
          break;
        default:
            if (gPageIdx < 2){
                gPageIdx = +change
            } else if (change === 0){
                gPageIdx--
            }else gPageIdx++
      }
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0
    }
    if (gPageIdx < 0){
        gPageIdx = Math.floor(gBooks.length / PAGE_SIZE)
    }
}

function getPageNum(){
    return gPageIdx + 1
}

function isLastPage(){
    return (gPageIdx + 1) * PAGE_SIZE <= gBooks.length
}

function setUserMode(mode){
    saveToStorage('favLayout',mode)
}

function getUserMode(){
    return loadFromStorage('favLayout')
}