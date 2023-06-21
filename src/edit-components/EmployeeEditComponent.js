import React, { useState } from "react";
import { Table, Input, Button, Select, Space, Form, Row, Col } from "antd";

const { Option } = Select;

function EmployeeEditComponent({ EmployeeEditComponentProps}) {
  console.log("emploprops",EmployeeEditComponentProps)
  const company  =""
 const dataSource=[]
  const [form] = Form.useForm();
  const [editingRow, setEditingRow] = useState(null);
  const onFinish = (values) => {
    console.log("values", values);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) =>
        editingRow === record.key ? (
          <Input value={text} onChange={() => {}} />
        ) : (
          text
        ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) =>
        editingRow === record.key ? (
          <Input value={text} onChange={() => {}} />
        ) : (
          text
        ),
    },
    {
      title: "Phone No",
      dataIndex: "phone",
      render: (text, record) =>
        editingRow === record.key ? (
          <Input value={text} onChange={() => {}} />
        ) : (
          text
        ),
    },
    {
      title: "Company",
      dataIndex: "company",
      render: (text, record) =>
        editingRow === record.key ? (
          <Select
            value={text}
            // onChange={handleCompanyChange}
            placeholder="Select a company"
            allowClear
          >
            <Option value="company1">Company 1</Option>
            <Option value="company2">Company 2</Option>
          </Select>
        ) : (
          text
        ),
    },
    {
      title: "Add Product",
      dataIndex: "addProduct",
      render: (text, record) => (
        <Button className="bg-black text-white">Add Product</Button>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <Button
          className="border-none"
          onClick={() => {}}
          // handleEdit(record)}
        >
          <span class="material-symbols-rounded">edit_square</span>
        </Button>
      ),
    },
  ];

  return (
    <>
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
            {company?.budget && (
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
                <Select style={{ width: "100%" }} placeholder="Select Gender">
                  <Option value={"M"}>Male</Option>
                  <Option value={"F"}>Female</Option>
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

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey="key"
        className="mt-2"
      />
    </>
  );
}

export default EmployeeEditComponent;
