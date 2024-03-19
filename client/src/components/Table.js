import React from "react";

const Table = ({ products, setEditProductVisible, setSelected, handleDelete}) => {
  return (
    <table className="table">
      <thead>
        <tr key={0}>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Image</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((p, index) => (
          <tr key={index + 1}>
            <td>{p.name}</td>
            <td>{p.price}</td>
            <td>{p.quantity}</td>
            <td
              className="d-flex"
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
              }}
            >
              {<img src={`${p.image}`} className="w-100 object-fit-contain" />}
            </td>
            <td>
              <button
                className="btn btn-primary ms-2"
                onClick={() => {
                  setEditProductVisible(true);
                  setSelected(p);
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
