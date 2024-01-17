import { useEffect, useReducer } from "react"
import { todoReducer } from "./todoReducer"

export const useTodo = () => {
  const initialState = [
    // {
    //     id: new Date().getTime(),
    //     description: 'Recolectar la piedra del alma',
    //     done: false
    // },

  ]

  const init = () => {
    return JSON.parse(localStorage.getItem('todos2')) || [];
  }
  const [todos, dispatch] = useReducer(todoReducer, initialState, init)

  useEffect(() => {

    localStorage.setItem('todos2', JSON.stringify(todos));

  }, [todos])



  const handleNewTodo = (todo) => {
    const action = {
      type: '[TODO] Add Todo',
      payload: todo
    }
    dispatch(action);
  }

  const handleDeleteTodo = (id) => {
    dispatch({
      type: '[TODO] Remove Todo',
      payload: id
    })
  }
  const handleToggleTodo = (id) => {
    dispatch({
      type: '[TODO] Toggle Todo',
      payload: id
    })
  }

 
  return {
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    todosCount:todos.length,
    pendingTodosCount:todos.filter(todo => !todo.done).length
  }

}
