import React, { useEffect, useState } from 'react'
// import { Check } from "../assets/images";
// import { showPopup, errorPopup } from "../redux-slice/UserSliceAuth";
import { useDispatch } from 'react-redux'

function Drawer(props) {
  const { selectedRow } = props
  //  if(selectedRow.managerOrder?.length>0){
  //   selectedRow.orderInfo=selectedRow.managerOrder;
  //  }
  console.log('selected row', selectedRow)
  const dispatch = useDispatch()

  return (
    <div
      className={`${
        props.show ? 'left-0' : 'left-[-100%]'
      } fixed  top-0 flex z-50 justify-center items-center h-screen w-screen transition-all duration-500 ease-in-out bg-[rgba(0,0,0,.6)]`}
    >
      <div className='relative overflow-scroll bg-white h-[90vh] w-[90vw] rounded-lg shadow-2xl p-2'>
        <div className='ml-1 mr-2 flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>Order Details</h1>
          <span
            className='material-symbols-rounded font-extrabold cursor-pointer'
            onClick={() => props.setShow(!props.show)}
          >
            close
          </span>
        </div>
        {selectedRow?.orderInfo?.map((val) => {
          return (
            <div
              key={val._id}
              className='relative flex flex-col sm:flex-row justify-between rounded-lg bg-gray-200 my-2 border-b border-gray-200 py-1 px-2'
            >
              <div className='flex flex-col md:flex-row lg:flex-row'>
                <div className='flex flex-col '>
                  <div>
                    <div>
                      {val.employeeName && (
                        <p className='text-lg font-bold text-gray-700'>
                          {val.employeeName}{' '}
                        </p>
                      )}
                     {val?.products?.length != undefined?val.products.map(vals=>{return(
                      <div className='mb-4'>
                       <h2 className='text-sm  text-gray-500'>
                       {' '}
                       {vals.productName}{' '}
                     </h2>
                     <p className='text-sm text-gray-500 '>
                       Size : {vals.productSize}{' '}
                     </p>
                     <p className='text-sm text-gray-500 '>
                       Price : €{vals.productPrice}{' '}
                     </p>
                     <p className='text-sm text-gray-500 '>
                       Qty : {vals.productQuantity}
                     </p>
                      </div>
                     )}) :<>
                      <h2 className='text-sm  text-gray-500'>
                        {' '}
                        {val.productName}{' '}
                      </h2>
                      <p className='text-sm text-gray-500 '>
                        Size : {val.productSize}{' '}
                      </p>
                      <p className='text-sm text-gray-500 '>
                        Price : €{val.productPrice}{' '}
                      </p>
                      <p className='text-sm text-gray-500 '>
                        Qty : {val.productQuantity}
                      </p>
                     </>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {selectedRow?.managerOrder?.length>0 && (
          <>
           <h1 className='text-lg font-bold text-gray-700'>Message : </h1>
          {selectedRow.comment !== "Write any message"? <p className='text-sm  text-gray-500'>{selectedRow.comment} </p>:<p className='text-sm  text-gray-500'>No Message</p>}
          </>
        )}
      </div>
    </div>
  )
}

export default Drawer
