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

function AddTodo({ onCreate }) {
    const input = useInputValue('')

    function submitHandler(event) {
        event.preventDefault()

        if (input.value().trim()) {
            onCreate(input.value())
            input.clear()
        }
    }

    return (
        <form style={{ marginBottom: '1rem' }} onSubmit={submitHandler}>
            <input {...input.bind} />
            <textarea
                name='description'
                type='text'
                placeholder='Описание задачи'
                className='input-textarea'
                // value={todo.description}
                required
            // onChange={onChange}
            />
            <input
                multiple='true'
                name='upload'
                type='file'
                placeholder='Загрузите файл'
                className='upload-input'
            // value={currentTodo.upload}
            // onChange={onChange}
            />
            <label className='label-date'>
                <span>Укажите дату завершения задачи</span>
                <input
                    name="date"
                    type='date'
                    // value={currentTodo.date}
                    required
                // onChange={onChange}
                />
            </label>
            <button type='submit'>Add todo</button>
        </form>
    )
}

AddTodo.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddTodo;