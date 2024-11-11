import React from 'react';
import { BarChart } from "@mui/x-charts";

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

type BarChartProps = {
    dataset: any,
    axisDataKey: string,
    seriesDataKey: string
}

const BaseBarChart: React.FC<BarChartProps> = ({dataset, axisDataKey, seriesDataKey}) => {

    return (
        <>
            <BarChart
                loading={dataset.length === 0}
                dataset={dataset}
                yAxis={[{ scaleType: 'band', dataKey: axisDataKey }]}
                series={[{ dataKey: seriesDataKey, label: 'Média de avaliação', color: '#ababab' }]}
                layout="horizontal"
                grid={{ vertical: true }}
                {...chartSetting}
            />
        </>
    )
}

export default BaseBarChart;