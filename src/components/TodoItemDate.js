/**
 * TodoItemDate - компонент выводящий дату задачи
 * @param {Object} props
 * @param {string} props.date - ожидаемая дата выполнения задачи
 */
 function TodoItemDate({ date }) {
    const dateInstance = new Date(date);
    const currentDate = Date.now();
    const isExpired = dateInstance.getTime() <= currentDate;

    const style = isExpired ? {
        color: 'red',
        textDecoration: 'underline',
    }: {};

    return (
        <div style={style}>
            Дата завершения: {dateInstance.toLocaleDateString()}
            <br />
            {isExpired && "Дата выполнения задачи истекла!"}
        </div>
    )
}

export default TodoItemDate;