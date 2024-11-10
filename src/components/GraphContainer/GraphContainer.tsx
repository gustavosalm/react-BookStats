import styles from './GraphContainer.module.css';
import { BarChart } from '@mui/x-charts/BarChart';
import { Paper } from '@mui/material';

const chartSetting = {
    xAxis: [
        {
            label: 'Avaliações por gênero',
            min: 0,
            max: 5,
        },
    ],
    width: 320,
    height: 500,
    slotProps: {
        legend: {
            hidden: true
        }
    }
};

export const datapreset = [
    {
      rating: 3.5,
      category: 'Fiction',
    },
    {
      rating: 2,
      category: 'Drama',
    },
    {
      rating: 4,
      category: 'Thriller',
    },
    {
      rating: 3,
      category: 'Poetry',
    }
]

const GraphContainer = () => {

    return (
        <Paper className={styles.graphsPaper}>
            <BarChart
                className={styles.graph}
                dataset={datapreset}
                yAxis={[{ scaleType: 'band', dataKey: 'category' }]}
                series={[{ dataKey: 'rating', label: 'Média de avaliação', color: '#ff0000' }]}
                layout="horizontal"
                grid={{ vertical: true }}
                {...chartSetting}
            />
        </Paper>
    )
}

export default GraphContainer
