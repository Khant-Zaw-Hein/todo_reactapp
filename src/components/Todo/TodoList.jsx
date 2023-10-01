import React from 'react';
import TodoItem from './TodoItem';

const ToDoList = ({itemList, setItemList}) => {
    const items = itemList.map((item) => <TodoItem key={item.ID} item={item} setItemList={setItemList}/>);

    return (
        <div 
        style={{ marginTop: '15px' }}>
            {items}
        </div>
    )
}

export default ToDoList;


