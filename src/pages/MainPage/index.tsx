import { getBooks, getBooksByAuthor, getBooksByTitle } from '../../services/booksService';
import { useState, useEffect } from 'react';
import HeadBar from '../../components/HeadBar/HeadBar';
import { Books } from '../../services/booksInterface';
import BookInfo from '../../components/BookInfo/BookInfo';
import styles from './styles.module.css'
import GraphContainer from '../../components/GraphContainer/GraphContainer';
import { Grid2 } from '@mui/material';

const MainPage = () => {
    const [filter, setFilter] = useState('');
    const [books, setBooks] = useState<Books[]>([]);    // Lista de livros a serem exibidos
    const [currentState, setCurrent] = useState('');    // Se uma busca foi feita ou não
    
    useEffect(() => {
        getBooksList();
    }, [filter]);

    // Realiza a busca pelo filtro de pesquisa e exibe na lista de livros
    const handleSearch = async (searchText: string) => {
        // Se uma busca for feita com o texto vazio e estiver exibindo o resultado
        // de uma busca, ele volta a exibir os resultados padrão que mostra no começo
        if (searchText === '' && currentState === 'search'){
            getBooksList();
            return;
        }
        const titleResponse = await getBooksByTitle(searchText);    // Busca os livros por título
        const authorResponse = await getBooksByAuthor(searchText);  // Busca os livros pelo autor

        // Junta ambas as listas em uma só para serem exibidas
        const fullList = titleResponse.data.items.concat(authorResponse.data.items);
        setBooksList(fullList);

        // Muda o estado para que está exibindo o resultado de uma busca
        setCurrent('search');
    }

    // Reseta os livros exibidos para o estado padrão se estiver exibindo o resultado de uma busca
    const resetSearch = () => {
        if (currentState === 'default') return;
        getBooksList();
    }

    // Faz uma chamada a API com o filtro padrão definido no service e exibe na lista
    const getBooksList = async () => {
        try {
            const response = await getBooks();
            setBooksList(response.data.items);
            setCurrent('default');
        } catch(error) {
            console.log(error)
        }
    }

    // Pega os livros resultantes de uma busca, ordena-os e exibe na lista de livros
    const setBooksList = (responseItems: any) => {
        // Filtra somente os atributos que são úteis para a exibição
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

        // Ordena os livros baseado na quantidade de avaliações
        setBooks(newData.sort(
            (a: Books, b: Books) => {
                return b.volumeInfo.ratingsCount - a.volumeInfo.ratingsCount
            }
        ));
    }

    return (
        <>
            <HeadBar searchHandler={handleSearch} resetSearch={resetSearch} />
            <Grid2 container sx={{padding: '.5rem 0'}} className={styles.mainGrid}>
                <Grid2 size={8} className={styles.bookListContainer}>
                    {books.map((book, ind) => {
                        return (
                            <BookInfo key={ind} book={book} />
                        )
                    })}
                </Grid2>
                <Grid2 size={4}>
                    <GraphContainer />
                </Grid2>
            </Grid2>
        </>
    )
}

export default MainPage;