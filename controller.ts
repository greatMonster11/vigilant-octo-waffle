interface IBook {
    id: string
    author: string;
    title: string
}

let books: Array<IBook> = [{
    id: "1",
    author: "Robin Wieruch",
    title: "The Road to React",
}, {
    id: "2",
    author: "Kyle Simpson",
    title: "You Don't Know JS: Scope & Closures",
}, {
    id: "3",
    author: "Andreas A. Antonopoulos",
    title: "Mastering Bitcoin",
}]

const getBooks = ({response}: {response: any}) => {
    response.body = books
}

const getBook = ({params, response}: {params: {id: string}; response: any}) => {

    const book: IBook | undefined = searchBookByIsbn(params.id)
    if (book) {
        response.status = 200
        response.body = book
    } else {
        response.status = 404
        response.body = books
    }
}

const addBook = async ({request, response}: {request: any; response: any}) => {
    const body = await request.body()
    const book: IBook = body.value
    books.push(book)
    response.body = {message: "OK"}
    response.status = 200
}

const updateBook = async ({params, request, response}: {params: {id: string}; request: any; response: any}) => {
    let book: IBook | undefined = searchBookByIsbn(params.id)
    if (book) {
        const body = await request.body()
        const updateInfos: {author?: string; title?: string} = body.value
        book = {...book, ...updateInfos}
        books = [...books.filter(book => book.id !== params.id), book]
        response.status = 200
        response.body = {message: 'OK'}
    } else {
        response.status = 404
        response.body = {message: `Book not found`}
    }

}

const deleteBook = ({params, response}: {params: {id: string}; response: any}) => {
    books = books.filter(book => book.id !== params.id)
    response.body = {message: "OK"}
    response.status = 200
}

// return the book if found and undefined if not
const searchBookByIsbn = (id: string): (IBook | undefined) => books.filter(book => book.id === id)[0]

export {getBook, getBooks, addBook, updateBook, deleteBook}
