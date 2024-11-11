import { useEffect, useState } from 'react';
import { Books } from '../../services/booksInterface';
import styles from './BookInfo.module.css';
import { Grid2, Rating } from '@mui/material';

type bookProps = {
    book: Books
}

const BookInfo: React.FC<bookProps> = ({book}) => {

    return (
        <Grid2 container spacing={2} className={styles.bookItem} sx={{margin: '.5rem'}}>
            <Grid2 size={2}>
                <img src={(book.volumeInfo.imageLinks == undefined) ? 'src/assets/no_image.jpg' : book.volumeInfo.imageLinks.smallThumbnail} />
            </Grid2>
            <Grid2 size={9}>

                <div className={styles.bookInfos}>
                    <h2>{book.volumeInfo.title}</h2>
                    <p>{book.volumeInfo.authors?.map((author) => {
                        return ' ' + author
                    })}</p>
                    <Rating readOnly name="book-rating" defaultValue={book.volumeInfo.averageRating} precision={0.1} sx={{marginTop: '.2rem'}} />
                    <div className={styles.categoriesDiv}>
                        {book.volumeInfo.categories?.map((category, ind) => {
                            return (<span key={ind} className={styles.category}>{category}</span>)
                        })}
                    </div>
                </div>
            </Grid2>
        </Grid2>
    )
}

export default BookInfo;