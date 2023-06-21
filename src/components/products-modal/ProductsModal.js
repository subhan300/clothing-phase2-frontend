import { useState } from 'react';
import { Row, Col, Image, Button, Modal} from 'antd';
import {useDispatch} from 'react-redux';
import "./product.css"



function ProductsModal(props) {
  
  const {selectedProduct,setSelectedProduct}=props;
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  
  const openDrawer = (image) => {
    setSelectedImage(image);
    setShowDrawer(true);
  };

  const closeDrawer = () => {
    setSelectedImage(null);
    setShowDrawer(false);
  };

  const imageSelection = (selectedImage) => {
    if (!selectedImage.target.classList.contains('material-symbols-rounded')) {
      setSelectedImage(null);
      setShowDrawer(false);
    }
  };
  const removeProductFromArray=(selectedProductToRemove)=>{
   return selectedProduct.filter((val)=>val.productId !== selectedProductToRemove.productId)
}
  const filterSelectedProducts=(productId)=>{
    const isProductSelected = selectedProduct.filter(
      (val) => val.productId == productId
    );
    if (isProductSelected.length > 0) {
      
      return true;
    } else {
      return false;
    }
  }
  console.log("selected==",selectedProduct)
  const productSelected=(product)=>{
         const isProductSelected = filterSelectedProducts(product.productId)
         if(isProductSelected){
          const productsCollectionUpdated=removeProductFromArray(product);
          setSelectedProduct((prev)=>([...productsCollectionUpdated]));
         }else{
          setSelectedProduct((prev)=>([...prev,product]));
         }

  }

  return (
    <div>
      <Modal
        className='!relative'
        title="All Products"
        open={props.open}
        onCancel={props.onCancel}
        width={1000}
        footer={[
          <Button
            type=''
            onClick={props.onOk}
            className='bg-black text-white hover:bg-black'
          >Select</Button>
        ]}
      >
        <Row gutter={[16, 16]} className=' max-h-[270px] overflow-auto'>
          {props.images.map((product) => (
            <Col onClick={()=>{productSelected(product)}} className={`cursor:ponter ${filterSelectedProducts(product.productId)?"marked_Selected":""}`} key={product.productId} xs={24} sm={12} md={8} lg={6} xl={4}>
              <div className={`relative cursor-pointer`}>
                <Image onClick={(e) => imageSelection(e)} className={`${selectedImage === product.productId ? 'ring-4 ring-black-500' : ''}`} src={product.productImage} preview={false} alt={product.productName} />
                <div className="absolute top-[10px] right-[10px] text-gray-300 hover:text-gray-800" onClick={() => openDrawer(product)}>
                  <span className="material-symbols-rounded">info</span>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {showDrawer && selectedImage && (
          <Row className={`${showDrawer ? 'flex bottom-0' : '-bottom-full'} mt-2 p-2 relative transition-transform duration-500 ease-in-out`}>
            <Image className='!h-[80px] !w-[80px]' src={selectedImage.productImage} preview={false} alt={'...'} />
            <div className='ml-2'>
              <h2 className='text-lg font-semibold'>{selectedImage.productName}</h2>
              <p className='text-sm font-medium'> {selectedImage.productDescription} </p>
              <div className='mt-2'>
                {/* {selectedImage.tags.map((tag) => (
                  <span
                    key={tag}
                    className='text-xs border border-black text-black hover:bg-black hover:text-white mr-1 px-2 py-1 rounded-full'
                  >
                    {tag}
                  </span>
                ))} */}
              </div>
            </div>
            <div className="absolute top-1 right-1 text-black cursor-pointer" onClick={closeDrawer}>
              <span className="material-symbols-rounded">close</span>
            </div>
          </Row>
        )}
      </Modal>
    </div>
  );
}

export default ProductsModal;
