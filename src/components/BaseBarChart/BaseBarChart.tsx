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

const verticalChartSetting = {
    yAxis: [
        {
            min: 0,
            max: 5,
        },
    ],
    width: 450,
    height: 200,
    slotProps: {
        legend: {
            hidden: true
        }
    }
};

type BarChartProps = {
    dataset: any,
    axisDataKey: string,
    seriesDataKey: string,
    vertical?: boolean
}

const BaseBarChart: React.FC<BarChartProps> = ({dataset, axisDataKey, seriesDataKey, vertical = false}) => {

    return (
        <>
            {(vertical) ?
                <BarChart
                    loading={dataset.length === 0}
                    dataset={dataset}
                    xAxis={[{ scaleType: 'band', dataKey: axisDataKey }]}
                    series={[{ dataKey: seriesDataKey, label: 'Média de avaliação', color: '#6fb4d4' }]}
                    grid={{ vertical: true }}
                    {...verticalChartSetting}
                /> :
                <BarChart
                    loading={dataset.length === 0}
                    dataset={dataset}
                    yAxis={[{ scaleType: 'band', dataKey: axisDataKey }]}
                    series={[{ dataKey: seriesDataKey, label: 'Média de avaliação', color: '#ababab' }]}
                    layout="horizontal"
                    grid={{ vertical: true }}
                    {...chartSetting}
                />
            }
        </>
    )
}

export default BaseBarChart;