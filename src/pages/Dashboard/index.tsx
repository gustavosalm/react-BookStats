import { Grid2, Paper, Skeleton } from '@mui/material';
import styles from './styles.module.css';
import FilterBar from '../../components/FilterBar/FilterBar';

const Dashboard = () => {

    return (
        <Grid2 container>
            <Grid2 size={8} offset={2}>
                <FilterBar />
            </Grid2>
            <Grid2 container size={8} offset={2} spacing={2}>
                <Grid2 size={6}>
                    <Paper>
                        <p>aaaa</p>                    
                    </Paper>
                </Grid2>
                <Grid2 size={6}>
                    <Paper>
                        <p>aaaa</p>                    
                    </Paper>
                </Grid2>
                <Grid2 size={6}>
                    <Paper>
                        <p>aaaa</p>                    
                    </Paper>
                </Grid2>
                <Grid2 size={6}>
                    <Paper>
                        <p>aaaa</p>                    
                    </Paper>
                </Grid2>
            </Grid2>
        </Grid2>
    )
}

export default Dashboard;