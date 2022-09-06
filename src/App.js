import { createContext, useEffect, useReducer, useState } from "react";
import "./App.css";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//icons
import { BsPlusLg } from "react-icons/bs";

//Styles
import styles from "./styles/app.module.scss";

//Components
import Task from "./components/Task";
import { theLargestNumber } from "./helper/function";
import useLocalStorage from "./hooks/useLocalStorage";

const H6 = styled.h6`
  font-size: 1.4rem;
  padding-top: 120px;
  opacity: 0.2;
  color: ${(props) => (props.isDark ? "#fff" : "#333")};
`;

export const TodosContext = createContext();

const initialState = [];
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      state.push({
        task: action.payload.value,
        complete: false,
        id: theLargestNumber(state),
      });
      return [...state];
    case "COMPLETE":
      const findItem = state.findIndex((item) => item.id === action.payload.id);
      state[findItem].complete = !state[findItem].complete;
      return [...state];
    case "DELETE":
      const newTodos = state.filter((item) => item.id !== action.payload.id);
      return [...newTodos];
    case "CHANGE":
      const findItemChange = state.findIndex(
        (item) => item.id === action.payload.id
      );
      state[findItemChange].task = action.payload.value;
      return [...state];
    case "GET_FROM_LOCAL":
      state = [...action.payload.arr];
      return [...state];
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");

  
  //save DarkMode to LocalStorage
  const [isDark, setDark] = useLocalStorage('darkMode', false)
  
  // LocalStorage Hook
  const [todos, setTodos] = useLocalStorage('todos', []);
  
  document.body.style.background = `${isDark ? "#222831" : "#dfdfde"}`;

  useEffect(() => {
    dispatch({ type: "GET_FROM_LOCAL", payload: { arr: todos } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTodos(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const notify = () =>
    toast.warn("Please enter something", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const addHandler = () => {
    if (value) {
      dispatch({ type: "ADD_TODO", payload: { value } });
      setValue("");
    } else {
      notify();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const filterTodos = state.filter((item) =>
    item.task.toLowerCase().includes(search.toLowerCase())
  );

  const isDarkHandler = (e) => {
    setDark(e.target.checked);
  };

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <ToastContainer className={styles.notify} />
      <div className={styles.container}>
        <section className={styles.topSection}>
          <div className={styles.toggleDarkMode}>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={isDark}
                onChange={isDarkHandler}
              />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
          </div>
          <h1 className={isDark ? styles.headerDarkMode : styles.header}>
            Todo List
          </h1>
        </section>

        <div className={styles.todosContainer}>
          {state.length ? (
            <input
              placeholder="Search..."
              type="search"
              className={isDark ? styles.seachInputDarkMode : styles.seachInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          ) : (
            ""
          )}
          {filterTodos.map((item) => (
            <Task todo={item} key={item.id} isDark={isDark} />
          ))}
        </div>
        <form className={styles.buttonContainer} onSubmit={submitHandler}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="write a new Task..."
            autoFocus
            className={isDark ? styles.inputDarkMode : undefined}
            style={{ boxShadow: `${isDark && "none"}` }}
          />
          <button
            onClick={addHandler}
            className={isDark ? styles.inputDarkMode : undefined}
            style={{ boxShadow: `${isDark && "none" }` }}
          >
            <BsPlusLg className={styles.plusIcon} />
          </button>
        </form>
        {!state.length && (
          <H6 isDark={isDark}>There is no task available :(</H6>
        )}
      </div>
    </TodosContext.Provider>
  );
}

export default App;
