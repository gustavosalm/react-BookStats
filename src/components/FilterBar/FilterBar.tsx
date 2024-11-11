import styles from './FilterBar.module.css'
import { Input, OutlinedInput, Paper } from "@mui/material"
import { useState } from "react";
import SelectInput from '../SelectInput/SelectInput';

const categories = [
    'Fiction',
    'Drama',
    'Thriller',
    'Poetry'
];

const FilterBar = () => {

    return (
        <Paper>
            <SelectInput optionList={categories} placeholder='Filtrar Categorias' />
            <OutlinedInput
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Filtrar autor"
                    inputProps={{ 'aria-label': 'Procurar livro' }}
                    // onChange={handleChange}
                    // value={search}
            />
            <OutlinedInput
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Filtrar título"
                    inputProps={{ 'aria-label': 'Procurar livro' }}
                    // onChange={handleChange}
                    // value={search}
            />
        </Paper>
    )
}

export default FilterBar