import React, { useEffect, useState } from "react";
import { Form, Row, Col, Select, Input, Button, Modal, Upload } from "antd";
import ProductsModal from "../../components/products-modal/ProductsModal";
import { PlusOutlined } from '@ant-design/icons';
import { useAddNewCompanyMutation, useGetAllProductsApiQuery, useGetCompanyAllProductsQuery } from "../../apis";
import { showPopup, errorPopup } from "../../redux-slice/UserSliceAuth";
import { useDispatch } from "react-redux";
import { p1 } from '../../assets/images';
import { p2 } from '../../assets/images';


const { Option } = Select;

const budgetOptions = ["Show Budget Settigs", "No Budget Settings"];
const pricingOptions = ["yes", "no"];

function AddCompanyTab() {
  const [addNewCompany, response] = useAddNewCompanyMutation();
  const {data,isLoading,refetch}=useGetAllProductsApiQuery()
 const [products,setProducts]=useState([])
 const [selectedProduct,setSelectedProduct]=useState([])
  const dispatch=useDispatch();
  const [form]=Form.useForm();

  const onFinish = (values) => {
    debugger
    console.log("Form values:", values);
    if(!selectedProduct.length){
           return dispatch(errorPopup({state:true,message:"Please Select Products"}))
    }
    const tempProduct=selectedProduct.map(val=>{return {productImage:val.productImage,productName:val.productName,productSize:val.productSize,productPrice:val.productPrice,productQuantity:val.productQuantity}})
    values={status:1,...values,products:[...tempProduct],companyLogo:"https://s3.amazonaws.com/cdn.designcrowd.com/blog/100-Famous-Brand%20Logos-From-The-Most-Valuable-Companies-of-2020/apple-logo.png"}
    
    addNewCompany(values)
    .unwrap()
    .then((res) => {

      dispatch(
        showPopup({ state: true, message: "Company Created" })
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const productsSelected=()=>{
    if(selectedProduct.length>0){
      dispatch(showPopup({state:true,message:"Products Selected"}))
      handleModal(false)

    }else{
      dispatch(errorPopup({state:true,message:"No  Products Are Selected"}))
    }
  }
  const handleModal=(val)=>{
     setIsModalOpen(val)}
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
 useEffect(()=>{
  if(data){
    const tempData=data.map(val=>{return {...val,productId:val._id}})
    setProducts(tempData)
   
  }
},[isLoading])
  return (
    <div clas>
      <h1 className="text-2xl font-semibold">Create New Company</h1>
      <Form form={form} className="mt-6" onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="New Company Name"
              name="companyName"
              rules={[
                {
                  required: true,
                  message: "Please enter the new company name",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Budget Setting"
              name="budget"
             
            >
              <Select>
                {budgetOptions.map((options) => (
                  <Option key={options} value={options==="Show Budget Settigs"?1:0}>
                    {options}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Pricing Setting"
              name="pricing"
             
            >
              <Select>
                {pricingOptions.map((options) => (
                  <Option key={options} value={options==="yes"?1:0}>
                    {options}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
         
          <Col xs={24} sm={12}>
            <Form.Item
              label="Company Phone"
              name="companyPhone"
              rules={[
                {
                  required: true,
                  message: "Please enter the new company Phone Number",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Company Email"
              name="companyEmail"
              rules={[
                {
                  required: true,
                  message: "Please enter the new company  Email",
                },
              ]}
            >
              <Input  type="email" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Company Fax"
              name="companyFax"
              rules={[
                {
                  required: true,
                  message: "Please enter the new company  Fax",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
       
          <Col xs={24} sm={12}>
            <Form.Item
              label="Company Location"
              name="companyLocation"
              rules={[
                {
                  required: true,
                  message: "Please enter the new company Phone Email",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
         
     

       

          
          </Row>
          <Row gutter={12} className="mt-4">
        <Col xs={24} sm={8}>
          <Form.Item name="logo" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
          </Col>
      
          <Col xs={24} sm={6}>
            <Form.Item label="Add company products">
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button type="dashed" onClick={()=>{handleModal(true)}}>
                  Select
                </Button>
                <ProductsModal
                  open={isModalOpen}
                  onOk={()=>{productsSelected()}}
                  onCancel={()=>{handleModal(false)}}
                  images={products}
                  selectedProduct={selectedProduct}
                  setSelectedProduct={setSelectedProduct}
                />
              </div>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Button
              type=""
              className="bg-black !hover:bg-black text-white"
              htmlType="submit"
            >
              Add Company
            </Button>
          </Col>
        </Row>

      </Form>
    </div>
  );
}

export default AddCompanyTab;
