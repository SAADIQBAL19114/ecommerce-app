import React from "react";

const Table = ({
  data,
  setEditProductVisible,
  setSelected,
  handleDelete,
  formfields,
  setUpdatedName,
}) => {
  return (
    <table className="table">
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
                      className="d-flex"
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                      }}
                    >
                      {
                        <img
                          src={`${p[ff.dataIndex]}`}
                          className="w-100 object-fit-contain"
                        />
                      }
                    </td>
                  );
                }
                return (
                  <td key={index + i + 1}>
                    <button
                      className="btn btn-primary ms-2"
                      onClick={() => {
                        setEditProductVisible(true);
                        setSelected(p);
                        setUpdatedName && setUpdatedName(p.name);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
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
