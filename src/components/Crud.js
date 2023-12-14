import { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const Crud = () => {
  const [state, setstate] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });
  const [data, setdata] = useState([]);
  const [EditItem, setEdit] = useState(null)


  useEffect(() => {
    // Fetch data from the api.
    axios
      .get("http://127.0.0.1:8000/users/")
      .then((response) => {
        setdata(response.data);
      })
      .catch((error) => {
        console.error("Fetching error: ", error);
      });
  }, []);


  // Post data in the Api.
  const Post = () => {
    axios
      .post("http://127.0.0.1:8000/users/", state)
      .then((response) => {
        setdata([...state, response.data]);
        setstate({ username: "", first_name: "", last_name: "", email: "", password: "" });
      })
      .catch((error) => {
        console.error("Posting Error: ", error);
      });
  };

  // Delete data from the api
  const Delete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/users/${id}/`)
      .then(() => {
        const updatedData = data.filter((item) => item.id !== id);
        setdata(updatedData);
      })
      .catch((error) => {
        console.error("Deleting Error: ", error);
      });
  }

  const Update = (id) => {
    const todoToEdit = data.find((Item) => Item.id === id);
    setEdit(todoToEdit);
  };

  const handleUpdate = () => {
    console.log(EditItem.id)
    axios
      .put(`http://127.0.0.1:8000/users/${EditItem.id}/`, EditItem)
      .then((response) => {
        const updatedData = data.map((Item) =>
          Item.id === EditItem.id ? response.data : Item
        );
        setdata(updatedData);
        setEdit(null);
      })
      .catch((error) => {
        console.error("Updating Error: ", error);
      });
  };

  return (
    <>
      {/* Edit Todo */}

      <div class='main'>
        <div class="center">
          {EditItem ? (
            <div>
              <div className="inputbox">
                Username <input type='text' value={EditItem.username} onChange={(e) => setEdit({ ...EditItem, username: e.target.value })} /><br />
                <span>Username</span>
              </div>

              <div className="inputbox">
                Firstname<input type='text' value={EditItem.first_name} onChange={(e) => setEdit({ ...EditItem, first_name: e.target.value })}/><br />
              <span>Firstname</span>
              </div>

              <div className="inputbox">
               Lastname <input type='text' value={EditItem.last_name} onChange={(e) => setEdit({ ...EditItem, last_name: e.target.value })}/><br />
              <span>Lastname</span>
              </div>

              <div className="inputbox">
                Email <input type='email' value={EditItem.email} onChange={(e) => setEdit({ ...EditItem, email: e.target.value })}/><br />
                <span>Email</span>
              </div>

              <div className="inputbox">
                password <input type='password' value={EditItem.password} onChange={(e) => setEdit({ ...EditItem, password: e.target.value })} /><br />
                <span>password</span>
              </div>

              <div className="inputbox">
                <button onClick={handleUpdate}>Update Data</button>
              </div>
            </div>
          ) :
            <div>
              <div className="inputbox">
                Username <input type='text' value={state.username} onChange={(e) => setstate({ ...state, username: e.target.value })}/><br />
                <span>Username</span>
              </div>

              <div className="inputbox">
                Firstname <input type='text' value={state.first_name} onChange={(e) => setstate({ ...state, first_name: e.target.value })}/><br />
                <span>Firstname</span>
              </div>

              <div className="inputbox">
                Lastname <input type='text' value={state.last_name} onChange={(e) => setstate({ ...state, last_name: e.target.value })} /><br />
                <span>Lastname</span>
              </div>

              <div className="inputbox">
                Email <input type='text' value={state.email} onChange={(e) => setstate({ ...state, email: e.target.value })}
                /><br />
                <span>Email</span>
              </div>

              <div className="inputbox">
                Password <input type='text' value={state.password} onChange={(e) => setstate({ ...state, password: e.target.value })}
                /><br />
                <span>Password</span>
              </div>

              <div className="inputbox">
                <button onClick={Post}>Post Data</button>
              </div>
            </div>}
        </div>
      </div>
      
      {/* show data from the api */}
      <div class="center">
        <table>
          {data && data.map((data, key) => {
            return (
              <>
              <tr key={key}>
                <td>{key}</td>
                <td>{data.username}</td>
                <td>{data.firt_name}</td>
                <td>{data.last_name}</td>
                <td>{data.email}</td>
                <td>{data.password}</td>
                <td><button onClick={() => Delete(key)}>Delete</button></td>
                <td><button onClick={() => Update(key)}>Update</button></td>
              </tr>
              </>
            )
          })}
        </table>
      </div>
    </>
  );
}
export default Crud;
