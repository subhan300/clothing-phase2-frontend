import React, { useEffect, useState } from "react";
import { Table, Input, Button, Select, Space, Form, Row, Col, Spin } from "antd";
import { useAddNewEmployeeMutation, useEditEmployeeMutation, useGetEmployeesByCompanyIdQuery } from "../apis";
import { useDispatch } from "react-redux";
import { showPopup,errorPopup } from "../redux-slice/UserSliceAuth";
import { adminEditGlobalFunctions } from "../global-functions/adminEditGlobalFunction";

const { Option } = Select;

function EmployeeEditComponent(EmployeeEditComponentProps) {
  const {selected}=EmployeeEditComponentProps;
  const {data,isLoading,refetch}=useGetEmployeesByCompanyIdQuery({companyId:selected.record._id});
  
  const [editEmployee, response] =  useEditEmployeeMutation();
  const [addNewEmployee, response2] = useAddNewEmployeeMutation();

  const [employees,setEmployees]=useState([])

  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [editingRow, setEditingRow] = useState({
    state: false,
    record: {},
    updatedValues: {},
  });
  const onFinish = (values) => {
    console.log("Form values:", values);
    const companyName = selected.record.companyName;
    values = { companyId:selected.record._id,...values, companyName,products:[{productName:"t-shirt",productImage:"https://image.com",productSize:"M",productPrice:20}] ,budget:200,};
    addNewEmployee(values)
      .unwrap()
      .then((res) => {
        dispatch(showPopup({ state: true, message: "Employee Created" }));
        form.resetFields();
      })
      .catch((error) => {
        dispatch(
          errorPopup({
            state: true,
            message: `Employee not ceated due to ${error}`,
          })
        );
      });
  };
  const handleSave = () => {
    let values = { ...editingRow.updatedValues };
    editEmployee({ payload: values, id: editingRow.record._id })
      .unwrap()
      .then((res) => {
        const removeCompany = employees.filter(
          (val) => val._id !== editingRow.record._id
        );

        const sortedData = adminEditGlobalFunctions.sortData(
          [...removeCompany, { ...res.result, SNO: editingRow.record.SNO }],
          "SNO"
        );

        setEmployees((prev) => sortedData);
        dispatch(showPopup({ state: true, message: "Employee record updated" }));
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
    debugger;
    console.log("val", val, "selectedRecord", selectedRecord);
    const editRecord = { [key]: val };
    const updatedRecord = { ...editingRow.record, [key]: val };

    setEditingRow((prev) => ({
      ...prev,
      state: true,
      updatedValues: editRecord,
      record: updatedRecord,
    }));
    setEmployeesUpdatedData (updatedRecord, selectedRecord);
  };
  const setEmployeesUpdatedData = (updatedRecord, selectedRecord) => {
    let filterEmployees = employees.filter(
      (val) => val._id === selectedRecord._id
    )[0];
    filterEmployees = { ...updatedRecord };
    const removeEmployees = employees.filter(
      (val) => val._id !== selectedRecord._id
    );
    const sordtedData = adminEditGlobalFunctions.sortData(
      [...removeEmployees, filterEmployees],
      "SNO"
    );
    setEmployees(sordtedData);
  };


  useEffect(()=>{
    if(data){
      const addDataSNO = data.map((val, i) => ({ ...val, SNO: i }));
      setEmployees(addDataSNO)
    }
  },[isLoading])

 console.log("employees",isLoading,"employee222",employees)
  return (
    <>
      <h1 className="font-bold mt-5">Employees</h1>

      <div className="flex justify-between p-2 bg-gray-200 mt-2">
        <Form form={form} onFinish={onFinish}>
          <Row gutter={16}>
            <Col xs={24} sm={5} md={5}>
              <Form.Item
                name="employeeName"
                rules={[
                  {
                    required: true,
                    message: "Please enter the new company name",
                  },
                ]}
              >
                <Input placeholder="Name" required />
              </Form.Item>
            </Col>

            <Col xs={24} sm={5} md={4}>
              <Form.Item
                name="employeeEmail"
                rules={[
                  {
                    required: true,
                    message: "Please enter the email",
                  },
                ]}
              >
                <Input placeholder="Email" required />
              </Form.Item>
            </Col>

            <Col xs={24} sm={5} md={4}>
              <Form.Item
                name="employeePassword"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Password",
                  },
                ]}
              >
                <Input placeholder="Password" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={5} md={4}>
              <Form.Item
                name="employeePhone"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Phone Number",
                  },
                ]}
              >
                <Input type="number" placeholder="Phone Number" required />
              </Form.Item>
            </Col>
            {employees?.budget && (
              <Col xs={24} sm={5} md={4}>
                <Form.Item
                  name="budget"
                  label="Enter Budget"
                  rules={[{ required: true, message: "Please enter  Budget" }]}
                >
                  <Input placeholder="Enter your Budget" type="number" />
                </Form.Item>
              </Col>
            )}
            <Col xs={24} sm={5} md={4}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: "Please select a Gender" }]}
              >
                <Select style={{ width: "100%" }} placeholder="Gender">
                  <Option value={"M"}>M</Option>
                  <Option value={"F"}>F</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={5} md={4}>
              <Button
                type=""
                className="bg-black text-white hover:bg-black"
                // onClick={handleAddProduct}
              >
                Select Products
              </Button>
            </Col>
            <Col className="ml-8" xs={24} sm={5} md={4}>
              <Button
                htmlType="submit"
                className="bg-black text-white hover:bg-black"
                // onClick={handleAddUser}
              >
                Add User
              </Button>
            </Col>

            <Col xs={24} sm={8}>
              <Input.Search
                placeholder="Search"
                // onSearch={handleSearch}
                enterButton
              />
            </Col>
          </Row>
        </Form>
      </div>

     <Spin spinning={isLoading || response.isLoading ||response2.isLoading}>
     <Table
        columns={adminEditGlobalFunctions.employeesColumn(handleEdit,handleSave,editingRow,setEditingRow)}
        dataSource={employees}
        pagination={false}
        rowKey="key"
        className="mt-2"
      />
     </Spin>
    </>
  );
}

export default EmployeeEditComponent;
