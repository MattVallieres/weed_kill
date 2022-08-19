import { Link } from "react-router-dom";
import styled from "styled-components";
import React from "react";
import { useEffect } from "react";
import ApiImages from '.././Api/ApiImages';


// This our About Us and what we do
const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <>
        <ApiImages />
        <Wrapper>

            <Gap></Gap>

            <MainText>About Us</MainText>
                <SubText>
                    We're a lawn a company service since 1995. Our passion is to give the best satisfaction  to our client
                    no matter what the situitaion is!
                </SubText>

            <Gap></Gap>

            <MainText>Get a qoute today!</MainText>
            <SubText>If you're insterted in our service and would like to get a free qoute, 
                fill up a quick form <Linkstyled to={"/qoute"}>here!</Linkstyled></SubText>

                <Gap></Gap>
                <MainText>Our services</MainText>
                <SubText>If you're insterted in our service and would like to know what we do and dont, 
                come check <Linkstyled to={"/services"}>here!</Linkstyled></SubText>
        </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    padding-left: 25%;
    padding-right: 20%;
    font-family: Arial, sans-serif;
`;

const Gap = styled.div`
margin-top: 50px;
padding-top: 20px;
`;

const MainText = styled.span`
    margin-top: 50px;
    border-bottom: 3px solid black;
    font-weight: bold;
    font-size: 45px;
`

const SubText = styled.div`
    padding-top: 40px;
    font-weight: bolder;
    line-height: 1.4;
`;

const Linkstyled = styled(Link)`
    text-decoration: none;
    color: blue;
`;

export default AboutUs;