import { Link, Navigate, Outlet } from "react-router-dom";

import { useEffect } from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";
import Header from "../component/Header.jsx";
import Sidebar from "../component/SideBar.jsx";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';

export default function DefaultLayout() {
  const { user, token, setUser, setToken, notification } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);




  const FullHeightContainer = styled(Container)`
  height: 100vh; /* Full viewport height */
  display: flex;
  flex-direction: column;
  padding: 0; /* Remove default padding */
 `;



  const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  height: 100%;
`;

  const Content = styled(Col)`
  background-color: #f8f9fa;
  padding: 20px;
  height: auto; /* Automatically adjusts height based on content */

  /* Optionally, you can set max-height or overflow properties to handle overflow */
  max-height: calc(100vh - 80px); /* Example: Adjusts height up to 100% viewport height minus header/footer */
  overflow-y: auto; /* Adds scrollbars if content overflows */

  /* Additional styles as needed */
`;

  return (
    <FullHeightContainer fluid>
      <Header />
      <MainContent>
        <Sidebar />
        <Content md={10}>
          <Outlet />
        </Content>
      </MainContent>
    </FullHeightContainer>
    /*(<div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
        <Link to="/category">Category</Link>
        <Link to="/invoice">Invoice</Link>
        <Link to="/test">Test</Link>
      </aside>
      <div className="content">
        <header>
          <div>Header</div>

          <div>
            {user.name} &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#">
              Logout
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        {notification && <div className="notification">{notification}</div>}
      </div>
    </div>*/
  );
}
