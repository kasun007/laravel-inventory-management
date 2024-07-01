import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "../css/header.css";
import styled from 'styled-components';


const StyledHeader = styled.header`
  background-color: #007bff;
  color: white;
  padding: 10px;
  text-align: center;
  width: 100%;
  flex-shrink: 0;
`;

export default function Header() {
  return (
    <StyledHeader>Header</StyledHeader>
  );
}