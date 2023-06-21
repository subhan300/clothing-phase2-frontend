// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL, API } from "../../config";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const companyId = () => {
  return JSON.parse(localStorage.getItem("user"))?.result?.companyId;
};
const employeeId = () => {
  return JSON.parse(localStorage.getItem("user"))?.result?._id;
};

export const AdminCreateCompanies = createApi({
  reducerPath: "rtkAdminCreateCompaniesApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["addCompany","editCompany","addManager","editManager","addEmployee","editEmployee"],
  endpoints: (builder) => ({
    addNewCompany: builder.mutation({
      query: (payload) => {
        return {
          url: "/company/add-company",
          method: "POST",
          body: payload,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: [""],
    }),
    getAllCompanies: builder.query({
      query: () => `/company/get-allcompanies`,
      providesTags: ["addCompany","editCompany"],
    }),
    getManagersByCompanyId: builder.query({
      query: ({companyId}) => `/manager/get-allmanagerbycompanyId?companyId=${companyId}`,
      providesTags: ["editManager","addManager"],
    }),
    addNewManager: builder.mutation({
      query: ({payload}) => {
        return {
          url: "/manager/add-manager",
          method: "POST",
          body: payload,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["editManager","addManager"],
    }),
    addNewEmployee: builder.mutation({
      query: (payload) => {
        return {
          url: "/employee/add-employee",
          method: "POST",
          body: payload,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["editEmployee","addEmployee"],
    }),
    getEmployeesByCompanyId: builder.query({
      query: ({companyId}) => `/employee/get-employeebycompanyId?companyId=${companyId}`,
      providesTags: ["editEmployee","addEmployee"],
    }),
    getAllProductsApi: builder.query({
      query: () => `/product/get-all-products`,
      providesTags: ["addCompany","addProducts"],
    }),
    addAllProducts: builder.mutation({
      query: (payload) => {
        return {
          url: "/product/add-products",
          method: "POST",
          body: payload,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["addProducts"],
    }),
    editProduct: builder.mutation({
      query: ({payload,id}) => {
        console.log("id======",id,payload)
        return {
          url: `/product/update-product/${id}`,
          method: "PATCH",
          body: payload,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["addProducts"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/product/delete-product/${id}`,
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["addProducts"],
    }),

    editCompany: builder.mutation({
      query: ({payload,id}) => {
        console.log("id======",id,payload)
        return {
          url: `/company/edit-company/${id}`,
          method: "PATCH",
          body: payload,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["editCompany","addCompany"],
    }),

    editManager: builder.mutation({
      query: ({payload,id}) => {
        console.log("id======",id,payload)
        return {
          url: `/manager/edit-manager/${id}`,
          method: "PATCH",
          body: payload,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["editManager","addManager"],
    }),
  
    editEmployee: builder.mutation({
      query: ({payload,id}) => {
        return {
          url: `employee/edit-employee/${id}`,
          method: "PATCH",
          body: payload,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["editEmployee","addEmployee"],
    }),
    deleteManager: builder.mutation({
      query: ({id}) => {
        return {
          url: `/manager/edit-manager/${id}`,
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["editCompany","addCompany"],
    }),
  }),
});

export const {
  useAddNewCompanyMutation,
  useGetAllCompaniesQuery,
  useAddNewManagerMutation,
  useAddNewEmployeeMutation,
  useGetAllProductsApiQuery,
  useAddAllProductsMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useEditCompanyMutation,
  useEditManagerMutation,
  useDeleteManagerMutation,
  useGetManagersByCompanyIdQuery,
  useGetEmployeesByCompanyIdQuery,
  useEditEmployeeMutation
} = AdminCreateCompanies;
