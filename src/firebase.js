import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyCKP2-ANKwqHQXzbiBOveXmpPqTlHxCPnY",
    authDomain: "to-do-404df.firebaseapp.com",
    projectId: "to-do-404df",
    storageBucket: "to-do-404df.appspot.com",
    messagingSenderId: "373253306381",
    appId: "1:373253306381:web:fcf678183b5f15f5277d44"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const todosDB = collection(db, 'todos');

/**
 * Загрузка всех задач из БД
 * 
 * @returns {Promise} - Promise с массивом всех задач созданных на сервере 
 */
export async function getTodos() {
    const todoSnapshot = await getDocs(todosDB);

    return todoSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

/**
 * Создание задачи на сервере
 * @param {Object} todo - задача
 * @param {string} todo.title - заголовок задачи
 * @param {string} todo.description - описание задачи
 * @param {string} todo.date - ожидаемая дата выполнения задачи
 * @param {string} todo.files - файлы
 * @param {string} todo.completed - статус задачи
 */
export async function saveTodo(todo) {
    return addDoc(todosDB, todo);
}

/**
 * Обновление задачи в БД
 * @param {object} todo - задача
 * @param {string} todo.title - заголовок
 * @param {string} todo.description - описание
 * @param {string} todo.date - дедлайн
 * @param {string} todo.files - файлы
 * @param {string} todo.completed - статус задачи
 */
export async function updateTodo(todo) {
    const docRef = doc(db, "todos", todo.id);

    return updateDoc(docRef, todo)
        .then((docRef) => {
            console.log("Entire Document has been updated successfully");
        })
        .catch(error => {
            console.log(error);
        })
}

/**
 * @param {string} todoId - id коллекции
 */
export async function deleteTodo(todoId) {
    const docRef = doc(db, "todos", todoId);

    return deleteDoc(docRef)
        .then((docRef) => {
            console.log("Entire Document has been updated successfully");
        })
        .catch(error => {
            console.log(error);
        })
}