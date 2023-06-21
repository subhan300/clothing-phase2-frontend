import { Cloudinary } from "cloudinary-core"

export const tableDataFormatConverter = (data) => {
  let tableData = data.map((val, i) => {
    return {
      SNO: i + 1,
      id: val._id,
      name: val.employeeName,
      budget: val.budget,
      slider: { showProducts: val.result, name: 'All Products' },
      action: { name: 'Add To Cart', showProducts: [] },
      employeeEmail: val.employeeEmail,
    }
  })
  return tableData
}

export const employeeTableDataFormatConverter = (data) => {
  let tableData = data[0]?.result.map((val, i) => {
    return {
      SNO: i + 1,
      id: val._id,
      name: val.employeeName,
      email: val.employeeEmail,
      gender: val.gender,
      budget: val.budget,
    }
  })
  return tableData
}

export const employeeTableAdminDataFormatConverter = (data) => {
  let tableData = data.map((val, i) => {
    return {
      SNO: i + 1,
      id: val._id,
      name: val.employeeName,
      email: val.employeeEmail,
      gender: val.gender,
      budget: val.budget,
    }
  })
  return tableData
}

export const managerTableDataFormatConverter = (data) => {
  let tableData = data.map((val, i) => {
    return {
      SNO: i + 1,
      id: val._id,
      name: val.name,
      email: val.managerEmail,
      password: val.password,
      company: val?.result[0]?.companyName,
    }
  })
  return tableData
}

export const orderTableDataFormatConverter = (data) => {
  // debugger
  let tableData=[]
  let filterManagerData = data[0].orders.filter((val) => val?.role === 'manager')
  if (filterManagerData.length > 0 && !filterManagerData.includes(undefined)) {
 
   for(let i=0;i<filterManagerData.length;i++){
    // debugger
  let tempTableData= filterManagerData[i].managerOrder.map((managerOdr,b) => {
    debugger
      return {
        SNO: filterManagerData[i].invoice,
        id: managerOdr.employeeId        ,
        name: data[0].employees.filter((vals) => vals._id == managerOdr.employeeId)[0]
          .employeeName,
        slider: {
          showProducts: [{ products: managerOdr.products }],
          name: 'All Products',
        },
        bill: managerOdr.bill,
        // budget: budget,})
      }
    })
    tableData=[...tableData,...tempTableData]
   }
  }

  return tableData
}

export const orderTableDataAdminFormatConverter = (data) => {
  // debugger
  let tableData = data.map((val, i) => {
    let productArray;
    let  temp;
    let quantity=0
    let totalBill=0
   if( val.managerOrder.length>0){
    // debugger
      
      productArray=val.managerOrder.map(vals=>{
        debugger
      totalBill +=vals.bill
      quantity +=vals.quantity;
      
    return  {products:vals.products,employeeName:vals.employeeName}
     
      });
    }
 
debugger


   
   console.log("type :",typeof createdAt,`${val.createdAt}`.slice(0,32))
    return {
      SNO: val.invoice,
      id: val._id,
      name: val.managerOrder.length>0?val.managerOrder[0].name:val.result[0].employeeName,
      company: val.companyName,
      orderInfo: val.managerOrder.length>0?productArray:val.products,
      createdAt:val.createdAt,
      noOfProducts: val.managerOrder.length>0?quantity:val.quantity,
      bill:val.managerOrder.length>0?`${totalBill}`:`${val.bill}`,
      managerOrder:val.managerOrder,
      comment:val.comment

      // budget: budget,
    }
  })
  return tableData
}

export const budgetRequestTableDataFormatConverter = (datas) => {
  const statusF = (status) => {
    if (status == 0) {
      return 'pending'
    } else if (status == 1) {
      return 'approved'
    } else {
      return 'rejected'
    }
  }
  const statusResult = (status) => {
    if (status == 0 || status == 1) {
      return false
    } else {
      return true
    }
  }
  let tableData = datas.map((data, i) => {
    return {
      SNO: i + 1,
      id: data._id,
      employeeId: data.employeeId,
      name: data.result[0].employeeName,
      requestAmount: `${data.requestAmount}`,
      budget: `${data.result[0].budget}`,
      allocateBudget: { value: `0`, showBtn: false },
      status: statusF(data.status),
      select: { result: statusResult(data.status) },
      action: { name: 'Save' },
    }
  })
  return tableData
}

export const employeeOrderBudgetFormatConverter = (data) => {
  let tableData = data?.map((val, i) => {
    return {
      SNO: i + 1,
      id: val._id,
      name: val.employeeName,
      budget: val.budget,
      allocateBudget: { value: `${0}`, showBtn: true },
      slider: {
        showProducts: val?.products[0].products,
        productId: val.products[0]._id,
        name: 'All Products',
      },
      action: { name: 'Add Order', showProducts: [] },
    }
  })
  return tableData
}


const handleUpload = async(selectedFiles) => {
  debugger;
  const uploadPromises = Array.from(selectedFiles).map(async(file) => {
    const formData = new FormData();
    // hadleing bth scenarios
    formData.append('file', file?.originFileObj || file);
    formData.append('upload_preset', 'ml_default');

    return await fetch('https://api.cloudinary.com/v1_1/dxhqcov11/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const cloudinary = new Cloudinary({ cloud_name: 'dxhqcov11' });
        const imageUrl = cloudinary.url(data.public_id);
        return imageUrl;
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        return null;
      });
  });


 const ImageLinks= await  Promise.all(uploadPromises)
    .then((uploadedImages) => {
      console.log('Uploaded image URLs:', uploadedImages);
      return uploadedImages;
      // Perform any further actions with the image URLs
    })
    .catch((error) => {
      console.error('Error uploading files:', error);
    });
    return ImageLinks;
}




export const globalFunctions = {
  tableDataFormatConverter,
  employeeTableDataFormatConverter,
  orderTableDataFormatConverter,
  budgetRequestTableDataFormatConverter,
  employeeOrderBudgetFormatConverter,
  orderTableDataAdminFormatConverter,
  managerTableDataFormatConverter,
  employeeTableAdminDataFormatConverter,
  handleUpload
}


// WILL USE later
// <Select
// placeholder="Select a company"
// value={company}
// onChange={handleCompanyChange}
// allowClear
// className="mx-2 min-w-[120px]"
// >
// <Option value="company1">Company 1</Option>
// <Option value="company2">Company 2</Option>
// </Select>