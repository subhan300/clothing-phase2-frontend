import React from "react";
import "./groupButton.css";
export default function GroupButton({ budgetDecisionF, i, row }) {
  const onChangeInput = (e) => {
    budgetDecisionF(e.target.value, row);
  };

  return (
    <div className="radio-toolbar w-190">
      <input
        type="radio"
        id="approveAll"
        value={1}
        name="allReqs"
        
        onClick={(e) => {
          onChangeInput(e);
        }}
      />
      <label className="approve" htmlFor="approveAll">
        <i className="fas fa-check-circle"></i> Approve All
      </label>

      <input
        type="radio"
        id="denyAll"
        value={2}
        name="allReqs"
       
        onClick={(e) => {
          onChangeInput(e);
        }}
      />
      <label className="reject" htmlFor="denyAll">
        <i className="fas fa-times-circle"></i> Reject All
      </label>
    </div>
  );
}
