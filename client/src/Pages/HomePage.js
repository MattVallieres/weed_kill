import ApiImages from ".././Api/ApiImages";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import React from "react";

// This is or homepage
const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ApiImages />
      <Wrapper>
        <MainText>Weed Kill</MainText>
        <Text>Where our passion is treating your lawn</Text>

        <Container>
          <Linkstyled to={"/qoute"}>
            <Main>
              <h1>Get a free quote</h1>
            </Main>
            <Div>
              <div>
                Fill up a form, we'll get back to you as fast as possible.
              </div>
              <div>
                If you rather call us, feel free to call us at: +1
                (514)-787-5423
              </div>
            </Div>
          </Linkstyled>
        </Container>

        <Container>
          <Linkstyled to={"/services"}>
            <Main>
              <h1>Our Services</h1>
            </Main>
            <Div>
              <div>Check our services and what we have to offer.</div>
            </Div>
          </Linkstyled>
        </Container>

        <Container>
          <Linkstyled to={"/about"}>
            <Main>
              <h1>About us</h1>
            </Main>
            <Div>
              <div>Want to know more about us or our passion?</div>
            </Div>
          </Linkstyled>
        </Container>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  font-family: Arial, sans-serif;
  margin-top: 100px;
`;

const MainText = styled.div`
  justify-content: center;
  justify-content: center;
  align-items: center;
  align-items: center;
  text-align: center;
  text-align: center;
  font-weight: bold;
  font-size: 40px;
  display: flex;
`;

const Text = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-bottom: 55px;
  margin: 10px;
  font-style: italic;
  font-size: 25px;
`;

const Container = styled.div`
  border: 5px solid white;
  box-shadow: 5px 10px white;
  margin-bottom: 50px;
  align-items: center;
  text-align: center;
  margin-left: 330px;
  padding: 50px;
  box-shadow: 5px 10px;
  border: 5px solid black;
  transition: 1s;
  width: 650px;
`;

const Main = styled.div`
  padding-bottom: 25px;
  font-size: 40px;
`;

const Div = styled.div`
  font-size: 20px;
`;

const Linkstyled = styled(Link)`
  align-items: center;
  text-align: center;
  text-decoration: none;
  color: black;
`;

export default HomePage;
