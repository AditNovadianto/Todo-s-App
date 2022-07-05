import { useState } from "react";
import Todo from "./components/Todo";
import swal from "sweetalert";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [Asignment, setAsignment] = useState();
  const [date, setDate] = useState();
  const [error, setError] = useState({});

  const todoHandler = (e) => {
    setAsignment(e.target.value);

    if (e.target.value === "") {
      setError({ ...error, asignment: "Masukkan Todo!" });
    } else {
      setError({ ...error, asignment: "" });
    }
  };

  const dateHandler = (e) => {
    setDate(e.target.value);

    if (e.target.value === "") {
      setError({ ...error, date: "Masukkan Tanggal" });
    } else {
      setError({ ...error, date: "" });
    }
  };

  const addTodo = () => {
    let isError = false;
    let newError = {};

    if (!Asignment) {
      newError.asignment = "Masukkan Todo!";
      isError = true;
    }

    if (!date) {
      newError.date = "Masukkan Tanggal!";
      isError = true;
    }

    if (isError) {
      setError(newError);
      return;
    }

    const newTodo = {
      asignment: Asignment,
      date: date,
      id: Math.random(),
    };

    setTodos([...todos, newTodo]);

    // console.log(newTodo.id);
  };

  const deleteTodo = (id) => {
    const newList = todos.filter((todo) => todo.id !== id);

    // swal("Deleted!", "You have been delete your todo", "success");

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your todo!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Your todo has been deleted!", {
          icon: "success",
        });

        setTodos(newList);
      } else {
        swal("Your todo is safe!");
      }
    });
  };

  const inputs = [
    {
      change: todoHandler,
      type: "text",
      placeHolder: "Masukkan Todo",
      name: "asignment",
    },
    {
      change: dateHandler,
      type: "Date",
      placeHolder: "Masukkan Tanggal",
      name: "date",
      margin: "ml-3",
    },
  ];

  // console.log(error);

  console.log(todos);

  return (
    <div className="flex p-5 flex-col min-h-screen items-center w-full justify-center">
      <h1 className="text-3xl font-Poppins font-bold">Todo's App</h1>

      <div className="w-full">
        <div className="md:w-[50%] m-auto w-full py-10 px-5 flex flex-col">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            {inputs.map((input, index) => (
              <div key={index} className="w-full">
                <input
                  className="border-2 w-full border-purple-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 font-Poppins focus:border-purple-400 transition-all"
                  onChange={input.change}
                  type={input.type}
                  placeholder={input.placeHolder}
                />
                <div
                  className={`${
                    error[input.name]
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-4 opacity-0"
                  } text-red-500 transition-all font-medium font-Poppins text-sm duration-300`}
                >
                  {error[input.name]}
                </div>
              </div>
            ))}
          </div>

          <button
            className="px-3 py-2 font-Poppins text-white font-semibold rounded-xl mt-7 bg-purple-500"
            onClick={addTodo}
          >
            Submit
          </button>
        </div>

        <div className="transition-all max-w-[2000px] m-auto gap-5 flex items-center justify-around flex-wrap w-full">
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              deleteTodo={deleteTodo}
              onAsignmentEdit={(value) => {
                setTodos((todos) => {
                  return [
                    ...todos.slice(0, index),
                    { ...todos[index], asignment: value },
                    ...todos.slice(index + 1),
                  ];
                });
              }}
              onDateEdit={(value) => {
                setTodos((todos) => {
                  return [
                    ...todos.slice(0, index),
                    { ...todos[index], date: value },
                    ...todos.slice(index + 1),
                  ];
                });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
