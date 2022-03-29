import { useState } from "react";
import { Table, Select } from "antd";

const { Option } = Select;

export default ({ width, list, places, changeCords }) => {
  const [selectedKeys, setSelectedKeys] = useState();

  const columns = [
    {
      title: "Доставка",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Откуда",
      dataIndex: "from",
      render: (em, row) => {
        return (
          <Select
            defaultValue={{ value: em.name }}
            style={{ width: 120 }}
            onChange={(value) => {
              row.from = places.find((em) => em.name === value);
            }}
          >
            {places.map((place) => (
              <Option key={place.name}>{place.name}</Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: "Куда",
      dataIndex: "to",
      render: (em, row) => {
        return (
          <Select
            defaultValue={{ value: em.name }}
            style={{ width: 120 }}
            onChange={(value) => {
              row.to = places.find((em) => em.name === value);
            }}
          >
            {places.map((place) => (
              <Option key={place.name}>{place.name}</Option>
            ))}
          </Select>
        );
      },
    },
  ];

  return (
    <div className="leftRow" style={{ width: width }}>
      <Table
        columns={columns}
        dataSource={list}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              setSelectedKeys([record.key]);
              changeCords(record.from, record.to);
            },
          };
        }}
        rowSelection={{
          selectedRowKeys: selectedKeys,
          onSelect(key) {
            setSelectedKeys([key]);
          },
          type: "radio",
        }}
      />
    </div>
  );
};
