import { getBooks, getBooksByAuthor, getBooksByTitle } from '../../services/booksService';
import { useState, useEffect } from 'react';
import HeadBar from '../../components/HeadBar/HeadBar';
import { Books } from '../../services/booksInterface';
import BookInfo from '../../components/BookInfo/BookInfo';
import styles from './styles.module.css'

const MainPage = () => {
    const [books, setBooks] = useState<Books[]>([]);
    const [filter, setFilter] = useState('');
    const [currentState, setCurrent] = useState('');
    
    useEffect(() => {
        getBooksList();
    }, [filter]);

    const handleSearch = async (searchText: string) => {
        if (searchText === '')
            getBooksList();
        const titleResponse = await getBooksByTitle(searchText);
        const authorResponse = await getBooksByAuthor(searchText);
        const fullList = titleResponse.data.items.concat(authorResponse.data.items);
        setBooksList(fullList);
        setCurrent('search');
    }

    const resetSearch = () => {
        if (currentState === 'default') return;
        getBooksList();
    }

    const getBooksList = async () => {
        try {
            const response = await getBooks();
            setBooksList(response.data.items);
            setCurrent('default');
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
                averageRating: (item.volumeInfo.averageRating !== undefined) ? item.volumeInfo.averageRating : 0,
                categories: item.volumeInfo.categories,
                ratingsCount: (item.volumeInfo.ratingsCount !== undefined) ? item.volumeInfo.ratingsCount : 0
            }
        } as Books));
        setBooks(newData.sort(
            (a: Books, b: Books) => {
                return b.volumeInfo.ratingsCount - a.volumeInfo.ratingsCount
            }
        ));
        console.log('aa')
        console.log(books);
    }

    return (
        <>
            <HeadBar searchHandler={handleSearch} resetSearch={resetSearch} />
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