import styles from './GraphContainer.module.css';
import { BarChart } from '@mui/x-charts/BarChart';
import { IconButton, Paper, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AbcSharpIcon from '@mui/icons-material/AbcSharp';
import { useEffect, useState } from 'react';
import { getBooksByCategory } from '../../services/booksService';

interface CategoryData {
    rating: number,
    category: string
}

interface YearData {
    rating: number,
    year: string
}

const chartSetting = {
    xAxis: [
        {
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
    const [yearData, setYeatData] = useState<YearData[]>([]);
    const [currentGraph, setCurrentGraph] = useState('category');
    
    useEffect(() => {
        getGraphsData();
    }, [categories]);

    const handleChange = (e: React.MouseEvent<HTMLElement>, newGraph: string) => {
        setCurrentGraph(newGraph);
    }

    const getGraphsData = async () => {
        let dataHelper: CategoryData[] = [];
        let yearDataHelper: YearData[] = [];
        let yearTotalRating: Map<string, number> = new Map([]);
        let yearAppearances: Map<string, number> = new Map([]);

        for(const category of categories) {
            const response = await getBooksByCategory(category);
            let counter = 0;
            let amount = 0;
            response.data.items.forEach((book: any) => {
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
                }
            });
            dataHelper.push({
                rating: (counter / amount),
                category: category
            });
        }
        yearTotalRating.forEach((rating, year) => {
            yearDataHelper.push({
                rating: (rating / (yearAppearances.get(year) || 1)),
                year: year
            });
        });
        yearDataHelper = yearDataHelper.sort((a, b) => { return ((+a.year) - (+b.year)) });
        setCategoryData(dataHelper);
        setYeatData(yearDataHelper);
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
            <div className={styles.buttonContainers}>
                <ToggleButtonGroup
                    value={currentGraph}
                    exclusive
                    onChange={handleChange}
                >
                    <Tooltip title='Média por categoria'>
                        <ToggleButton value="category">
                            <AbcSharpIcon />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title='Média por ano'>
                        <ToggleButton value="year">
                            <CalendarMonthIcon />
                        </ToggleButton>
                    </Tooltip>
                </ToggleButtonGroup>
            </div>
            <BarChart
                loading={categoryData.length === 0}
                className={styles.graph}
                dataset={(currentGraph === 'category' ? categoryData : yearData)}
                yAxis={[{ scaleType: 'band', dataKey: currentGraph }]}
                series={[{ dataKey: 'rating', label: 'Média de avaliação', color: '#ababab' }]}
                layout="horizontal"
                grid={{ vertical: true }}
                {...chartSetting}
            />
        </Paper>
    )
}

export default GraphContainer
