import React,{useState,useEffect} from "react";
import { Form, Input, Select, Button } from "antd";
import { useDispatch } from "react-redux";
import {useGetAllCompaniesQuery,useAddNewManagerMutation } from "../../apis/Admin";
import { showPopup,errorPopup } from "../../redux-slice/UserSliceAuth";
const { Option } = Select;

function AddManagerTab() {
  const [form]=Form.useForm();
  const [addNewManager, response] = useAddNewManagerMutation();
  const  { data, error, isLoading ,refetch} = useGetAllCompaniesQuery();
  console.log("data",data)
  const [companies, setCompanies] = useState(data);
  const dispatch=useDispatch();
  const onFinish = (values) => {
    console.log("Form values:", values);
    const companyName=data.filter(val=>val._id===values.companyId)[0].companyName;
    values={...values,companyName}
    addNewManager(values)
    .unwrap()
    .then((res) => {

      dispatch(
        showPopup({ state: true, message: "Manager Created" })
      );
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

  console.log("get companies",companies);
  useEffect(()=>{
    refetch();
    if(data){
      setCompanies(data)
    }
  },[isLoading])
  return (
    <div>
      <h1 className="text-2xl font-semibold">Add New Manager</h1>
      <Form
        className="space-y-2 mt-2"
        name="myForm"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="Manager Name"
          name="name"
          rules={[{ required: true, message: "Please enter Manager Name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="managerEmail"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="managerPassword"
          type="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Company"
          name="companyId"
          rules={[{ required: true, message: "Please select a company" }]}
        >
          <Select>
            {companies?.map(val=><Option value={val?._id}>{val?.company}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="submit" htmlType="submit" className="bg-black text-white hover:bg-black ml-4">
            Add Manager
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddManagerTab;
