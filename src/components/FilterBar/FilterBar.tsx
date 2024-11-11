import styles from './FilterBar.module.css'
import { Button, OutlinedInput, Paper } from "@mui/material"
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
            <SelectInput optionList={categoriesList} placeholder='Filtrar Categorias' selectedChange={handleChange} />
            <OutlinedInput
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Filtrar autor"
                    inputProps={{ 'aria-label': 'Procurar livro' }}
                    onChange={(e) => {
                        setAuthor(e.target.value);
                    }}
                    value={author}
            />
            <OutlinedInput
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Filtrar título"
                    inputProps={{ 'aria-label': 'Procurar livro' }}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    value={title}
            />
            <Button 
                variant="contained" 
                sx={{ ml: 1, flex: 1, float: 'right', padding: '1rem 2rem', fontSize: '1rem', lineHeight: '1.4375rem' }}
                size='small'
                onClick={sendFilters}
            >
                Filtrar
            </Button>
        </Paper>
    )
}

export default FilterBar