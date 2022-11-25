import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const styles = {
    ul: {
        listStyle: 'none',
        margin: 0,
        padding: 0
    }
}

/**
 * TodoList - компонент который выводит список тудушек
 * @param {Object} props
 * @param {Array} props.todos - массив с задачами
 */
function TodoList(props) {
    return (
        <ul style={styles.ul}>
            {props.todos.map((todo, index) => {
                return (
                    <TodoItem
                        todo={todo}
                        key={todo.id}
                        index={index}
                    />
                )
            })}
        </ul>
    )
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TodoList;