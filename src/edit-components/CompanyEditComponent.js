import { Button, Input, Spin, Table } from "antd";
import React, { useState } from "react";
import { adminEditGlobalFunctions } from "../global-functions/adminEditGlobalFunction";
import { useEditCompanyMutation } from "../apis";
import { errorPopup, showPopup } from "../redux-slice/UserSliceAuth";
import { useDispatch } from "react-redux";

function CompanyEditComponent({
  company,
  setCompany,
  error,
  isLoading,
  refetch,
  type,
  rowSelection,
}) {

  const dispatch = useDispatch();
  const [editingRow, setEditingRow] = useState({
    state: false,
    record: {},
    updatedValues: {},
  });
  const [editCompany, response] = useEditCompanyMutation();
  const handleSave = () => {
    let values = { ...editingRow.updatedValues };
    editCompany({ payload: values, id: editingRow.record._id })
      .unwrap()
      .then((res) => {
        const removeCompany = company.filter(
          (val) => val._id !== editingRow.record._id
        );

        const sortedData = adminEditGlobalFunctions.sortData(
          [...removeCompany, { ...res.result, SNO: editingRow.record.SNO }],
          "SNO"
        );

        setCompany((prev) => sortedData);
        dispatch(showPopup({ state: true, message: "comany record updated" }));
      })
      .catch((error) => {
        dispatch(
          errorPopup({
            state: true,
            message: `company edit  not due to ${error}`,
          })
        );
      });
  };
  const handleEdit = (key, val, selectedRecord) => {
    debugger
    console.log("val", val, "selectedRecord", selectedRecord);
    const editRecord = { [key]: val };
    const updatedRecord = { ...editingRow.record, [key]: val };

    setEditingRow((prev) => ({
      ...prev,
      state: true,
      updatedValues: editRecord,
      record: updatedRecord,
    }));
    setCompanyUpdatedData(updatedRecord, selectedRecord);
  };
  const setCompanyUpdatedData = (updatedRecord, selectedRecord) => {
    let filterCompany = company.filter(
      (val) => val._id === selectedRecord._id
    )[0];
    filterCompany = { ...updatedRecord };
    const removeCompany = company.filter(
      (val) => val._id !== selectedRecord._id
    );
    const sordtedData = adminEditGlobalFunctions.sortData(
      [...removeCompany, filterCompany],
      "SNO"
    );
    setCompany(sordtedData);
  };

  return (
    <div>
      <Spin spinning={response.isLoading} error={error}>
        <Table
          columns={adminEditGlobalFunctions.companyColumns(
            handleEdit,
            handleSave,
            editingRow,
            setEditingRow
          )}
          dataSource={company}
          pagination={false}
          rowKey={(record) => {
            return record._id;
          }}
          rowSelection={rowSelection && { ...rowSelection, type: "radio" }}
          className="mt-2"
        />
      </Spin>
    </div>
  );
}

export default CompanyEditComponent;
