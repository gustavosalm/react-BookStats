import { Books } from '../../services/booksInterface';
import styles from './BookInfo.module.css';

type bookProps = {
    book: Books
}

const BookInfo: React.FC<bookProps> = ({book}) => {

    return (
        <div className={styles.bookItem}>
            <img src={book.volumeInfo.imageLinks.smallThumbnail} />
            <div className={styles.bookInfos}>
                <h2>{book.volumeInfo.title}</h2>
                <p>{book.volumeInfo.authors.map((author) => {
                    return ' ' + author
                })}</p>
                <div className={styles.bookRate} style={{'--rating': (book.volumeInfo.averageRating/5)} as React.CSSProperties}>
                    <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                </div>
                <div className={styles.categoriesDiv}>
                    {book.volumeInfo.categories.map((category) => {
                        return (<p className={styles.category}>{category}</p>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default BookInfo;