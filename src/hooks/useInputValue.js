import {useState} from 'react';

export function useInputValue(defaultValue = '') {
    const [value, setValue] = useState(defaultValue)

    return {
        bind: {
            value,
            onChange: event => setValue(event.target.value)
        },
        clear: () => setValue(''),
        value: () => value
    }
}

export function useFileInputValue(defaultValue = '') {
    const [value, setValue] = useState(defaultValue)

    return {
        bind: {
            // value: value, доработать
            onChange: event => setValue(event.currentTarget.files)
        },
        clear: () => setValue(''),
        value: () => value
    }
}