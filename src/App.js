import './App.css';

//icons
import {BsPlusLg} from 'react-icons/bs';

//Styles
import styles from './styles/app.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Todo List</h1>
      <div className={styles.buttonContainer}>
        <input type='text' placeholder='write a new Task...' autoFocus />
        <button>
          <BsPlusLg className={styles.plusIcon} />
        </button>
      </div>
    </div>
  );
}

export default App;
