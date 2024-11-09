import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import styles from './HeadBar.module.css';
import React from "react";

type headBarProps = {
    searchHandler: React.KeyboardEventHandler
}

const HeadBar: React.FC<headBarProps> = ({ searchHandler }) => {

    return (
        <div className={styles.outerDiv}>
            <TextField
                fullWidth
                label="Buscar livro"
                variant="filled"
                type="search"
                className={styles.searchInput}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    },
                }}
                onKeyDown={searchHandler}
            />
        </div>
    )
}

export default HeadBar;
