const baseURL = "http://localhost:4200"

export async function GetAllTodoList() {
    const url = `${baseURL}/todo`
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log('GetAllTodoList', jsonData);
    return jsonData
}
// export async function GetAllTodoListByUserAccountId(userAccountId) {
//     const url = baseURL + '/todo/user/' + userAccountId;
//     const response = await fetch(url);
//     const jsonData = await response.json();
//     console.log('GetAllTodoListByUserId', jsonData);
//     return jsonData; 
// }
export async function GetAllTodoListByUserAccountId(userAccountId) {
    const url = baseURL + '/todo/user/' + userAccountId;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData
}

export async function GetTodoById(id) {
    const url = `${baseURL}/todo/${id}`
    // Default options are marked with *
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData
}

export async function DeleteTodoById(id) {
    const url = `${baseURL}/todo/delete/${id}`;
    
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        return response.status;
      } else {
        console.log("Request failed with status:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

export async function EditTodoById(id, description) {
    const url = `${baseURL}/todo/${id}?description=${description}`
    // Default options are marked with *
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const jsonData = await response.json();
    console.log(jsonData);
    return response.status;
}

export async function UpdateTodoCheckboxById(id, isChecked) {
    console.log("checkbox status in UpdateTodoCheckboxById:", isChecked);

    const url = `${baseURL}/todo/${id}?isChecked=${isChecked}`;
    const response = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const jsonData = await response.json();
    console.log(jsonData);
    return response.status;
}


export async function AddNewTodo(payload) {
    var id = localStorage.getItem("CurrentUserId");
    const url = `${baseURL}/todo/add/${id}`
    // Default options are marked with *

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload), // body data type must match "Content-Type" header
        });
        console.log("response", response);
        const jsonData = await response.json();
        console.log("Id: ", jsonData);
        return response.status
};

