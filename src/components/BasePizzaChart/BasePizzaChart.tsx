import { PieChart } from "@mui/x-charts";

type PizzaChartProps = {
    dataset: any
}

const BasePizzaChart: React.FC<PizzaChartProps> = ({dataset}) => {

    return (
        <PieChart
            loading={dataset.length === 0}
            series={[
                {
                    data: dataset,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
            ]}
            height={250}
            slotProps={{ legend: { hidden: true }}}
        />
    )
}

export default BasePizzaChart;