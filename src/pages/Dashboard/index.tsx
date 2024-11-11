import { Grid2, Paper, Skeleton } from '@mui/material';
import styles from './styles.module.css';
import FilterBar from '../../components/FilterBar/FilterBar';
import { useEffect, useState } from 'react';
import BaseBarChart from '../../components/BaseBarChart/BaseBarChart';
import { getBooksByCategory, getBooksWithFilters } from '../../services/booksService';
import BasePizzaChart from '../../components/BasePizzaChart/BasePizzaChart';

interface CategoryData {
    rating: number,
    category: string
}

interface YearRatingData {
    rating: number,
    year: string
}

interface PizzaChartData {
    label: string,
    value: number
}

interface Filters {
    author: string,
    title: string,
    category: string[]
}

const Dashboard = () => {
    const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
    const [yearRatingData, setYearRatingData] = useState<YearRatingData[]>([]);
    const [yearAmountData, setYearAmountData] = useState<PizzaChartData[]>([]);
    const [categoryAmountData, setCategoryAmountData] = useState<PizzaChartData[]>([]);
    const [filters, setFilters] = useState<Filters>({author: '', title: '', category: ['Fiction']});

    useEffect(() => {
        getGraphsData();
    }, [filters]);

    const getGraphsData = async () => {
        let dataHelper: CategoryData[] = [];
        let yearDataHelper: YearRatingData[] = [];
        let yearAmountHelper: PizzaChartData[] = [];
        let catAmountHelper: PizzaChartData[] = [];
        let yearTotalRating: Map<string, number> = new Map([]);
        let yearAppearances: Map<string, number> = new Map([]);
        let catAppearances: Map<string, number> = new Map([]);

        for(const category of filters.category) {
            if(filters.author === '' && filters.title === '' && category === '') return;
            const response = await getBooksWithFilters(category, filters.author, filters.title);
            let counter = 0;
            let amount = 0;
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
        })
        yearDataHelper = yearDataHelper.sort((a, b) => { return ((+a.year) - (+b.year)) });
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
            <Grid2 size={8} offset={2}>
                <FilterBar />
            </Grid2>
            <Grid2 container size={8} offset={2} spacing={2} sx={{marginTop: 2}}>
                <Grid2 size={6}>
                    <Paper>
                        <BaseBarChart dataset={categoryData} axisDataKey={'category'} seriesDataKey={'rating'} vertical />
                    </Paper>
                </Grid2>
                <Grid2 size={6}>
                    <Paper>
                        <BasePizzaChart dataset={categoryAmountData} />
                    </Paper>
                </Grid2>
                <Grid2 size={6}>
                    <Paper>
                        <BaseBarChart dataset={yearRatingData} axisDataKey={'year'} seriesDataKey={'rating'} vertical />
                    </Paper>
                </Grid2>
                <Grid2 size={6}>
                    <Paper>
                        <BasePizzaChart dataset={yearAmountData} />
                    </Paper>
                </Grid2>
            </Grid2>
        </Grid2>
    )
}

export default Dashboard;