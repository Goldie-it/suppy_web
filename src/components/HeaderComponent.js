import React from "react";
import styled from "styled-components";
import dotBackground from "../assets/dot-background.png";
import ImageBgBody from "../assets/bgBody.jpeg";

// import { Container } from './styles';

const HeaderComponent = ({ children }) => {
  return (
    <MainHeader className="row m-0 mb-4">
      <DotCenter src={dotBackground} />
      <DotRight src={dotBackground} />
      {children}
    </MainHeader>
  );
};

export const MainHeader = styled.div`
  background-color: #fff;
  background-image: url(${ImageBgBody});
  background-repeat: no-repeat;
  /* background-color: #fff; */
  position: relative;
  margin: 5vh auto;
  overflow: hidden;
  height: 28vh;
  width: 100%;

  &:before {
    border-radius: 0 0 100% 100%;
    position: absolute;
    background: #022f41;
    border: #022f41;
    top: -200px;
    right: -200px;
    left: -200px;
    content: "";
    bottom: 10px;
    box-shadow: 2px 1px 2px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 767px) {
    height: 35vh;
  }
`;

export const DotCenter = styled.img`
  opacity: 0.1;
  height: 150px;
  width: 150px;
  object-fit: contain;
  position: absolute;
  top: -50px;
  right: 450px;
  z-index: 1;

  @media (max-width: 570px) {
    left: -30px;
    height: 130px;
    width: 130px;
  }
`;

export const DotRight = styled.img`
  opacity: 0.1;
  height: 100px;
  width: 100px;
  object-fit: contain;
  position: absolute;
  top: 135px;
  right: -5px;
  z-index: 1;

  @media (max-width: 570px) {
    top: 195px;
    right: -10px;
  }
`;

export default HeaderComponent;
