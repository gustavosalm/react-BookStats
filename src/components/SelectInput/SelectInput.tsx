import React, { useState } from 'react'
import styles from './SelectInput.module.css'
import { Checkbox, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material"

type SelectProps = {
    optionList: string[],
    placeholder?: string,
    selectedChange: (val: string[]) => void
}

const SelectInput: React.FC<SelectProps> = ({optionList, placeholder = '', selectedChange}) => {
    const [selecCategory, setSelecCategory] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const { target: { value } } = event;
        setSelecCategory(
          typeof value === 'string' ? value.split(',') : value
        );
        selectedChange(
            typeof value === 'string' ? value.split(',') : value
        );
    };

    return (
        <Select
            className={styles.selectInput}
            multiple
            value={selecCategory}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
                if (selected.length === 0 && placeholder !== '') {
                    return <em>{placeholder}</em>;
                }
                return selected.join(', ');
            }}
            placeholder={placeholder}
            displayEmpty
        >
            <MenuItem disabled value="">
                <em>Selecionar categoria</em>
            </MenuItem>
            {optionList.map((name) => (
                <MenuItem key={name} value={name}>
                    <Checkbox checked={selecCategory.includes(name)} />
                    <ListItemText primary={name} />
                </MenuItem>
            ))}
        </Select>
    )
}

export default SelectInput;