import { Button, Input, Table } from "antd";

const sortData = (data, key) => {
  debugger
 return data.sort((a, b) =>{
  console.log("a",a,"==","b",b)
  return  a[key] - b[key]
 });
};

const addSerialNo = (data) => {
  return  data.map((val, i) => ({ ...val, SNO: i }));
}

const companyColumns = (handleEdit, handleSave, editingRow, setEditingRow) => {
  console.log("editing===", editingRow);
  return [
    {
      title: "Company",
      dataIndex: "companyName",
      render: (text, record) =>
        editingRow.state && editingRow.record._id === record._id ? (
          <Input
            value={text}
            onChange={(e) => {
              handleEdit("companyName", e.target.value, record);
            }}
          />
        ) : (
          text
        ),
    },
    {
      title: "Email",
      dataIndex: "companyEmail",
      render: (text, record) =>
        editingRow.state && editingRow.record._id === record._id ? (
          <Input
            value={text}
            onChange={(e) => {
              handleEdit("companyEmail", e.target.value, record);
            }}
          />
        ) : (
          text
        ),
    },
    {
      title: "Phone No",
      dataIndex: "companyPhone",
      render: (text, record) =>
        editingRow.state && editingRow.record._id === record._id ? (
          <Input
            value={text}
            onChange={(e) => {
              handleEdit("companyPhone", e.target.value, record);
            }}
          />
        ) : (
          text
        ),
    },

    {
      title: "Company Fax",
      dataIndex: "companyFax",
      render: (text, record) =>
        editingRow.state && editingRow.record._id === record._id ? (
          <Input
            value={text}
            onChange={(e) => {
              handleEdit("companyFax", e.target.value, record);
            }}
          />
        ) : (
          text
        ),
    },
    {
      title: "Location",
      dataIndex: "companyLocation",
      render: (text, record) =>
        editingRow.state && editingRow.record._id === record._id ? (
          <Input
            value={text}
            onChange={(e) => {
              handleEdit("companyLocation", e.target.value, record);
            }}
          />
        ) : (
          text
        ),
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) =>
        editingRow.state && editingRow.record._id === record._id ? (
          <Button
            className="border-none"
            onClick={() => {
              handleSave(record);
              setEditingRow({ state: !editingRow.state, record: record });
            }}
          >
            <span class="material-symbols-rounded">save</span>
          </Button>
        ) : (
          <Button
            className="border-none"
            onClick={() => {
              setEditingRow({ state: !editingRow.state, record: record });
            }}
          >
            <span class="material-symbols-rounded">edit_square</span>
          </Button>
        ),
    },
  ];
};

const managerColumns=(handleEdit, handleSave, editingRow, setEditingRow)=>{
  return  [ {
      title: "Name",
      dataIndex: "name",
      render: (text, record) =>
      editingRow.state && editingRow.record._id === record._id ? (
        <Input
          value={text}
          onChange={(e) => {
            handleEdit("companyPhone", e.target.value, record);
          }}
        />
      ) : (
        text
      ),
    },
    {
      title: "Email",
      dataIndex: "managerEmail",
      render: (text, record) =>
        editingRow === record.key ? (
          <Input value={text} onChange={() => {}} />
        ) : (
          text
        ),
    },
    {
      title: "Password",
      dataIndex: "managerPassword",
      render: (text, record) =>
        editingRow === record.key ? (
          <Input.Password value={text} onChange={() => {}} />
        ) : (
          text
        ),
    },
    {
      title: "Company",
      dataIndex: "companyName",
    //   render: (text, record) =>
    //     editingRow === record.key ? (
    //       <Select
    //         value={text}
    //         // onChange={handleCompanyChange}
    //         placeholder="Select a company"
    //         allowClear
    //       >
    //         <Option value="company1">Company 1</Option>
    //         <Option value="company2">Company 2</Option>
    //       </Select>
    //     ) : (
    //       text
    //     ),
    },
    {
      title: "Add Product",
      dataIndex: "addProduct",
      render: (text, record) => (
        <Button className="bg-black text-white">Add Product</Button>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) =>
        editingRow.state && editingRow.record._id === record._id ? (
          <Button
            className="border-none"
            onClick={() => {
              handleSave(record);
              setEditingRow({ state: !editingRow.state, record: record });
            }}
          >
            <span class="material-symbols-rounded">save</span>
          </Button>
        ) : (
          <Button
            className="border-none"
            onClick={() => {
              setEditingRow({ state: !editingRow.state, record: record });
            }}
          >
            <span class="material-symbols-rounded">edit_square</span>
          </Button>
        ),
    },
  ];
}


export const adminEditGlobalFunctions = {
  companyColumns,
  sortData,
  managerColumns,
  addSerialNo
};
