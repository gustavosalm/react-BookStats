import { getBooks } from '../../services/booksService';
import { useState, useEffect } from 'react';
import HeadBar from '../../components/HeadBar/HeadBar';
import { Books } from '../../services/booksInterface';
import BookInfo from '../../components/BookInfo/BookInfo';
import styles from './styles.module.css'

const MainPage = () => {
    const [books, setBooks] = useState<Books[]>([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        setNewsList()
    }, [filter]);

    const setNewsList = async () => {
        try {
            const response = await getBooks();
            const newData = response.data.items.map((item: any) => ({
                id: item.id,
                volumeInfo: {
                    authors: item.volumeInfo.authors,
                    imageLinks: item.volumeInfo.imageLinks,
                    title: item.volumeInfo.title,
                    averageRating: item.volumeInfo.averageRating,
                    categories: item.volumeInfo.categories
                }
            } as Books));
            setBooks(newData);
        } catch(error) {
            console.log(error)
        }
    }

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