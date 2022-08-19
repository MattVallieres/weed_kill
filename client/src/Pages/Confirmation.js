import { useEffect, useState } from "react";
import styled from "styled-components";
import DeleteButton from ".././Button/DeleteButton";
import UpdateButton from ".././Button/UpdateButton";

const Confirmation = ({}) => {
  const [reservation, setReservation] = useState();
  const [load, setLoad] = useState(false);

  const reservationId = JSON.parse(window.localStorage.getItem("_id"));

  // brings you to the confirmation page
  useEffect(() => {
    fetch(`/api/get-reservation/${reservationId}`)
      .then((res) => res.json())
      .then((data) => {
        setReservation(data.data);
        console.log(data.data);
        setLoad(true);
      })
      .catch((err) => console.log(err));
  }, []);

  if (load === false) {
    return <>loading</>;
  }

  const filter = reservation.filter(
    (x) => x.spot === localStorage.getItem("_id")
  );

  return (
    <>
      <Wrapper>
        <Col>
          <Congrats>
            Congratulations {reservation[0].firstname} 🥳 you reserved a spot
            and we'll contact you soon as possible for a qoute
          </Congrats>

          <Div>
            <Results>Reservation #: {reservation[0]._id}</Results>
          </Div>

          <Div>
            <Results>Month #: </Results>
            {reservation[0].month}
          </Div>

          <Div>
            <Results>Spot #: </Results>
            {reservation[0].spot}
          </Div>

          <Div>
            <Results>Full Name: </Results>
            {reservation[0].firstname + " " + reservation[0].lastname}
          </Div>

          <Div>
            <Results>Email:</Results> {reservation[0].email}
          </Div>

          <Div>
            <Results>ZipCode:</Results> {reservation[0].zipcode}
          </Div>
        </Col>
      </Wrapper>
      <DeleteButton />
      <UpdateButton />
    </>
  );
};

const Congrats = styled.div`
  font-family: Helvetica;
  font-weight: bolder;
  font-size: 45px;
  padding-bottom: 45px;
`;

const Col = styled.div``;

const Wrapper = styled.div`
  margin-top: 100px;
`;

const Div = styled.div`
  font-size: 30px;
  padding-top: 20px;
`;

const Results = styled.span`
  font-weight: bold;
`;

export default Confirmation;
