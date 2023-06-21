import React, { useState, useEffect } from "react";
import { Form, Select, Input, Button } from "antd";
import { p1, p2, p3 } from "../../assets/images";
import { useAddNewEmployeeMutation, useGetAllCompaniesQuery } from "../../apis";
import { useDispatch } from "react-redux";
import { showPopup, errorPopup } from "../../redux-slice/UserSliceAuth";
const { Option } = Select;

const products = [
  { id: 1, name: "Product 1", image: p1 },
  { id: 2, name: "Product 2", image: p2 },
  { id: 3, name: "Product 3", image: p3 },
];

function AddEmployeeTab() {
  const [form] = Form.useForm();
  const [addNewEmployee, response] = useAddNewEmployeeMutation();
  const { data, error, isLoading, refetch } = useGetAllCompaniesQuery();
  console.log("data", data);
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState({});
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Form values:", values);
    const companyName = data.filter((val) => val._id === values.companyId)[0]
      .companyName;
    values = { ...values, companyName};
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
            message: `company not ceated due to ${error}`,
          })
        );
      });
  };

  const companySelected=(value)=>{
    const company=companies.filter(val=>val._id===value)[0];
    setCompany(company);
  }
  console.log(company)
  useEffect(() => {
    refetch();
    if (data) {
      setCompanies(data);
    }
  }, [isLoading]);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Add New Employee</h1>
      <Form
        form={form}
        name="myForm"
        className="space-y-2 mt-2"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="employeeName"
          label="Name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          name="companyId"
          label="Company"
          rules={[{ required: true, message: "Please select a company" }]}
        >
          <Select placeholder="Select company" onChange={(e)=>{companySelected(e)}}>
            {companies.map((company) => (
              <Option key={company} value={company._id}>
                {company.companyName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {company?.budget && (
          <Form.Item
            name="budget"
            label="Enter Budget"
            rules={[{ required: true, message: "Please enter  Budget" }]}
          >
            <Input placeholder="Enter your Budget" type="number" />
          </Form.Item>
        )}

        <Form.Item
          name="products"
          label="Products"
          rules={[
            { required: true, message: "Please select at least one product" },
          ]}
        >
          <Select mode="multiple" placeholder="Select products">
            {products.map((product) => (
              <Option key={product.id} value={product.name}>
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-6 h-6 mr-2"
                  />
                  {product.name}
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select a Gender" }]}
        >
          <Select placeholder="Select Gender">
            <Option value={"M"}>Male</Option>
            <Option value={"F"}>Female</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="employeeEmail"
          label="Email"
          rules={[{ required: true, message: "Please enter Employee email" }]}
        >
          <Input placeholder="Enter your email" type="email" />
        </Form.Item>

        <Form.Item
          name="employeePassword"
          label="Employee Password"
          rules={[
            { required: true, message: "Please enter Employee Password" },
          ]}
        >
          <Input.Password placeholder="Employee Password" />
        </Form.Item>

        <Form.Item
          name="employeePhone"
          label="Phone Number"
          rules={[{ required: true, message: "Please enter  phone number" }]}
        >
          <Input placeholder="Enter your phone number" type="tel" />
        </Form.Item>

        <Form.Item>
          <Button
            type=""
            className="bg-black hover:bg-black text-white"
            htmlType="submit"
          >
            Add Employee
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddEmployeeTab;
