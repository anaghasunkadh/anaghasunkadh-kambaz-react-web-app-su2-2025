import { useState } from "react";
import { FormControl } from "react-bootstrap";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithArrays() {
    
    const API = `${REMOTE_SERVER}/lab5/todos`;

    const [retrieveTodo, setRetrieveTodo] = useState({ id: "1" });
    const [deleteTodo, setDeleteTodo] = useState({ id: "1" });
    const [updateTitleTodo, setUpdateTitleTodo] = useState({
        id: "1",
        title: "NodeJS Assignment"
    });
    const [updateDescTodo, setUpdateDescTodo] = useState({
        id: "1",
        description: "Create a NodeJS server with ExpressJS"
    });
    const [updateCompletedTodo, setUpdateCompletedTodo] = useState({
        id: "1",
        completed: false
    });

    return (
        <div id="wd-working-with-arrays">
            <h3>Working with Arrays</h3>
            <h4>Retrieving Arrays</h4>
            <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
                Get Todos </a><hr />

            <h4>Retrieving an Item from an Array by ID</h4>
            <a id="wd-retrieve-todo-by-id" className="btn btn-primary float-end"
                href={`${API}/${retrieveTodo.id}`}>
                Get Todo by ID
            </a>
            <FormControl id="wd-todo-id" defaultValue={retrieveTodo.id} className="w-50"
                onChange={(e) => setRetrieveTodo({ ...retrieveTodo, id: e.target.value })} />
            <hr />

            <h3>Filtering Array Items</h3>
            <a id="wd-retrieve-completed-todos" className="btn btn-primary"
                href={`${API}?completed=true`}>
                Get Completed Todos
            </a><hr />

            <h3>Creating new Items in an Array</h3>
            <a id="wd-create-todo" className="btn btn-primary"
                href={`${API}/create`}>
                Create Todo
            </a><hr />

            <h3>Deleting from an Array</h3>
            <a id="wd-delete-todo" className="btn btn-primary float-end"
                href={`${API}/${deleteTodo.id}/delete`}>
                Delete Todo with ID = {deleteTodo.id}
            </a>
            <FormControl defaultValue={deleteTodo.id} className="w-50"
                onChange={(e) => setDeleteTodo({ ...deleteTodo, id: e.target.value })} />
            <hr />

            <h3>Updating an Item in an Array</h3>
            <a href={`${API}/${updateTitleTodo.id}/title/${updateTitleTodo.title}`}
                className="btn btn-primary float-end">
                Update Todo
            </a>
            <FormControl defaultValue={updateTitleTodo.id} className="w-25 float-start me-2"
                onChange={(e) => setUpdateTitleTodo({ ...updateTitleTodo, id: e.target.value })} />
            <FormControl defaultValue={updateTitleTodo.title} className="w-50 float-start"
                onChange={(e) => setUpdateTitleTodo({ ...updateTitleTodo, title: e.target.value })} />
            <br /><br /><hr />

            <h4>Update Description</h4>
            <div className="d-flex align-items-center mb-3">
                <FormControl defaultValue={updateDescTodo.id} className="me-2" style={{ width: "150px" }}
                    onChange={(e) => setUpdateDescTodo({ ...updateDescTodo, id: e.target.value })} />
                <FormControl defaultValue={updateDescTodo.description} className="me-2"
                    as="textarea" rows={2}
                    onChange={(e) => setUpdateDescTodo({ ...updateDescTodo, description: e.target.value })} />
                <a href={`${API}/${updateDescTodo.id}/description/${updateDescTodo.description}`}
                    className="btn btn-primary">
                    Update Description
                </a>
            </div>
            <hr />

            <h4>Update Completed Status</h4>
            <div className="d-flex align-items-center mb-3">
                <FormControl defaultValue={updateCompletedTodo.id} className="me-2" style={{ width: "150px" }}
                    onChange={(e) => setUpdateCompletedTodo({ ...updateCompletedTodo, id: e.target.value })} />
                <FormControl
                    defaultValue={updateCompletedTodo.completed.toString()}
                    className="me-2"
                    style={{ width: "150px" }}
                    placeholder="true or false"
                    onChange={(e) => setUpdateCompletedTodo({ ...updateCompletedTodo, completed: e.target.value === "true" })}>
                </FormControl>
                <a href={`${API}/${updateCompletedTodo.id}/completed/${updateCompletedTodo.completed}`}
                    className="btn btn-primary">
                    Update Completed
                </a>
            </div>
            <hr />
        </div>
    );
}