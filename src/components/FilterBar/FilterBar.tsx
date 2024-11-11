import styles from './FilterBar.module.css'
import { Button, Grid2, OutlinedInput, Paper } from "@mui/material"
import { useState } from "react";
import SelectInput from '../SelectInput/SelectInput';

const categoriesList = [
    'Fiction',
    'Drama',
    'Thriller',
    'Poetry'
];

type FilterBarProps = {
    passFilters: (a: string, b: string, c: string[]) => void
}

const FilterBar: React.FC<FilterBarProps> = ({ passFilters }) => {
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState<string[]>([]);

    const handleChange = (val: string[]) => {
        setCategories(val);
    }

    const sendFilters = () => {
        passFilters(author, title, categories);
    }

    return (
        <Paper sx={{ 
            backgroundColor: '#f8f8f8',
            padding: '.5rem'
        }}>
            <Grid2 container spacing={1}>
                <Grid2 size={3}>
                    <SelectInput
                        optionList={categoriesList}
                        placeholder='Filtrar Categorias'
                        selectedChange={handleChange}
                    />
                </Grid2>
                <Grid2 size={3}>
                    <OutlinedInput
                        placeholder="Filtrar autor"
                        inputProps={{ 'aria-label': 'Procurar livro' }}
                        onChange={(e) => {
                            setAuthor(e.target.value);
                        }}
                        value={author}
                    />
                </Grid2>
                <Grid2 size={3}>
                    <OutlinedInput
                        placeholder="Filtrar título"
                        inputProps={{ 'aria-label': 'Procurar livro' }}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        value={title}
                    />
                </Grid2>
                <Grid2 size={2} offset={1}>
                    <Button 
                        variant="contained" 
                        sx={{ ml: 1, flex: 1, float: 'right', padding: '1rem 2rem', fontSize: '1rem', lineHeight: '1.4375rem' }}
                        size='small'
                        onClick={sendFilters}
                    >
                        Filtrar
                    </Button>
                </Grid2>
            </Grid2>
        </Paper>
    )
}

export default FilterBar