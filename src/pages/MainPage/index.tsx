import { useState } from 'react';
import HeadBar from '../../components/HeadBar/HeadBar';
import { Books } from '../../services/booksInterface';
import BookInfo from '../../components/BookInfo/BookInfo';
import styles from './styles.module.css'

const MainPage = () => {
    const [books, setBooks] = useState<Books[]>([]);

    return (
        <>
            <HeadBar />
            <div className={styles.bookListContainer}>
                {books.map((book, ind) => {
                    return (
                        <BookInfo key={ind} book={book} />
                    )
                })}
            </div>
        </>
    )
}

export default MainPage;