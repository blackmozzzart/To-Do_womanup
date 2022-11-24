import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCKP2-ANKwqHQXzbiBOveXmpPqTlHxCPnY",
    authDomain: "to-do-404df.firebaseapp.com",
    projectId: "to-do-404df",
    storageBucket: "to-do-404df.appspot.com",
    messagingSenderId: "373253306381",
    appId: "1:373253306381:web:fcf678183b5f15f5277d44"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Get a list of cities from your database
export async function getTodos() {
    const todosCol = collection(db, 'todos');
    const todoSnapshot = await getDocs(todosCol);
    const todoList = todoSnapshot.docs.map(doc => doc.data());

    return todoList;
}

/**
 * Сохранять задачу на сервере
 * @param {Object} todo
 * @param {string} todo.date - ожидаемая дата выполнения задачи
 * @param {string} todo.title - заголовок задачи
 * @param {string} todo.description - описание задачи
 * @param {string} todo.files - файлы
 * @param {string} todo.completed - статус задачи
 */
export async function saveTodos(todo) {
    return addDoc(collection(db, "todos"), todo);
}