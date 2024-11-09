import { getBooks, getBooksByAuthor, getBooksByTitle } from '../../services/booksService';
import { useState, useEffect } from 'react';
import HeadBar from '../../components/HeadBar/HeadBar';
import { Books } from '../../services/booksInterface';
import BookInfo from '../../components/BookInfo/BookInfo';
import styles from './styles.module.css'

const MainPage = () => {
    const [books, setBooks] = useState<Books[]>([]);
    const [filter, setFilter] = useState('');
    
    useEffect(() => {
        getBooksList()
    }, [filter]);

    const _handleKeyDown = async (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const searchText = (e.target as HTMLInputElement).value
            if (searchText === '')
                return;
            const titleResponse = await getBooksByTitle(searchText);
            const authorResponse = await getBooksByAuthor(searchText);
            const fullList = titleResponse.data.items.concat(authorResponse.data.items);
            setBooksList(fullList);
        }
    }

    const getBooksList = async () => {
        try {
            const response = await getBooks();
            setBooksList(response.data.items);
        } catch(error) {
            console.log(error)
        }
    }

    const setBooksList = (responseItems: any) => {
        const newData = responseItems.map((item: any) => ({
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
    }

    return (
        <>
            <HeadBar searchHandler={_handleKeyDown} />
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