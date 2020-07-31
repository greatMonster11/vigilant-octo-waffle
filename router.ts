import {Router} from 'https://deno.land/x/oak/mod.ts'
import {getBook, getBooks, updateBook, deleteBook, addBook} from './controller.ts'

const router = new Router()
router.get('/books', getBooks)
    .get('/book/:isbn', getBook)
    .post('/books', addBook)
    .put('/books/:isbn', updateBook)
    .delete('/books/:isbn', deleteBook)

export default router
