import {TodoContainer} from './components/todoContainer/TodoContainer';
import styles from './styles/index.module.css';
import { createStore } from "redux";
import { Provider } from 'react-redux';
import { reducer } from './reducers';

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <div className={styles.App}>
          <TodoContainer/>
      </div>
    </Provider>
  );
}

export default App;
