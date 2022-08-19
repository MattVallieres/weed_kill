import styled from "styled-components";

const DeletionPage = () => {
  return (
    <>
      <Wrapper>
        <Message>We're sorry to see you go 😔</Message>
        <SubMessage>
          Before leaving, can you tell us a few words why you have deleted your
          reservation?
        </SubMessage>
        <TextArea
          placeholder="This is a stretch goal, I want the user to submit their reasoning for canceling their reservation and 'US' recieving that information"
          rows="4"
          cols="50"
        ></TextArea>
        <Button>Submit</Button>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const Button = styled.button`
  margin-top: 15px;
  font-size: 15px;
  padding: 15px;
`;

const Message = styled.div`
  font-weight: bold;
  font-size: 45px;
`;

const TextArea = styled.textarea`
  margin-left: 480px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const SubMessage = styled.div`
  padding: 50px;
  font-weight: bold;
  font-size: 25px;
`;

export default DeletionPage;
