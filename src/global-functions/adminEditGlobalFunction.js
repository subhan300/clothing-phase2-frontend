import { Button, Input, Popconfirm, Select, Table, Typography } from "antd";

const sortData = (data, key) => {
  debugger;
  return data.sort((a, b) => {
    console.log("a", a, "==", "b", b);
    return a[key] - b[key];
  });
};

const addSerialNo = (data) => {
  return data.map((val, i) => ({ ...val, SNO: i }));
};

const companyColumns = (handleEdit, handleSave, editingRow, setEditingRow) => {
  console.log("editing===", editingRow);
  return [
    { title: "", dataIndex: "key" },
    {
      title: "Logo",
      dataIndex: "companyLogo",
      render: (text, record) =>
        editingRow.state && editingRow.record._id === record._id ? (
          <Input
            value={text}
            onChange={(e) => {
              handleEdit("logo", e.target.value, record);
            }}
          />
        ) : (
          <img src={record.companyLogo} alt="logo" />
        ),
    },
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

const managerColumns = (handleEdit, handleSave, editingRow, setEditingRow) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) =>
        editingRow.state && editingRow.record._id === record._id ? (
          <Input
            value={text}
            onChange={(e) => {
              handleEdit("name", e.target.value, record);
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
        editingRow.state && editingRow.record._id === record._id ? (
          <Input
            value={text}
            onChange={(e) => {
              handleEdit("managerEmail", e.target.value, record);
            }}
          />
        ) : (
          text
        ),
    },
    {
      title: "Password",
      dataIndex: "managerPassword",
      render: (text, record) =>
        editingRow.state && editingRow.record._id === record._id ? (
          <Input
            value={text}
            onChange={(e) => {
              handleEdit("managerPassword", e.target.value, record);
            }}
          />
        ) : (
          text
        ),
    },
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
      title: "Action",
      dataIndex: "action",
      width: 250,
      render: (text, record) =>
        editingRow.state && editingRow.record._id === record._id ? (
          <span>
            <Typography.Link
              onClick={() => {
                handleSave(record);
                setEditingRow({ state: !editingRow.state, record: record });
              }}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm
              title="Sure to cancel?"
              okText={<p style={{ color: "black" }}>Yes</p>}
              onConfirm={() => {
                setEditingRow((prev) => ({ ...prev, state: false }));
              }}
            >
              <a>Cancel</a>
            </Popconfirm>
          </span>
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

export const employeesColumn = (
  handleEdit,
  handleSave,
  editingRow,
  setEditingRow
) => {
  console.log("editing ow===", editingRow);
  return [
    {
      title: "Name",
      dataIndex: "employeeName",
      render: (text, record) =>
        editingRow.state && editingRow.record._id === record._id ? (
          <Input
            value={text}
            onChange={(e) => {
              handleEdit("employeeName", e.target.value, record);
            }}
          />
        ) : (
          text
        ),
    },
    {
      title: "Email",
      dataIndex: "employeeEmail",
      render: (text, record) =>
        editingRow.state && editingRow.record._id === record._id ? (
          <Input
            value={text}
            onChange={(e) => {
              handleEdit("employeeEmail", e.target.value, record);
            }}
          />
        ) : (
          text
        ),
    },
    {
      title: "Phone No",
      dataIndex: "employeePhone",
      render: (text, record) =>
        editingRow.state && editingRow.record._id === record._id ? (
          <Input
            value={text}
            onChange={(e) => {
              handleEdit("employeePhone", e.target.value, record);
            }}
          />
        ) : (
          text
        ),
    },

    {
      title: "Add Product",
      dataIndex: "products",
      render: (text, record) => (
        <Button className="bg-black text-white">Add Product</Button>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) =>
        editingRow.state && editingRow.record._id === record._id ? (
          <span>
            <Typography.Link
              onClick={() => {
                debugger;
                handleSave(record);
                setEditingRow({ state: !editingRow.state, record: record });
              }}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm
              title="Sure to cancel?"
              okText={<p style={{ color: "black" }}>Yes</p>}
              onConfirm={() => {
                setEditingRow((prev) => ({ ...prev, state: false }));
              }}
            >
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Button
            className="border-none"
            onClick={() => {
              debugger;
              setEditingRow({ state: !editingRow.state, record: record });
            }}
          >
            <span class="material-symbols-rounded">edit_square</span>
          </Button>
        ),
    },
  ];
};
export const adminEditGlobalFunctions = {
  companyColumns,
  sortData,
  managerColumns,
  addSerialNo,
  employeesColumn,
};
