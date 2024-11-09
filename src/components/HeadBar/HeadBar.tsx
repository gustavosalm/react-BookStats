import { TextField } from "@mui/material";
import styles from './HeadBar.module.css';

const HeadBar = () => {
    return (
        <div className={styles.outerDiv}>
            <TextField fullWidth label="Buscar livro" variant="filled" type="search" className={styles.searchInput} />
        </div>
    )
}

export default HeadBar;
