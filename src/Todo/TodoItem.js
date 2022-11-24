import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context';

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
    },
    expiredDate: {
        color: 'red',
        textDecoration: 'underline',
    }
}


/**
 * TodoItemDate - компонент выводящий дату задачи
 * @param {Object} props
 * @param {string} props.date - ожидаемая дата выполнения задачи
 */
function TodoItemDate({ date }) {
    const dateInstance = new Date(date);
    const currentDate = Date.now();
    const isExpired = dateInstance.getTime() <= currentDate;

    return (
        <div style={isExpired ? styles.expiredDate : {}}>
            Дата завершения: {dateInstance.toLocaleDateString()}
            <br />
            {isExpired && "Дата выполнения задачи истекла!"}
        </div>
    )
}

function TodoItem({ todo, index, onChange }) {
    const { removeTodo } = useContext(Context)
    const classes = []

    if (todo.completed) {
        classes.push('done')
    }

    const files = Object.values(todo?.files || {});

    return (
        <li style={styles.li}>
            <div className={classes.join(' ')}>
                <input
                    type='checkbox'
                    checked={todo.completed}
                    style={styles.input}
                    onChange={() => onChange(todo.id)}
                />
                <strong>{index + 1}</strong>
                <div>{todo.title}</div>
                <div>{todo.description}</div>
                {todo.date && <TodoItemDate date={todo.date} />}
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
            </div>

            <button className='rm' onClick={removeTodo.bind(null, todo.id)}>&times;</button>
        </li>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default TodoItem;