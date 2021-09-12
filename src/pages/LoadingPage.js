import React, { useEffect } from "react";

import styled from "styled-components";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
  useParams,
} from "react-router-dom";

// import { Container } from './styles';

const LoadingPage = () => {
  let { shopName } = useParams();
  useEffect(() => {
    console.log(shopName);
  }, []);

  if (shopName) {
    return (
      <Redirect
        to={{
          pathname: "/Home",
          search: shopName,
        }}
      />
    );
  }

  return (
    <Container>
      <LoadingText>carregando...</LoadingText>
    </Container>
  );
};

export const Container = styled.div`
  flex: 1;
`;

export const LoadingText = styled.p`
  color: #000;
  font-size: 18px;
`;

export { LoadingPage };
