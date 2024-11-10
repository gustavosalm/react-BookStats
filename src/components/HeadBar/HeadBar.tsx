import { IconButton, InputAdornment, InputBase, Paper, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import styles from './HeadBar.module.css';
import React, { useState } from "react";

type headBarProps = {
    searchHandler: (val: string) => void,
    resetSearch: () => void
}

const HeadBar: React.FC<headBarProps> = ({ searchHandler, resetSearch}) => {
    const [search, setSearch] = useState('');

    const handleChange = (e: React.ChangeEvent) => {
        setSearch((e.target as HTMLInputElement).value);
    }

    return (
        <div className={styles.outerDiv}>
            {/* <TextField
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
            /> */}
            <Paper
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '60%' }}
            >
                {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
                    <MenuIcon />
                </IconButton> */}
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Procurar livro"
                    inputProps={{ 'aria-label': 'Procurar livro' }}
                    onChange={handleChange}
                    value={search}
                />
                {(search !== '') ? (
                    <IconButton
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search"
                    onClick={(e) => {setSearch(''); resetSearch()}}
                >
                        <CloseIcon />
                    </IconButton>
                ) : null}
                <IconButton
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search"
                    onClick={(e) => searchHandler(search)}
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
        </div>
    )
}

export default HeadBar;
