import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetTotalEmployeesLengthQuery,
  useGetTotalOrdersLengthQuery,
  useGetTotalManagersLengthQuery,
} from "../../apis/companyManager/index";

function DashboardTab() {
  let obj = {};
  let { data, error, isLoading ,refetch} = useGetTotalOrdersLengthQuery();
  let data2 = useGetTotalEmployeesLengthQuery();
  let data3 =  useGetTotalManagersLengthQuery();
  const user = useSelector((auth) => auth.authUser.user);
  const userName = user?.result?.name;

  const [datas, setDatas] = useState([
    {
      icon: "draft_orders",
      tileTitle: "Total Orders",
      tileQty: 0,
    },

    {
      icon: "group",
      tileTitle: "All Employees",
      tileQty: 0,
    },
  ]);

  useEffect(() => {
    refetch()
    data2.refetch()
    data3.refetch()
    if (data && data2.data != undefined && data3.data) {
      obj.totalOrders = data[0]?.totalOrder ? data[0]?.totalOrder : 0;
      obj.totalManagers = data3?.data[0]?.totalManager
      ? data3.data[0].totalManager
      : 0;
      obj.totalEmployees = data2?.data[0]?.totalEmployee
        ? data2.data[0].totalEmployee
        : 0;

      setDatas([
        {
          icon: "draft_orders",
          tileTitle: "Total Orders",
          tileQty: obj.totalOrders,
        },

        {
          icon: "group",
          tileTitle: "Companies Employees",
          tileQty: obj.totalEmployees,
        },
        
        {
          icon: "group",
          tileTitle: "Companies Managers",
          tileQty: obj.totalManagers,
        },
      ]);
    }
  }, [isLoading, data2.data, data2.isLoading,data3.isLoading]);

  return (
    <div>
      {/* Header of Order Tab*/}
      <div>
        <div className="flex justify-start items-center">
          <div className="flex relative w-fit">
            <span className="bg-[#FFDB58] w-7 h-7"></span>
            <span className="bg-[#FFDB58] w-3.5 h-3.5 absolute -bottom-3 -right-5 "></span>
          </div>
          <div className="ml-10 flex justify-start items-center">
            <h1 className="text-2xl md:text-4xl font-semibold">
              Good Evening, {userName}
            </h1>
          </div>
        </div>
        <p className="mt-2 text-lg md:text-xl font-medium text-gray-500">
          Here is what's happening with your profile today.
        </p>
      </div>
      {/* Stats part */}
      <div className="xs:grid sm:grid md:grid-cols-3 xl:grid-cols-4 2xl:flex flex-wrap justify-center my-8">
        {/* card */}
        {datas.map((item, index) => (
          <div
            key={index}
            className="m-2 flex items-center justify-center h-36 rounded-md bg-[#fef9e6] border-2 border-[rgb(247,229,167)] 2xl:min-w-[25rem]"
          >
            <span className="material-symbols-rounded text-6xl text-yellow-500 ">
              {item.icon}
            </span>
            <div className="flex flex-col items-start justify-start ml-3">
              <h1 className="text-lg"> {item.tileTitle} </h1>
              <h1 className="text-4xl font-semibold"> {item.tileQty} </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardTab;
