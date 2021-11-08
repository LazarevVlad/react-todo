type Options = {
  url: string
}

type Todo = {
  text: string,
  done: boolean
}

export class Api {
  options: Options;
  constructor(options: Options) {
    this.options = options;
  }

  getTodos() {
    return fetch(`${this.options.url}/todos`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
  }

  addTodos(todos: Todo) {
    return fetch(`${this.options.url}/todos`, {
      'method': 'POST',
      'headers': {
        "Content-type": 'applications/json',
      },
      body: JSON.stringify({
        text: todos.text,
        done: todos.done,
      }),
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
  }

  editTodos(id: number){
    return fetch(`${this.options.url}/todos/${id}`, {
      'method': 'PUT',
      'headers': {
        "Content-type": 'applications/json',
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => Promise.reject(new Error(err.message)));   
  }

  deleteTodos(id: number){
    return fetch(`${this.options.url}/todos/${id}`, {
      'method': 'DELETE',
      'headers': {
        "Content-type": 'applications/json',
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => Promise.reject(new Error(err.message)));   
  }
}