import React from "react";
import styled from "styled-components";

const Popping = ({ trigger, children }) => {
  return trigger ? (
    <Main>
      <Wrapper>{children}</Wrapper>
    </Main>
  ) : (
    ""
  );
};

const Main = styled.div`
    justify-content: center;
    position: fixed;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
`;

const Wrapper = styled.div`
    background-color: hsl(0, 0%, 90%);
    position: relative;
    margin-top: 100px;
    padding: 20px;
    width: 20%;
`;

export default Popping;