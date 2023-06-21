import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Button,
  Select,
  Space,
  Form,
  Row,
  Col,
  Radio,
} from "antd";
import EmployeeEditComponent from "../../edit-components/EmployeeEditComponent";
import ManagerEditComponent from "../../edit-components/ManagerEditComponent";
import CompanyEditComponent from "../../edit-components/CompanyEditComponent";
import { useGetAllCompaniesQuery } from "../../apis";
import CompanyIndividualEditComponent from "../../edit-components/CompanyIndividualEdit";
import { adminEditGlobalFunctions } from "../../global-functions/adminEditGlobalFunction";

const { Option } = Select;

function AdminEdit() {
  const { data, error, isLoading, refetch } = useGetAllCompaniesQuery();
  console.log("data", data);
  const [company, setCompany] = useState();
  const [selected, setSelected] = useState({ record: {}, isSelected: false });

  const dataSource = ["k"];
  const EmployeeEditComponentProps = {
    dataSource,
    company,
  };
  const rowSelection = {
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected);
      setSelected({ record, isSelected: selected });
    },

    hideSelectAll: false,
  };
  const companyEditProps = {
    company,
    error,
    isLoading,
    refetch,
    type: "all",
    rowSelection,
    setCompany,
    selected,
    setSelected,
  };
  const companyIndividualEditProps = {
    error,
    isLoading,
    company,setCompany,
    refetch,
    type: "all",
    rowSelection,
    selected,
    setSelected,
  };
  const managerProps = {
    selected,
    setSelected,
  }
  console.log(selected);
  useEffect(() => {
    console.log("company=====", company);
    if (data) {
      const addDataSNO = data.map((val, i) => ({ ...val, SNO: i }));
      setCompany(addDataSNO);
    }
  }, [isLoading]);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Add-Edit Inventory</h1>
      {!selected.isSelected ? (
        <CompanyEditComponent {...companyEditProps} />
      ) : (
        <Button
          onClick={() => {
            setSelected({ isSelected: false, record: {} });
          }}
        >
          Leave Editing
        </Button>
      )}
      {selected.isSelected && (
        <>
          <CompanyIndividualEditComponent {...companyIndividualEditProps} />
          <ManagerEditComponent {...managerProps} />
          <EmployeeEditComponent {...EmployeeEditComponentProps} />
        </>
      )}
    </div>
  );
}

export default AdminEdit;
