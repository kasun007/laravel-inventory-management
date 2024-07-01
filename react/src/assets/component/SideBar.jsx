import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const StyledSidebar = styled(Col)`
  background-color: #343a40;
  color: white;
  height: 100%; /* Full height of the row */
  padding: 0;
  display: flex;
  flex-direction: column;

  aside.sidebar-links {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;

    a {
      display: flex;
      align-items: center; /* Center align items vertically */
      justify-content: space-between;
      margin-bottom: 10px; /* Optional: Adjust the space as needed */
      color: white; /* Ensure the link color is white */
      text-decoration: none; /* Remove underline from links */
      background-color: #007bff; /* Button-like background */
      padding: 10px 15px;
      border-radius: 5px;
      width: 100%;
      box-sizing: border-box; /* Ensure padding doesn't exceed width */
      position: relative; /* For positioning the like button */
      transition: background-color 0.3s; /* Smooth hover effect */

      &:hover {
        background-color: #0056b3; /* Darker shade on hover */
      }
    }

    .like-button {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 0;
      margin-left: 10px; /* Space between link text and button */
    }
  }
`;

const Sidebar = () => {
  return (
    <StyledSidebar md={2}>
      <aside className="sidebar-links">
        <Link to="/dashboard">
          Dashboard
          <button className="like-button">
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
        </Link>
        <Link to="/users">
          Users
          <button className="like-button">
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
        </Link>
        <Link to="/category">
          Category
          <button className="like-button">
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
        </Link>
        <Link to="/invoice">
          Invoice
          <button className="like-button">
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
        </Link>
        <Link to="/test">
          Test
          <button className="like-button">
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
        </Link>
      </aside>
    </StyledSidebar>
  );
};

export default Sidebar;
