import React, { useState, useEffect } from 'react'
import { p1 } from '../../assets/images/index'
import { useAddNewOrderMutation } from '../../apis/companyManager/index'
import { showPopup, errorPopup } from '../../redux-slice/UserSliceAuth'
import { useDispatch } from 'react-redux'
import QuantityInput from '../../components/quantity-input/QuantityInput'

function CartTab() {
  const [addNewOrder, response] = useAddNewOrderMutation()
  const [comment, setComment] = useState('Write any message')
  const [cartProducts, setCartProducts] = useState([])
  const [loading, setLoading] = useState(false)
  console.log('response', response)
  console.log('carts', cartProducts)
  const dispatch = useDispatch()

  const orderBodyConvert = (cartProducts) => {
    console.log('products', cartProducts)
    const companyId = JSON.parse(localStorage.getItem('user'))?.result
      ?.companyId
    const companyName = JSON.parse(localStorage.getItem('user'))?.result
      ?.companyName
    const managerName = JSON.parse(localStorage.getItem('user'))?.result?.name
   
    debugger
    return cartProducts.map((val) => {
      console.log('products', val)
      let quantity=0;
      let productsAccess = val.products

      let total = productsAccess.map((valueP) => {
        debugger
        quantity += Number(valueP.productQuantity)
        return (
          valueP.productPrice *
          (valueP.productQuantity ? valueP.productQuantity : 1)
        )
      })

      total = total.reduce(
        (previousScore, currentScore, index) => previousScore + currentScore,
        0
      )
debugger
      return {
        employeeId: val.empId,
        products: val.products,
        companyName,
        name: managerName,
        employeeName: val.row.name,
        bill: total,
        quantity: quantity,
        companyId: companyId,
        comment: comment,
        managerEmail: val.managerEmail,
        employeeEmail: val.employeeEmail,
        role: 'manager',
      }
    })
  }
  const createOrder = () => {
    setLoading(true)

    let orderData = orderBodyConvert(cartProducts)

    if (orderData.length > 0) {
      addNewOrder(orderData)
        .unwrap()
        .then((res) => {
          dispatch(
            showPopup({ state: true, message: 'Order sucessfully created' })
          )

          setComment(' ')
          localStorage.removeItem('addToCart')
          setCartProducts([])
        })
        .catch((error) => {
          if (error.data.message) {
            setLoading(false)
            return dispatch(
              errorPopup({ state: true, message: `${error.data.message}` })
            )
          } else {
            setLoading(false)
            return dispatch(
              errorPopup({ state: true, message: `Refresh Page and try again` })
            )
          }
        })
    } else {
      setLoading(false)
      dispatch(errorPopup({ state: true, message: 'Add Item First' }))
    }
  }
  const removeCartItem = (id) => {
    let getLocalStorageCartData = JSON.parse(localStorage.getItem('addToCart'))
    if (getLocalStorageCartData != null) {
      let RemoveItem = getLocalStorageCartData.filter((val) => val.empId !== id)
      localStorage.setItem('addToCart', JSON.stringify(RemoveItem))
      setCartProducts(RemoveItem)
    }
  }
  useEffect(() => {
    let getLocalStorageCartData = JSON.parse(localStorage.getItem('addToCart'))

    if (
      getLocalStorageCartData != undefined ||
      getLocalStorageCartData != null
    ) {
      setCartProducts(getLocalStorageCartData)
    }
  }, [])
  useEffect(() => {
    if (response.status === 'fulfilled') {
      setLoading(false)
    }
  }, [response])
  return (
    <div>
      <h1 className='text-3xl font-semibold mb-2'>Cart</h1>
      {cartProducts.map((item, index) => {
        return (
          <div
            key={item.row.id}
            className='relative flex flex-col sm:flex-row justify-between rounded-lg bg-gray-200 my-2 border-b border-gray-200 py-4 px-2'
          >
            <div className='absolute cursor-pointer top-3 right-5'>
              <span
                className='material-symbols-rounded'
                onClick={() => {
                  removeCartItem(item.row.id)
                }}
              >
                close
              </span>
            </div>
            <div className='flex flex-col md:flex-row lg:flex-row'>
              <div className='flex flex-col '>
                <p className='text-sm  text-gray-500'>
                  Employee Name: {item.row.name}{' '}
                </p>
                {item?.products.map((val) => {
                  return (
                    <div>
                      <div className='mt-2'>
                        <h2 className='text-lg font-bold text-gray-700'>
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
                      </div>
                    </div>
                  )
                })}
                <p className='text-sm font-bold  mt-5 '>
                  Total Billed : €{item.totalBilled}{' '}
                </p>
              </div>
            </div>
          </div>
        )
      })}
      <div className='border-b border-gray-200 py-4 px-2'>
        <label className='text-sm mb-2 font-semibold' for='detailed-info'>
          Additional Information:
        </label>
        <textarea
          className='w-full border border-gray-300 p-2 rounded-md h-[100px]'
          id='detailed-info'
          name='detailed-info'
          value={comment}
          onChange={(e) => {
            setComment(e.target.value)
          }}
        ></textarea>
        <button
          className='py-1.5 px-3 bg-black text-white mt-2 rounded-lg cursor-pointer'
          onClick={() => createOrder()}
          disabled={loading}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default CartTab
