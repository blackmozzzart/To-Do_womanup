import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context';
import TodoItemDate from './TodoItemDate';

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem',
    },
    input: {
        marginRight: '1rem'
    }
}

/**
 * TodoItem - компонент выводящий задачу
 * @param {Object} props
 * @param {Object} props.todo - задача 
 * @param {number} props.index - порядковый номер задачи
 */
function TodoItem({ todo, index }) {
    const { removeTodo, editTodo } = useContext(Context)
    const classes = []

    const [isEditing, setIsEditing] = useState(false);

    if (todo.completed) {
        classes.push('done')
    }

    const handleEditButtonClick = () => {
        setIsEditing((state) => !state)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)

        editTodo({
            ...todo,
            title: formData.get('title'),
            description: formData.get('description'),
            date: formData.get('date'),
        })
        setIsEditing(false)
    }

    const files = Object.values(todo?.files || {});

    return (
        <li style={styles.li}>
            <form className={classes.join(' ')} onSubmit={handleSubmit}>
                <input
                    type='checkbox'
                    checked={todo.completed}
                    style={styles.input}
                    onChange={() => editTodo({...todo, completed: !todo.completed})}
                />
                <strong>{index + 1}</strong>
                <div>
                    {isEditing ? <input name="title" defaultValue={todo.title} /> : <div>{todo.title}</div>}
                </div>
                <div>
                    {isEditing ? <textarea name="description" defaultValue={todo.description} /> : <div>{todo.description}</div>}
                </div>
                <div>
                    {isEditing ? <input name="date" type='date' defaultValue={todo.date} /> : (todo.date && <TodoItemDate date={todo.date} />)}
                </div>
                {Boolean(files.length) && (
                    <div>
                        Files:
                        <ul>
                            {files?.map((file) => (
                                <li>{file.name}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {isEditing && (
                    <button type="submit" className='sv'>save</button>
                )}
                {!isEditing && (
                    <button type="button" className='ed' onClick={handleEditButtonClick}>edit</button>
                )}
                <button type="button" className='rm' onClick={removeTodo.bind(null, todo.id)}>&times;</button>
            </form>
        </li>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number,
}

export default TodoItem;