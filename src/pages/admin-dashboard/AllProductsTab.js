import { useState, useEffect, useCallback } from "react";
import { Upload, message, Button, Modal, Input, Spin, Popconfirm } from "antd";
import { AllProductStyle } from "../../admin-style/AllProductUploadStyle";
import FileUpload from "../../global-functions/ImageGeneration";
import {
  useAddAllProductsMutation,
  useDeleteProductMutation,
  useEditProductMutation,
  useGetAllProductsApiQuery,
} from "../../apis/Admin";
import { useDispatch } from "react-redux";
import { errorPopup, showPopup } from "../../redux-slice/UserSliceAuth";
import useUpdateImageCustomHook from "../../global-functions/useUpdateImageCustomHook";
import useCustomGenerateUrls from "../../global-functions/useUpdateImageCustomHook";

const { Dragger } = Upload;

function AllProductsTab() {
  const [addProduct, res] = useAddAllProductsMutation();
  const [updateProduct, resp] = useEditProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const { data, isLoading, refetch } = useGetAllProductsApiQuery();
  const [draggerFileList, setDraggerFileList] = useState([]);
  const [modalFileList, setModalFileList] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [productList, setProductList] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [newProductName, setNewProductName] = useState("");
  const [tempProducts, setTempProducts] = useState([]);
  const [loadApi, setLoadApi] = useState(false);
  const [urls, setUrl] = useState([]);

  // custom hook for generating image links
  const [fileList, setFileList] = useState([]);
  const { generateLinks, loading } = useCustomGenerateUrls();

  const dispatch = useDispatch();

  const productNameChange = (file, value) => {
    const filterFile = draggerFileList.filter((f) => f.uid === file.uid)[0];
    filterFile.name = value;
    const removeSelectedFile = draggerFileList.filter(
      (f) => f.uid !== file.uid
    );
    const sortedData = sortData([filterFile, ...removeSelectedFile]);
    // setProductList(sortedData)
    setDraggerFileList((prev) => sortedData);
  };

  const handleDraggerFileDrop = (files) => {
    const getData = dataIndex(files);
    const sortedData = sortData(getData);
    // setProductList(sortedData)
    setDraggerFileList(sortedData);
    setIsSubmitDisabled(false);
  };

  const handleDraggerFileRemove = (file) => {
    const updatedFileList = draggerFileList.filter((f) => f.uid !== file.uid);
    setDraggerFileList(updatedFileList);
    setIsSubmitDisabled(updatedFileList.length === 0);
  };

  const handleModalFileDrop = (files) => {
    setModalFileList([...files]);
    // handleUpload([...files])
  };

  const handleModalFileRemove = (file) => {
    const updatedFileList = modalFileList.filter((f) => f.uid !== file.uid);
    setModalFileList(updatedFileList);
  };

  const handleProductSubmit = () => {
    const newProducts = draggerFileList.map((file) => ({
      id: file.uid,
      image: URL.createObjectURL(file.originFileObj),
      name: file.name,
    }));

    setLoadApi(true);

    setTempProducts(newProducts);
    setIsSubmitDisabled(true);

    // api will run here
  };

  const handleProductDelete = (productId) => {
    deleteProduct(productId)
      .unwrap()
      .then((res) => {
        dispatch(showPopup({ state: true, message: "delete Product " }));
        setUrl([]);

        // let data=[res.result,...productList]

        console.log("profuct", productList);
        const filterRemove = productList.filter((val) => val._id !== productId);
        setProductList((prev) => [...filterRemove]);
        setEditModalVisible(false);
      })
      .catch((error) => {
        console.log("error=====", error);
        dispatch(
          errorPopup({
            state: true,
            message: `Products not ceated due to ${error}`,
          })
        );
      });
  };

  const handleEditModalOpen = (product) => {
    setEditProduct(product);
    setNewProductName(product.productName);
    setModalFileList([]);
    setEditModalVisible(true);
  };

  const handleEditModalClose = () => {
    setEditModalVisible(false);
  };

  const handleNameUpdate = (e) => {
    setNewProductName(e.target.value);
  };

  const handleProductUpdate = async () => {
    let updatedProduct = productList.filter(
      (val) => val._id === editProduct._id
    )[0];

    if (modalFileList.length) {
      let imageUrls = await generateLinks(modalFileList);
      updatedProduct = {
        productName: newProductName,
        productImage: imageUrls[0],
      };
    } else {
      updatedProduct = {
        productName: newProductName,
        productImage: editProduct.productImage,
      };
    }

    updateProductApi(updatedProduct);
  };

  const updateProductApi = (values) => {
    updateProduct({ payload: values, id: editProduct._id })
      .unwrap()
      .then((res) => {
        dispatch(showPopup({ state: true, message: "Updated Products " }));
        setModalFileList([]);
        
      let updatedProducts = productList.filter((product) => {
        return product._id !== res.result._id 
      });

      setProductList([res.result,...updatedProducts]);
        setEditModalVisible(false);
      })
      .catch((error) => {
        console.log("error=====", error);
        dispatch(
          errorPopup({
            state: true,
            message: `Products not ceated due to ${error}`,
          })
        );
      });
  };
  const addProducts = () => {
    let values = urls.map((val) => {
      return {
        productName: val.productName,
        productImage: val.productImage,
      };
    });
    addProduct(values)
      .unwrap()
      .then((res) => {
        debugger;
        dispatch(showPopup({ state: true, message: "Products Created" }));
        setUrl([]);
        let data = [...res.result, ...productList];
        const getData = dataIndex(data);
        const sortedData = sortData(getData);
        setProductList(sortedData);
      })
      .catch((error) => {
        dispatch(
          errorPopup({
            state: true,
            message: `Products not ceated due to ${error}`,
          })
        );
      });
  };
  const dataIndex = (data) => {
    debugger;
    return data.map((val, i) => ({ ...val, SNO: i }));
  };
  const sortData = (data) => {
    return data.sort((a, b) => a.SNO - b.SNO);
  };
  useEffect(() => {
    // debugger

    if (data) {
      setProductList(data);
    }
  }, [isLoading]);

  useEffect(() => {
    if (urls.length && !modalFileList.length) {
      addProducts();
    }
  }, [urls]);

  return (
    <AllProductStyle>
      <FileUpload
        setTempProducts={setTempProducts}
        tempProducts={tempProducts}
        urls={urls}
        draggerFileList={draggerFileList}
        setDraggerFileList={setDraggerFileList}
        productList={productList}
        setLoadApi={setLoadApi}
        setUrl={setUrl}
        loadApi={loadApi}
      />
      <h1 className="text-2xl font-semibold">Upload Products</h1>
      <div className="flex flex-col">
        <Dragger
          className="border-dashed border-gray-400 rounded-lg text-center"
          accept=".jpg,.png,.pdf"
          fileList={draggerFileList}
          customRequest={() => {}}
          onChange={({ fileList }) => handleDraggerFileDrop(fileList)}
          multiple
        >
          {draggerFileList.length === 0 && (
            <div>
              <p className="text-sm font-semibold">
                Drag and drop your files here
              </p>
            </div>
          )}
          {draggerFileList.length > 0 && (
            <div className="flex items-center flex-wrap">
              {draggerFileList.map((file) => (
                <div
                  key={file.uid}
                  className="flex items-center justify-between bg-gray-300 rounded-md p-1 m-1"
                >
                  <img
                    src={URL.createObjectURL(file.originFileObj)}
                    alt="File"
                    className="h-12 w-12 rounded-md"
                  />
                  {/* <p className="text-xs font-semibold mx-2">{file.name}</p> */}
                  <Input
                    className="text-xs font-semibold mx-2"
                    value={file.name}
                    onChange={(e) => {
                      productNameChange(file, e.target.value);
                    }}
                    onClick={(event) => event.stopPropagation()}
                  />
                  <Button
                    className="flex items-center justify-center border-none"
                    danger
                    shape="circle"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDraggerFileRemove(file);
                    }}
                  >
                    <span className="material-symbols-rounded text-lg">
                      delete
                    </span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Dragger>
        <div className="flex justify-center space-x-4 mt-2">
          <Button
            type=""
            className="bg-black text-white hover:bg-black"
            disabled={loadApi}
            onClick={handleProductSubmit}
          >
            {loadApi ? "loading....." : "Upload Files"}
          </Button>
          {/* <Button type="" className="bg-black text-white hover:bg-black" disabled={isSubmitDisabled}>
            Submit Files
          </Button> */}
        </div>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-6 gap-3">
          {productList.map((product) => (
            <div
              key={product._id}
              className="bg-gray-200 p-4 rounded-lg flex flex-col justify-center"
            >
              <img
                src={product?.productImage}
                alt="Product"
                className="h-24 w-full rounded-md mb-2"
              />
              <p className="text-sm text-center font-semibold">
                {product?.productName}
              </p>
              <div className="flex justify-center mt-2">
                <Button onClick={()=>{handleEditModalOpen(product)}}>
                  <span className="material-symbols-rounded">edit_square</span>
                </Button>
               
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  okText=<p style={{color:"black"}}>Yes</p>
                  cancelText="No"
                  onConfirm={() => handleProductDelete(product._id)}
                >
                  <Button type="" shape="circle">
                    {" "}
                    <span className="material-symbols-rounded">delete</span>
                  </Button>
                </Popconfirm>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        title="Edit Product"
        open={editModalVisible}
         
        onCancel={handleEditModalClose}
        footer={[
          <Button key="cancel" onClick={handleEditModalClose}>
            Cancel
          </Button>,
          <Button
            disabled={loading}
            key="update"
            type="primary"
            style={{ backgroundColor: "black" }}
            onClick={handleProductUpdate}
          >
            {loading ? <Spin /> : "Update"}
          </Button>,
        ]}
      >
        <div className="flex items-center mb-4">
          <label className="mr-2">Product Name:</label>
          <Input value={newProductName} onChange={handleNameUpdate} />
        </div>
        <AllProductStyle className="flex items-center">
          <label className="mr-2">Upload File:</label>
          <Upload
            fileList={modalFileList}
            customRequest={() => {}}
            onChange={({ fileList }) => handleModalFileDrop(fileList)}
          >
            <Button>Select File</Button>
          </Upload>
        </AllProductStyle>
        {modalFileList.length > 0 && (
          <div className="flex items-center flex-wrap mt-2">
            {modalFileList.map((file) => (
              <div
                key={file.uid}
                className="flex items-center justify-between bg-gray-300 rounded-md p-1 m-1"
              >
                <img
                  src={URL.createObjectURL(file.originFileObj)}
                  alt="File"
                  className="h-12 w-12 rounded-md"
                />
                <p className="text-xs font-semibold mx-2">{file.name}</p>
                <Button
                  className="flex items-center justify-center border-none"
                  danger
                  shape="circle"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleModalFileRemove(file);
                  }}
                >
                  <span className="material-symbols-rounded text-lg">
                    delete
                  </span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </AllProductStyle>
  );
}

export default AllProductsTab;
