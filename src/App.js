import React, { useEffect } from 'react';
import Context from './context';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { saveTodo, getTodos, updateTodo, deleteTodo } from './firebase';


function App() {
    const [todos, setTodos] = React.useState([]);

    async function loadTodos() {
        const todosFromServer = await getTodos();
        setTodos(todosFromServer);
    }

    useEffect(() => {    
        loadTodos()
    }, [])

    /**
    * removeTodo - удаление существующей задачи
    * @param {string} id - id задачи
    */
    function removeTodo(id) {
        deleteTodo(id).then(loadTodos);
    }

    /**
    * editTodo - изменение уже существующей задачи
    * @param {Object} todo - задача
    * @param {string} todo.title - заголовок
    * @param {string} todo.description - описание
    * @param {string} todo.date - дедлайн
    * @param {string} todo.files - файлы
    * @param {string} todo.completed - статус
    */
    function editTodo(todo) {
        const newTodos = todos.filter(({ id }) => id !== todo.id)

        updateTodo(todo);
        setTodos([...newTodos, todo])
    }

    /**
    * addTodo - создание новой задачи
    * @param {Object} todo
    * @param {string} todo.title - 
    * @param {string} todo.description - 
    * @param {string} todo.date - 
    * @param {string} todo.files - 
    * @param {string} todo.completed - 
    */
    function addTodo(todo) {        
        saveTodo({
            ...todo,
            completed: false,
            files: []
        }).then(loadTodos);
    }

    return (
        <Context.Provider value={{ removeTodo, editTodo }}>
            <div className='wrapper'>
                <h1 className='title'>todos</h1>

                <AddTodo onCreate={addTodo} />

                {todos.length ? (
                    <TodoList todos={todos} />
                ) : (
                    <p>No todos!</p>
                )}
            </div>
        </Context.Provider>
    )
}

export default App;