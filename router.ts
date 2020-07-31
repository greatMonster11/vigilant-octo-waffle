import {Router} from 'https://deno.land/x/oak/mod.ts'
import {getBook, getBooks, updateBook, deleteBook, addBook} from './controller.ts'

const router = new Router()
router.get('/books', getBooks)
    .get('/book/:id', getBook)
    .post('/books', addBook)
    .put('/books/:id', updateBook)
    .delete('/books/:id', deleteBook)

export default router
