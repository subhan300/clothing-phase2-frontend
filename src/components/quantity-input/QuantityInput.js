import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { errorPopup } from "../../redux-slice/UserSliceAuth";

function QuantityInput({
  updateProductQuantity,
  productId,
  rowId,
  initialQty,
  checkIsProductSelected,
  pastOrder,
  isDrawerProduct
}) {
  const [qty, setQty] = useState(initialQty);
  const dispatch = useDispatch();

  const quantityUpdate = (value) => {
    setQty(value);
    updateProductQuantity(productId, value, rowId,isDrawerProduct);
  };

  return (
    <div style={{ width: "100%", borderRadius: "6px", marginTop: "-2px" }}>
      {pastOrder ? (
        <div>
          {" "}
          <span className="text-xs text-white text-center font-semibold">
            {qty}
          </span>
        </div>
      ) : (
        <input
          style={{
            width: "100%",
            backgroundColor: "transparent",
            border: "1px solid white",
            borderRadius: "6px",
          }}
          className="text-center "
          placeholder="Qty"
          value={qty}
          min={1}
          type="number"
          onChange={(e) => {
            quantityUpdate(e.target.value);
          }}
        ></input>
      )}
    </div>
  );
}

export default QuantityInput;
