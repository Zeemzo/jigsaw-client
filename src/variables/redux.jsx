import { createStore } from 'redux'

function todos(state = '', action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return action.text
    default:
      return state
  }
}


function NotTodo(state = false, action) {
  switch (action.type) {
    case 'ACTIVATE':
      return action.text
    default:
      return state
  }
}



function AddNottodos(state = '', action) {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return action.text
    default:
      return state
  }
}

export const store = createStore(todos)
export const showNotification = createStore(NotTodo)
export const notificationStore = createStore(AddNottodos)

store.dispatch({
    type: 'ADD_MESSAGE',
    text: 'something is happenning'
  })

  showNotification.dispatch({
    type: 'ACTIVATE',
    text: true
  })
  
  notificationStore.dispatch({
    type: 'ADD_NOTIFICATION',
    text: 'something is happenning'
  })

// //console.log(store.getState())

// //console.log(store.getState())
