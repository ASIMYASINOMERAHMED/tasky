import { v4 as uuidv4 } from "uuid";

function TodoReducer(currentTodos, action) {
  switch (action.type) {
    case "add":
      if (action.payload === "") return;
      const newTodo = {
        id: uuidv4(),
        title: action.payload.newTitle,
        description: "",
        completed: false,
      };
      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("TodoList", JSON.stringify(updatedTodos));
      return updatedTodos;
    case "delete":
      const Todos = currentTodos.filter(
        (task) => task.id !== action.payload.id
      );
      localStorage.setItem("TodoList", JSON.stringify(Todos));
      return Todos;
    case "update":
      const updatedTodo = currentTodos.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              title: action.payload.title,
              description: action.payload.description,
            }
          : task
      );
      localStorage.setItem("TodoList", JSON.stringify(updatedTodo));
      return updatedTodo;
    case "complete":
      const completedTodo = currentTodos.map((task) =>
        task.id === action.payload.Id
          ? { ...task, completed: !task.completed }
          : task
      );
      localStorage.setItem("TodoList", JSON.stringify(completedTodo));
      return completedTodo;
    case "get":
      const storedTasks = JSON.parse(localStorage.getItem("TodoList")) ?? [];
      return storedTasks;
    default:
      return currentTodos;
  }
}
export default TodoReducer;
