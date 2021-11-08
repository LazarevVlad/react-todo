import {TodoContainer} from './components/todoContainer/TodoContainer';
import { Provider } from 'react-redux';
import { store } from './store/store'
import styles from './styles/index.module.css';

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
