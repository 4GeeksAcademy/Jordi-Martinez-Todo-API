import React, { useState, useEffect } from "react";

const URLBASE = "https://playground.4geeks.com/todo";

const Todolist = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const addItem = async (e) => {
        try {
            if (e.key === "Enter" && inputValue.trim() !== "") {
                const response = await fetch(`${URLBASE}/todos/JordiMtz`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ label: inputValue }),
                });
                if (response.ok) {
                    getAllInputs();
                    setInputValue("");
                } else {
                    console.log("Error al cargar los datos");
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteItem = (id) => {
        fetch(`${URLBASE}/todos/${id}`, {
            method: "DELETE",
        })
            .then(() => getAllInputs())
            .catch((error) => console.log(error));
    };

    const getAllInputs = async () => {
        try {
            const response = await fetch(`${URLBASE}/users/JordiMtz`);
            const data = await response.json();
            if (response.status === 404) {
                createUser();
                getAllInputs();
            } else {
                setTodos(data.todos);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const createUser = async () => {
        try {
            await fetch(`${URLBASE}/users/JordiMtz`, {
                method: "POST",
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllInputs();
    }, []);

    return (
        <>
            <div className="title">
                <p>ToDo's</p>
            </div>
            <div className="first-page">
                <input
                    className="input-style ms-3"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Add element"
                    onKeyDown={addItem}
                    name="Label"
                />
                {todos.map((item) => (
                    <div key={item.id} className="d-flex justify-content-between list">
                        <div>{item.label}</div>
                        <span className="x-style" onClick={() => deleteItem(item.id)}>
                            x
                        </span>
                    </div>
                ))}
                <p className="ms-3 text-muted">Items ToDo: {todos.length}</p>
            </div>
            <div className="second-page"></div>
            <div className="third-page"></div>
        </>
    );
};

export default Todolist;
