import React, { useEffect } from 'react';
import TodoList from './Todo/TodoList';
import Context from './context';
// import Modal from './Modal/Modal';
import { saveTodos, getTodos } from './firebase';


const AddTodo = React.lazy(
    () =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(import('./Todo/AddTodo'))
            }, 1500)
        })
)

function App() {
    const [todos, setTodos] = React.useState([])



    useEffect(() => {
        // fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
        //     .then(response => response.json())
        //     .then(todos => {
        //         setTimeout(() => {
        //             setTodos(todos)
        //         }, 1500)
        //     })

        async function loadTodos() {
            const todos = await getTodos();

            console.log('todos: ', todos);
            setTodos(todos);
        }

        loadTodos()
    }, [])

    function toggleTodo(id) {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo
            })
        )
    }

    function removeTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    function addTodo(data) {
        const todo = {
            title: data.title,
            id: Date.now(),
            completed: false,
            description: data.description,
            date: data.date,
            files: data.files
        };
        setTodos(todos.concat([todo]))
        saveTodos({
            title: data.title,
            id: Date.now(),
            completed: false,
            description: data.description,
            date: data.date,
            files: []
        });
    }

    return (
        <Context.Provider value={{ removeTodo }}>
            <div className='wrapper'>
                <h1 className='title'>todos</h1>
                {/* <Modal /> */}

                <React.Suspense fallback={<p>Loading...</p>}>
                    <AddTodo onCreate={addTodo} />
                </React.Suspense>
                {todos.length ? (
                    <TodoList todos={todos} onToggle={toggleTodo} />
                ) : (
                    <p>No todos!</p>
                )}
            </div>
        </Context.Provider>
    )
}

export default App;