import React from "react";
import styled from "styled-components";
import ApiImages from "../Api/ApiImages"
import { useEffect } from "react";
import { Link } from "react-router-dom";

const OurServices = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
    <ApiImages />
    <Wrapper>
      <MainText>Our Services</MainText>
      <SubText>
        We offer a wide selection, from mowing the lawn, shrubs, seeding and raking in fall. 
        We typically charge 800$ <Italic>(depending on your lawn size)</Italic> annually which includes a 
        complete lawn maintence.

        <Gap>
        <Bold>If you're interested on other services</Bold>
        <ul>
        <li>Tending Shrubs - typically cost 35$ or depending what you want.</li>
        <li>Seeeding - typically cost $90 or depending on lawn size.</li>
        <li>Raking - typically cost 30$ or depending on how much to do.</li>
        </ul>
        </Gap>

      </SubText>
      <Gap></Gap>
      <MainText>If you're instrested!</MainText>
      <SubText>
        Go ahead and fill up a quick form <Linkstyled to={"/qoute"}>here!</Linkstyled> we'll contact you as fast as possible 
        and discuss what you would like to be done.
      </SubText>
    </Wrapper>
    </>
  );
};

const Bold = styled.div`
font-weight: bold;
margin-bottom: 10px;
font-size: 20px;
`;

const Italic = styled.span`
  font-style: italic;
  font-weight: bolder;
`

const Wrapper = styled.div`
  font-family: Arial, sans-serif;
  padding-right: 20%;
  padding-left: 25%;
  margin-top: 75px;
`;

const MainText = styled.span`
  border-bottom: 3px solid black;
  font-weight: bold;
  font-size: 45px;
`;

const SubText = styled.div`
  padding-top: 40px;
  font-weight: bolder;
  line-height: 1.4;
`;

const Gap = styled.div`
padding-top: 50px;
`;

const Linkstyled = styled(Link)`
    text-decoration: none;
    color: blue;
`;

export default OurServices;
