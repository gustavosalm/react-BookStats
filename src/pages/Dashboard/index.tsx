import { Grid2, IconButton, Paper, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './styles.module.css';
import FilterBar from '../../components/FilterBar/FilterBar';
import { useEffect, useState } from 'react';
import BaseBarChart from '../../components/BaseBarChart/BaseBarChart';
import { getBooksWithFilters } from '../../services/booksService';
import BasePizzaChart from '../../components/BasePizzaChart/BasePizzaChart';
import { Link } from 'react-router-dom';

// Tipo dos dados do gráfico que exibe nota média por gênero
interface CategoryData {
    rating: number,
    category: string
}

// Tipo dos dados do gráfico que exibe nota média por ano
interface YearRatingData {
    rating: number,
    year: string
}

// Tipo dos dados dos gráficos de pizza
interface PizzaChartData {
    label: string,
    value: number
}

// Filtros de busca
interface Filters {
    author: string,
    title: string,
    category: string[]
}

const Dashboard = () => {
    const [categoryData, setCategoryData] = useState<CategoryData[]>([]);               // Dataset do gráfico que exibe nota média por gênero
    const [yearRatingData, setYearRatingData] = useState<YearRatingData[]>([]);         // Dataset do gráfico que exibe nota média por ano
    const [yearAmountData, setYearAmountData] = useState<PizzaChartData[]>([]);         // Dataset do gráfico que exibe quantidade de aparições do ano
    const [categoryAmountData, setCategoryAmountData] = useState<PizzaChartData[]>([]); // Dataset do gráfico que exibe quantidade de aparições do gênero
    
    // Filtros dos gráficos exibidos (autor, título e gêneros)
    // Sempre há uma string vazia no array de categorias
    const [filters, setFilters] = useState<Filters>({author: '', title: '', category: ['']});

    // Executa sempre que os hook de filtros é alterados
    useEffect(() => {
        getGraphsData();
    }, [filters]);

    // Recebe os valores inseridos nos inputs e salva no hook
    const changeFilters = (author: string, title: string, category: string[]) => {
        setFilters({author, title, category: [...category, '']});
    }

    // Faz as requisições e trata os dados para que sejam armazenados
    // de forma que possam ser exibidos pelos gráficos
    const getGraphsData = async () => {
        let dataHelper: CategoryData[] = [];            // Guarda os dados de nota média por gênero
        let yearDataHelper: YearRatingData[] = [];      // Guarda os dados de nota média por ano
        let yearAmountHelper: PizzaChartData[] = [];    // Guarda os dados de quantidade de aparições do ano
        let catAmountHelper: PizzaChartData[] = [];     // Guarda os dados de quantidade de aparições do gênero
        
        let yearTotalRating: Map<string, number> = new Map([]); // Dicionário com a nota de cada ano
        let yearAppearances: Map<string, number> = new Map([]); // Dicionário com a aparição de cada ano
        let catAppearances: Map<string, number> = new Map([]);  // Dicionário com a aparição de cada categoria

        for(const category of filters.category) {
            // Não faz a requisição se não houver filtros
            if(filters.author === '' && filters.title === '' && category === '') continue;

            // Requisição que busca os livros pelos filtros recebidos
            const response = await getBooksWithFilters(category, filters.author, filters.title);
            let counter = 0;    // Soma todas as notas de livros dessa categoria
            let amount = 0;     // Conta quantos livros foram avaliados ao menos uma vez
            response?.data.items.forEach((book: any) => {
                const bInfo = book.volumeInfo;
                if(bInfo.averageRating != undefined) {
                    counter += bInfo.averageRating;
                    amount++;
                    const year = bInfo.publishedDate.slice(0, 4);
                    yearTotalRating.set(
                        year,
                        (yearTotalRating.get(year) || 0) + bInfo.averageRating
                    );
                    yearAppearances.set(
                        year,
                        (yearAppearances.get(year) || 0) + 1
                    );
                    bInfo.categories?.forEach((cat: string) => {
                        catAppearances.set(cat, (catAppearances.get(cat) || 0) + 1);
                    });
                }
            });
            if(category !== ''){
                dataHelper.push({
                    rating: (counter / amount),
                    category: category
                });
            }
        }
        yearAppearances.forEach((appearances, year) => {
            yearDataHelper.push({
                rating: ((yearTotalRating.get(year) || 1) / appearances),
                year: year
            });
            yearAmountHelper.push({
                label: year,
                value: appearances
            })
        });
        catAppearances.forEach((appearances, cat) => {
            catAmountHelper.push({
                label: cat,
                value: appearances
            })
        });

        // Ordena pela ordem dos anos
        yearDataHelper = yearDataHelper.sort((a, b) => { return ((+a.year) - (+b.year)) });

        // Salvar os dados que os gráficos vão receber
        setCategoryData(dataHelper);
        setYearRatingData(yearDataHelper);
        setYearAmountData(yearAmountHelper);
        setCategoryAmountData(catAmountHelper);
    }

    return (
        <Grid2 container sx={{
            display: 'flex',
            alignItems: 'center',
            alignContent: 'center',
            height: '100vh'
        }}>
            <Grid2 size={1} sx={{display: 'flex', justifyContent: 'center'}}>
                <Link to="/">
                    <Tooltip title="Voltar para página principal">
                        <IconButton>
                            <ArrowBackIcon />
                        </IconButton>
                    </Tooltip>
                </Link>
            </Grid2>
            <Grid2 size={8} offset={1}>
                <FilterBar passFilters={changeFilters} />
            </Grid2>
            <Grid2 container size={8} offset={2} spacing={2} sx={{marginTop: 2}}>
                <Grid2 size={6}>
                    <Paper sx={{padding: '.75rem 1rem', height: '30vh'}} className={styles.paperContainer} >
                        <p className={styles.graphTitle}>Avaliação média por categoria</p>
                        <BaseBarChart dataset={categoryData} axisDataKey={'category'} seriesDataKey={'rating'} vertical />
                    </Paper>
                </Grid2>
                <Grid2 size={6}>
                    <Paper sx={{padding: '.75rem 1rem', height: '30vh'}} className={styles.paperContainer} >
                        <p className={styles.graphTitle}>Quantidade por categoria</p>
                        <BasePizzaChart dataset={categoryAmountData} />
                    </Paper>
                </Grid2>
                <Grid2 size={6}>
                    <Paper sx={{padding: '.75rem 1rem', height: '30vh'}} className={styles.paperContainer} >
                        <p className={styles.graphTitle}>Avaliação média por ano</p>
                        <BaseBarChart dataset={yearRatingData} axisDataKey={'year'} seriesDataKey={'rating'} vertical />
                    </Paper>
                </Grid2>
                <Grid2 size={6}>
                    <Paper sx={{padding: '.75rem 1rem', height: '30vh'}} className={styles.paperContainer} >
                        <p className={styles.graphTitle}>Quantidade por ano</p>
                        <BasePizzaChart dataset={yearAmountData} />
                        <div data-theme='dark'></div>
                    </Paper>
                </Grid2>
            </Grid2>
        </Grid2>
    )
}

export default Dashboard;