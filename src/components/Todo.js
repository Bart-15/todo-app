import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
const Todo = () => {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('')
  const [todoEditing, setTodoEditing] = useState(null)
  const [editingText, setEditingText] = useState('')

  useEffect(() => {
    const json = localStorage.getItem('todos')
    const loadTodos = JSON.parse(json)
    if (loadTodos) {
      setTodos(loadTodos)
    }
  }, [])

  useEffect(() => {
    const json = JSON.stringify(todos)
    localStorage.setItem('todos', json)
  }, [todos])

  const addTodo = (e) => {
    e.preventDefault()
    if (todo === '') {
      Swal.fire({
        title: 'Error!',
        text: 'Please insert value',
        icon: 'error',
      })
    } else {
      const newTodo = {
        id: new Date().getTime(),
        text: todo,
        completed: false,
      }

      Toast.fire({
        icon: 'success',
        title: 'Todo added successfully',
      })
      setTodos([...todos].concat(newTodo))
      setTodo('')
    }
  }

  const deleteTodo = (id) => {
    let newTodo = [...todos].filter((todo) => todo.id !== id)
    Toast.fire({
      icon: 'success',
      title: 'Todo deleted successfully',
    })
    setTodos(newTodo)
  }

  const toggleComplete = (id) => {
    let updatedTodo = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(updatedTodo)
  }

  const submitEdit = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText
        Toast.fire({
          icon: 'success',
          title: 'Todo updated successfully',
        })
      }
      return todo
    })
    setTodos(updatedTodos)
    setTodoEditing(null)
  }

  //Sweet alert Toast
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })
  return (
    <>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-sm-4 col-md-6 col-lg-8'>
            <div className='title pt-5'>
              <h1>Hey buddy!! Let's track your activity.</h1>
            </div>
            <div className='instruction'>
              <ul className='list-unstyled'>
                <li>If the text has a line through, it means complete.</li>
                <li>Double click the todo to marked as completed.</li>
              </ul>
            </div>
            <form onSubmit={addTodo}>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  onChange={(e) => setTodo(e.target.value)}
                  value={todo}
                  placeholder='Enter Value'
                />
              </div>
              <div className='form-group'>
                <button type='submit' className='btn text-white submit-btn'>
                  Add Todo
                </button>
              </div>
            </form>
            {todos.map((todo) => {
              return (
                <div className='todo' key={todo.id}>
                  <p
                    onDoubleClick={() => toggleComplete(todo.id)}
                    className={todo.completed ? 'todo-completed' : 'todo-text'}
                  >
                    {todo.id === todoEditing ? (
                      <input
                        className='my-form'
                        type='text'
                        onChange={(e) => setEditingText(e.target.value)}
                      />
                    ) : (
                      todo.text
                    )}
                  </p>

                  <div className='actions'>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className='delButton'
                      type='button'
                    >
                      Delete
                    </button>
                    {todo.id === todoEditing ? (
                      <button
                        onClick={() => submitEdit(todo.id)}
                        type='submit'
                        className='editButton'
                      >
                        Submit Edit
                      </button>
                    ) : (
                      <button
                        onClick={() => setTodoEditing(todo.id)}
                        type='submit'
                        className='editButton'
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo
