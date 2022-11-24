import React, { useState } from 'react';
import PropTypes from 'prop-types';

function useInputValue(defaultValue = '') {
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

function useFileInputValue(defaultValue = '') {
    const [value, setValue] = useState(defaultValue)

    return {
        bind: {
            // value: value,
            onChange: event => setValue(event.currentTarget.files)
        },
        clear: () => setValue(''),
        value: () => value
    }
}

function AddTodo({ onCreate }) {
    const titleState = useInputValue()
    const descriptionState = useInputValue()
    const filesState = useFileInputValue()
    const dateState = useInputValue()

    function submitHandler(event) {
        event.preventDefault()
        const data = {
            title: titleState.value(),
            description: descriptionState.value(),
            files: filesState.value(),
            date: dateState.value()
        };

        onCreate(data)

        titleState.clear()
        descriptionState.clear()
        filesState.clear()
        dateState.clear()
    }

    return (
        <form style={{ marginBottom: '1rem' }} onSubmit={submitHandler}>
            <input placeholder="Заголовок задачи" {...titleState.bind} />
            <br />
            <br />
            <textarea
                {...descriptionState.bind}
                name='description'
                type='text'
                placeholder='Описание задачи'
                required
            />
            <br />
            <br />
            <input
                {...filesState.bind}
                multiple='true'
                name='files'
                type='file'
                placeholder='Загрузите файл'
            />
            <br />
            <br />
            <label className='label-date'>
                <span>Укажите дату завершения задачи</span>
                <br />
                <input
                    {...dateState.bind}
                    name='date'
                    type='date'
                    required
                />
            </label>
            <br />
            <br />
            <button type='submit'>Add todo</button>
        </form>
    )
}

AddTodo.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddTodo;