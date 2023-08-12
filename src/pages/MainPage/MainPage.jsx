import axios from "axios";
import React from "react";
import { AuthContext } from "../../AuthContext/AuthContext";

const MainPage = () => {
  const [text, SetText] = React.useState("");
  const [mas, SetMas] = React.useState([]);

  const { userId } = React.useContext(AuthContext);
  const getTodos = React.useCallback(async () => {
    try {
      const { data } = await axios.get("/api/todo", {
        headers: {
          "Content-Type": "application/json",
        },
        params: { userId },
      });
      SetMas(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, [userId]);
  const createTodos = React.useCallback(async () => {
    try {
      await axios.post(
        "api/todo/add",
        { text, userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      SetText("");
      getTodos();
    } catch (error) {
      console.log(error);
    }
  }, [getTodos, userId, text]);

  const removeTodo = React.useCallback(
    async (id) => {
      try {
        await axios
          .delete(
            `/api/todo/delete/${id}`,
            { id },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => getTodos());
      } catch (error) {
        console.log(error);
      }
    },
    [getTodos]
  );
  const setCompleted = React.useCallback(
    async (id) => {
      try {
        await axios
          .put(
            `/api/todo/complete/${id}`,
            { id },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            SetMas([...mas, res.data]);
            getTodos();
          });
      } catch (error) {
        console.log(error);
      }
    },
    [getTodos, mas]
  );
  const setImportant = React.useCallback(
    async (id) => {
      try {
        await axios
          .put(
            `/api/todo/important/${id}`,
            { id },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            SetMas([...mas, res.data]);
            getTodos();
            //console.log(res);
          });
      } catch (error) {
        console.log(error);
      }
    },
    [getTodos, mas]
  );
  React.useEffect(() => {
    getTodos();
  }, [getTodos]);
  return (
    <div className="container">
      <div className="main-page">
        <h4>Додати завдання </h4>
        <form className="form form-login" onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            <div className="input-field col s12">
              <input
                value={text}
                onChange={(e) => SetText(e.target.value)}
                placeholder="Завдання"
                type="text"
                id="text"
                name="input"
                className="validate"
              />
            </div>
          </div>
          <div className="row">
            <button
              onClick={() => text && createTodos()}
              className="waves-effect waves-light btn  gray"
            >
              Додати
            </button>
          </div>
        </form>
        <h3>Активні Завдання</h3>
        {mas?.map((m, index) => {
          let completedClass = ["row flex todos-item"];
          if (m.isCompleted) completedClass.push("completed");
          if (m.isImportant) completedClass.push("important");
          return (
            <div className="todos ">
              <div className={completedClass.join(" ")}>
                <div className="col todos-num">{index + 1}</div>
                <div className="col todos-text">{m.text}</div>
                <div className="col todos-buttons">
                  <i
                    className="material-icons green-text"
                    onClick={() => setCompleted(m._id)}
                  >
                    check
                  </i>
                  <i
                    className="material-icons orange-text"
                    onClick={() => setImportant(m._id)}
                  >
                    warning
                  </i>
                  <i
                    onClick={() => removeTodo(m._id)}
                    className="material-icons red-text"
                  >
                    delete
                  </i>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainPage;
