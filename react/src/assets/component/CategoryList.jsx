import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";

import { useStateContext } from "../../context/ContextProvider.jsx";
import PopupBox from '../views/popupbox/edit_category.jsx';
import { Button, Spinner, Table, Row, Col, Pagination } from 'react-bootstrap'; 

export default function CategoryList({ categoryFlag, setCategoryFlag }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { setNotification } = useStateContext();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleShow = (category) => {
    setSelectedCategory(category);
    setShowPopup(true);
  };

  const handleClose = () => setShowPopup(false);

  useEffect(() => {
    fetchCategories();
  }, [categoryFlag]);

  const fetchCategories = (page = 1) => {
    setLoading(true);
    axiosClient
      .get("/categories/", { params: { page } })
      .then(({ data }) => {
        console.log("data", data);
        setLoading(false);
        setCategories(data);
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
    if (categories.data && categories.meta) {
      return categories.meta.links.map((link, index) => (
        <Button
          key={index}
          onClick={() => fetchNextPrevTasks(link.url)}
          dangerouslySetInnerHTML={{ __html: link.label }}
          className="m-1"
        />
      ));
    }
  };

  return (
 
   
      <>
        <PopupBox show={showPopup} handleClose={handleClose} categoryData={selectedCategory} />
        <Row>
          <Col>
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="text-center" colSpan="3">
                      <Spinner animation="border" />
                    </td>
                  </tr>
                ) : (
                  categories.data && (
                    categories.data.map((category) => (
                      <tr key={category.category_id}>
                        <td>{category.category_id}</td>
                        <td>{category.category_name}</td>
                        <td>
                          <Button variant="warning" onClick={() => handleShow(category)}>Edit</Button>{' '}
                          <Button variant="danger" onClick={() => onDeleteClick(category)}>Delete</Button>
                        </td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col>
            {renderPaginationLinks()}
          </Col>
        </Row>
      </>
    );
}
