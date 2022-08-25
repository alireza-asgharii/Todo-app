import React, { useContext } from "react";
import styled from "styled-components";

//Styles
import styles from "../styles/task.module.scss";

//icons
import { FaRegTrashAlt } from "react-icons/fa";

//Context
import { TodosContext } from "../App";

const DivContainer = styled.div`
  width: 100%;
  background: #f7f5f2;
  padding: 10px;
  border-radius: 10px;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  transition: all linear .2s;
  opacity: ${(props) => (props.complete ? ".5" : "1")};
`;

const Input = styled.input`
  flex: 80;
  width: 100%;
  height: 30px;
  border-radius: 10px;
  border: none;
  outline: none;
  margin-left: 10px;
  font-size: 1.2rem;
  text-decoration: ${(props) => props.complete && 'line-through'}
`;

const Task = (props) => {
  const { dispatch } = useContext(TodosContext);
  const { task, complete, id } = props.todo;


  const completeHandler = () => {
    dispatch({ type: "COMPLETE", payload: { id, complete } });
  };

  const deleteHandler = () => {
    dispatch({ type: "DELETE", payload: { id } });
  };

  const changeHandler = (e) => {
    dispatch({type: 'CHANGE', payload: {value: e.target.value, id}})
  };

  return (
    <DivContainer complete={complete}>
      <input
        type="checkbox"
        className={styles.checkbox}
        onClick={completeHandler}
        defaultChecked={complete}
      />
      <Input
        type="text"
        className={styles.inputText}
        onBlur={changeHandler}
        complete={complete}
        defaultValue={task}
      />
      <FaRegTrashAlt className={styles.trash} onClick={deleteHandler} />
    </DivContainer>
  );
};

export default Task;
