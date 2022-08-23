import { createContext, useEffect, useReducer, useState } from "react";
import "./App.css";
import styled from "styled-components";

//icons
import { BsPlusLg } from "react-icons/bs";

//Styles
import styles from "./styles/app.module.scss";

//Components
import Task from "./components/Task";
import { theLargestNumber } from "./helper/function";

const H6 = styled.h6`
  font-size: 1.4rem;
  padding-top: 120px;
  opacity: .2;
`

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
    case 'GET_FROM_LOCAL':
        state = [...action.payload.arr];
        return [...state];
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [value, setValue] = useState("");


  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    dispatch({type: 'GET_FROM_LOCAL', payload: {arr: todos}})
  }, [])

  useEffect(() => {
    console.log(state);
    window.localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  const addHandler = () => {
    if (value) {
      dispatch({ type: "ADD_TODO", payload: { value } });
      setValue("");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  }

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <div className={styles.container}>
        <h1 className={styles.header}>Todo List</h1>
        <div className={styles.todosContainer}>
          {state.map((item) => (
            <Task todo={item} key={Math.random() * 100} />
          ))}
        </div>
        <form className={styles.buttonContainer} onSubmit={submitHandler}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="write a new Task..."
            autoFocus
          />
          <button onClick={addHandler}>
            <BsPlusLg className={styles.plusIcon} />
          </button>
        </form>
      {!state.length && <H6>There is no task available :(</H6>}
      </div>
    </TodosContext.Provider>
  );
}

export default App;
