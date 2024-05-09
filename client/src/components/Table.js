import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Table = ({
  data,
  setEditProductVisible,
  setSelected,
  handleDelete,
  formfields,
  setUpdatedName,
  setOpenDeleteModal,
  setDeleteId,
}) => {
  return (
    <table className="table text-center">
      <thead>
        <tr key={0}>
          {formfields
            .map((ff) =>
              ff.onTable ? (
                <th key={ff.title} scope="col">
                  {ff.title}
                </th>
              ) : null
            )
            .filter(Boolean)}
        </tr>
      </thead>
      <tbody>
        {data
          ?.map((p, index) => (
            <tr key={index + 1}>
              {formfields.map((ff, i) => {
                if (!ff.onTable) {
                  return null;
                }
                if (["number", "text"].includes(ff.type)) {
                  return <td key={index + i + 1}>{p[ff.dataIndex]}</td>;
                } else if (ff.type === "image") {
                  return (
                    <td
                      key={index + i + 1}
                      className=""
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        position: "relative",
                      }}
                    >
                      {
                        <img
                          src={`${p[ff.dataIndex]}`}
                          className="object-fit-contain"
                          style={{
                            width: "80px",
                            height: "70px",
                          }}
                        />
                      }
                    </td>
                  );
                }
                return (
                  <td key={index + i + 1}>
                    <div className="action-icons">
                      <EditOutlined
                        onClick={() => {
                          setEditProductVisible(true);
                          setSelected(p);
                          setUpdatedName && setUpdatedName(p.name);
                        }}
                      />

                      <DeleteOutlined
                        onClick={() => {
                          setOpenDeleteModal(true);
                          setDeleteId(p.id);
                          // console.log("deleteId", deleteId);
                        }}
                      />
                    </div>
                  </td>
                );
              })}
            </tr>
          ))
          .filter(Boolean)}
      </tbody>
    </table>
  );
};

export default Table;
