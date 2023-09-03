import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function CategoryList({ categoryFlag, setCategoryFlag }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { setNotification } = useStateContext();

  useEffect(() => {
    fetchCategories();
  }, [categoryFlag]);

  const fetchCategories = (page = 1) => {
    setLoading(true);
    axiosClient
      .get("/categories/", { params: { page } })
      .then(({ data }) => {
        setLoading(false);
        setCategories(data);
        //setCategoryFlag(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const fetchNextPrevTasks = (link) => {
    const url = new URL(link);
    fetchCategories(url.searchParams.get("page"));
  };
  const renderPaginationLinks = () => {
    if (categories.data) {
      console.log(categories.meta);
      if (categories.meta) {
        console.log(categories.meta);
      }
    }

    return (
      <>
        {categories.data &&
          categories.meta &&
          categories.meta.links?.map((link, index) => (
            <button
              key={index}
              onClick={(ev) => fetchNextPrevTasks(link.url)}
              className="btn btn-primary"
            >
              <label dangerouslySetInnerHTML={{ __html: link.label }}></label>
            </button>
          ))}
      </>
    );
  };

  return (
    <>
      <table className="bordered-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        {loading && (
          <tbody>
            <tr>
              <td className="text-center" colSpan="3">
                Loading...
              </td>
            </tr>
          </tbody>
        )}
        {categories.data && (
          <tbody>
            {categories.data.map((category) => (
              <tr key={category.category_id} className="left-aligned-row">
                <td>{category.category_id}</td>
                <td>{category.category_name}</td>
                <td>
                  <button className="btn-edit">Edit</button>
                  <button
                    className="btn-delete"
                    onClick={(ev) => onDeleteClick(category)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      <div
        style={{
          display: "flex-1",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "stretch",
          height: "100vh",
        }}
      >
        {renderPaginationLinks()}
      </div>
    </>
  );
}
