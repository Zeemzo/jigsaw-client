import { createStore } from 'redux'

function todos(state = '', action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return action.text
    default:
      return state
  }
}

export const store = createStore(todos)
store.dispatch({
    type: 'ADD_MESSAGE',
    text: 'something is happenning'
  })

// console.log(store.getState())

// console.log(store.getState())
