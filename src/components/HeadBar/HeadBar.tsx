import { Grid2, IconButton, InputAdornment, InputBase, Paper, TextField, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import styles from './HeadBar.module.css';
import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context";

type headBarProps = {
    searchHandler: (val: string) => void,
    resetSearch: () => void
}

const HeadBar: React.FC<headBarProps> = ({ searchHandler, resetSearch}) => {
    const {theme, saveTheme} = useContext(ThemeContext);
    const [search, setSearch] = useState('');

    const handleChange = (e: React.ChangeEvent) => {
        setSearch((e.target as HTMLInputElement).value);
    }

    const handleThemeChange = (e: React.MouseEvent<HTMLElement>, newTheme: string) => {
        saveTheme(newTheme);
    }

    return (
        <Grid2 container className={styles.outerDiv}>
            <Grid2 size={1}>
                <ToggleButtonGroup
                    value={theme}
                    exclusive
                    onChange={handleThemeChange}
                >
                    <Tooltip title='Modo claro'>
                        <ToggleButton value="light">
                            <LightModeIcon />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title='Modo escuro'>
                        <ToggleButton value="dark">
                            <DarkModeIcon />
                        </ToggleButton>
                    </Tooltip>
                </ToggleButtonGroup>
            </Grid2>
            <Grid2 offset={2} size={6}>
                <Paper
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
                    className={styles.paperContainer}
                >
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
            </Grid2>
        </Grid2>
    )
}

export default HeadBar;
