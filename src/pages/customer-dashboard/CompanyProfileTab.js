import React from 'react'
import { logo } from '../../assets/images'
import {
  useGetCompanyDetailsQuery
} from "../../apis/companyManager/index";
import { useSelector } from 'react-redux';

function CompanyProfileTab() {
  const { data, error, isLoading } =useGetCompanyDetailsQuery();
console.log("data",data);
const auth=useSelector(state=>state.authUser);
const managerName=auth?.user?.result?.name;
const managerPassword=auth?.user?.result?.managerPassword
  return (
    <div>
     {isLoading || data == undefined?<h1>...loading</h1>: <div className="bg-white text-black shadow-md p-6">
  <div className="flex items-center mb-6">
    <img src={data.companyLogo} alt="Company Logo" className="w-36 mr-2" />
  </div>
  <div className="flex flex-wrap md:grid md:grid-cols-2 gap-4">
    <div>
      <p className="font-medium">Company:</p>
      <p>{data.companyName}</p>
    </div>
    <div>
      <p className="font-medium">Telephone:</p>
      <p>{data.companyPhone}</p>
    </div>
    <div>
      <p className="font-medium">Fax:</p>
      <p>{data.companyFax}</p>
    </div>
    <div>
      <p className="font-medium">Email:</p>
      <p>{data.companyEmail}</p>
    </div>
    <div className="col-span-2">
      <p className="font-medium">Username:</p>
      <p>{managerName}</p>
    </div>
    <div className="col-span-2">
      <p className="font-medium">Password:</p>
      <p>{managerPassword}</p>
    </div>
  </div>
</div>}

    </div>
  )
}

export default CompanyProfileTab