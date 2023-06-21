import React, { useState, useEffect } from "react";

function EditableInput({
  id,
  value,
  updatedInput,
  updateBudgetF,
  showBtn,
  inputBudgetRequest,
}) {
  const [edit, setEdit] = useState({ value: value, inputId: id });

  const setInputFunc = (val) => {
    setEdit((prev) => ({ ...prev, value: val }));
  };

  const updateOnClick = () => {
   if(inputBudgetRequest==false || inputBudgetRequest==undefined){
     setInputFunc(0);
   }
    updateBudgetF();
  };
  useEffect(() => {

    updatedInput(edit);
  }, [edit]);

  useEffect(() => {
    if (value != undefined && id != undefined) {
      setEdit({ value: value, inputId: id });
    }
  }, [value]);
  return (
    <div className="w-20">
     <div className="flex flex-between align-center items-center block w-full p-2   text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500">
     <input
        style={{border:"none",width:"80%"}}
        type="number"
        className="bg-gray-50"
        value={edit.value}
        onChange={(e) => {
          setInputFunc(e.target.value);
        }}
      />
      <span>€</span>
     </div>

      {showBtn || inputBudgetRequest ? (
        <button
          className="mt-3 flex justify-content-center mx-auto bg-black text-white rounded-md text-xs p-1"
          onClick={() => {
            updateOnClick();
          }}
        >
          Update
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default EditableInput;
