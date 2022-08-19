import MonthSelect from "../SpotSelect/MonthSelect"
import styled from "styled-components";
import ApiImages from '.././Api/ApiImages';
import { useEffect } from "react";

const GetQoute = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
    <ApiImages />
    <MainText>Book a spot today!</MainText>
    <MonthSelect />
    </>
  )
};

const MainText = styled.span`
  display: flex;
  padding-top: 100px;
  border-bottom: 3px solid black;
  width: 31%;
  font-weight: bolder;
  text-align: center;
  font-size: 45px;
`

export default GetQoute;
