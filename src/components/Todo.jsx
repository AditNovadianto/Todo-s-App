import { useState } from "react";

const Todo = ({ todo, deleteTodo, onAsignmentEdit, onDateEdit }) => {
  const [editMode, setEditMode] = useState(false);
  const [isChecked, setIsChecked] = useState();

  console.log(isChecked);

  return (
    <div className="p-5 relative overflow-hidden w-[500px] min-h-[300px] rounded-xl mt-5 bg-purple-300">
      <div
        className={`${
          isChecked ? "opacity-100" : "opacity-0"
        } transition-all absolute w-full py-2 px-5 bg-green-200 left-0 top-0`}
      >
        <h2 className="font-Poppins font-semibold text-xl">Completed</h2>
      </div>
      <div
        className={`${
          editMode ? "opacity-100" : "opacity-0"
        } transition-all absolute w-full py-2 px-5 bg-orange-200 left-0 top-0`}
      >
        <h2 className="font-Poppins font-semibold text-xl">Editing</h2>
      </div>
      <p
        className={`${
          isChecked || editMode ? "mt-10" : "mt-0"
        } transition-all w-full font-Poppins font-semibold border-b-2 border-purple-200 pb-2`}
      >
        Todo:{" "}
        <input
          className={`${
            isChecked ? "line-through" : "normal-case"
          } transition-all p-2 outline-none border-2 focus:ring-2 focus:ring-purple-400 border-purple-400 focus:border-purple-600 rounded-md bg-purple-100 w-full block`}
          value={todo.asignment}
          type="text"
          disabled={!editMode}
          onChange={(e) => onAsignmentEdit(e.target.value)}
        />
      </p>
      <p className="w-full font-Poppins font-semibold mt-5 border-b-2 border-purple-200 pb-2">
        Date:{" "}
        <input
          className={`${
            isChecked ? "line-through" : "normal-case"
          } transition-all p-2 outline-none border-2 focus:ring-2 focus:ring-purple-400 border-purple-400 focus:border-purple-600 rounded-md bg-purple-100 block w-full`}
          value={todo.date}
          type="Date"
          disabled={!editMode}
          onChange={(e) => onDateEdit(e.target.value)}
        />
      </p>

      <div className="flex sm:flex-row flex-col sm:items-center sm:gap-5">
        <button
          className="mt-7 font-Poppins px-10 py-2 text-lg font-semibold text-white bg-red-500 rounded-lg"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
        <button
          onClick={() => setEditMode(!editMode)}
          className="px-10 py-2 text-lg font-Poppins font-semibold text-white bg-blue-300 rounded-lg mt-7"
        >
          {editMode ? "Save" : "Edit"}
        </button>
        <label className="form-control w-max m-auto sm:m-0">
          <input
            className="cursor-pointer"
            type="checkbox"
            onChange={(e) => setIsChecked(e.target.checked)}
          />
        </label>
      </div>
    </div>
  );
};

export default Todo;
