import React from 'react';
import PropTypes from 'prop-types';

import {useInputValue, useFileInputValue} from '../hooks/useInputValue';

/**
* AddTodo - компонент с формой для создания задачи
* @param {Object} props
* @param {function({title: string, description: string, files: string, date: string, completed: boolean})} props.onCreate - функция которая вызывается при создании задачи
*/
function AddTodo({ onCreate }) {
    const titleState = useInputValue()
    const descriptionState = useInputValue()
    const filesState = useFileInputValue()
    const dateState = useInputValue()

    /**
     * submitHandler - колбек функция
     * @param {Object} event - ивент сабмита формы
     */
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
        <form className='task-form' onSubmit={submitHandler}>
            <input className="task-form__title" placeholder="Заголовок задачи" {...titleState.bind} />
            
            <textarea
                {...descriptionState.bind}
                name='description'
                type='text'
                placeholder='Описание задачи'
                required
                className='task-form__description'
            />

            <input
                {...filesState.bind}
                multiple={true}
                name='files'
                type='file'
                placeholder='Загрузите файл'
                className='task-form__file'
            />
            
            <label className='label-date'>
                <span>Укажите дату завершения задачи</span>
                <br />
                <input
                    {...dateState.bind}
                    name='date'
                    type='date'
                    className='task-form__date'
                />
            </label>

            <button className='button' type='submit'>Add todo</button>
        </form>
    )
}

AddTodo.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddTodo;