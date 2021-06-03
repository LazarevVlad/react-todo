import {Todo} from './components/Todo';
import styles from './styles/index.module.css';

function App() {
  console.log(styles)
  return (
    <div className={styles.App}>
        <Todo/>
    </div>
  );
}

export default App;
