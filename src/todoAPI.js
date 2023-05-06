const baseURL = "http://localhost:4200/api"

export async function GetAllTodoList() {
    const url = `${baseURL}/todo`
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log('GetAllTodoList', jsonData);
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
    const url = `${baseURL}/todo/delete/${id}`
    // Default options are marked with *
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const jsonData = await response.json();
    console.log(jsonData);
    return response.status;
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

export async function AddNewTodo(payload) {
    const url = `${baseURL}/todo/add`
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // body data type must match "Content-Type" header
    });
    console.log("responseee", response);
    const jsonData = await response.json();
    console.log("Iddddd: ", jsonData);
    return response.status
};