import styles from './GraphContainer.module.css';
import { BarChart } from '@mui/x-charts/BarChart';
import { Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { getBooksByCategory } from '../../services/booksService';

interface CategoryData {
    rating: number,
    category: string
}

const chartSetting = {
    xAxis: [
        {
            label: 'Avaliações por gênero',
            min: 0,
            max: 5,
        },
    ],
    width: 320,
    height: 450,
    slotProps: {
        legend: {
            hidden: true
        }
    }
};

const GraphContainer = () => {
    const [categories, setCategories] = useState(['Fiction', 'Drama', 'Thriller', 'Poetry']);
    const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
    
    useEffect(() => {
        getCategoriesData();
    }, [categories]);

    const getCategoriesData = async () => {
        let dataHelper: CategoryData[] = [];
        for(const category of categories) {
            const response = await getBooksByCategory(category);
            let counter = 0;
            response.data.items.forEach((book: any) => {
                if(book.volumeInfo.averageRating != undefined)
                    counter += book.volumeInfo.averageRating;
            });
            dataHelper.push({
                rating: (counter / response.data.items.length),
                category: category
            });
            console.log(category);
        }
        console.log(dataHelper);
        setCategoryData(dataHelper);
    }

    return (
        <Paper
            sx={{ 
                display: 'flex',
                justifyContent: 'flex-end',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#f8f8f8'
            }}
            className={styles.graphsPaper}
        >
            <BarChart
                loading={categoryData.length === 0}
                className={styles.graph}
                dataset={categoryData}
                yAxis={[{ scaleType: 'band', dataKey: 'category' }]}
                series={[{ dataKey: 'rating', label: 'Média de avaliação', color: '#ababab' }]}
                layout="horizontal"
                grid={{ vertical: true }}
                {...chartSetting}
            />
        </Paper>
    )
}

export default GraphContainer
