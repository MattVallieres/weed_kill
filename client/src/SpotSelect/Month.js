import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Month = ({ month }) => {
  const [spots, setSpots] = useState([]);
  // a loading state
  const [selected, setSelected] = useState(null);
  // firstname, lastName, email, zipcode
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [zipcode, setZipCode] = useState("");

let navigate = useNavigate();
const fetchData = async () => {
  const data = await fetch(`/api/get-month/${month}`);
  // const data = await fetch(`/api/getSpecificMonth/August`);
  const json = await data.json();
  console.log(json.data);
  setSpots(json.data);
  return json;
};
// got help from Queue, wasn't aware we can use useEffect with async await 
  useEffect(() => {
    if(month!=="select")
    fetchData()
    .catch(() => {
    });
  }, [month]);
  
  // loading state
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selected);
    fetch("/api/addReservation", {
      method: "POST",
      body: JSON.stringify({
        month: month,
        spot: selected,
        firstname: firstName,
        lastname: lastName,
        email: email,
        zipcode: zipcode,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        window.localStorage.setItem("_id", JSON.stringify(data.reservation.insertedId));
        window.localStorage.setItem("id", JSON.stringify(data.reservation.id));
        // window.localStorage.setItem("_id", JSON.stringify(data.reservation.id));
        // let example = localStorage.getItem("reservations");
        // if (!example || example === "undefined") {
        //   example = [] 
        // }
        // localStorage.setItem("reservations", [...example, response.newRes._id]);
        window.location.reload(navigate("/confirmed"));
      });
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <Div>
      <Wrapper>
        {spots && spots.length > 0 ? (
          spots.map((spot) => (
            <SpotWrapper key={`spots-${spot.spot}`}>
              <label>
                {spot.isAvailable ? (
                  <>
                    <Spot
                      type="radio"
                      name="spot"
                      value={spot.spot}
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                    <Available>{spot.spot}</Available>
                  </>
                ) : (
                  <Unavailable>{spot.spot}</Unavailable>
                  )}
              </label>
            </SpotWrapper>
          ))
          ) : (
            <Placeholder>You haven't selected a month</Placeholder>
            )}
        </Wrapper>

      <Form onSubmit={(event) => handleSubmit(event)}>
        <Span>First Name</Span>
        <Input onChange={(event) => { setFirstName(event.target.value); }}/>
        <Span>Last Name</Span>
        <Input onChange={(event) => { setLastName(event.target.value); }} />
        <Span>Email</Span>
        <Input onChange={(event) => { setEmail(event.target.value); }} />
        <Span>Zipcode</Span>
        <Input onChange={(event) => { setZipCode(event.target.value); }} />
        <Button type={"submit"} disabled={firstName === ""|| lastName === "" || email === "" || zipcode === "" ||selected === null}>Submit</Button>
      </Form>

      </Div>
  );
};

const Span = styled.span`
  margin-bottom: 1px;
  font-weight: bold;
`;

const Input = styled.input`
  -webkit-appearance: none;
  border: black solid 1px;
  -moz-appearance: none;
  -ms-appearance: none;
  border: transparent;
  margin-bottom: 10px;
  border: 1px solid black;
  border-radius: 2px;
  appearance: none;
  padding: 12px;
  width: 250px;
`;

const Placeholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 404px;
  width: 260px;
  text-align: center;
  color: black;
  font-size: 50px;
  opacity: 0.5;
`;

const Wrapper = styled.ol`
  display: grid;
  grid-template-rows: repeat(10, 30px);
  grid-template-columns: 30px 30px 60px 30px 30px 30px;
  gap: 10px 10px;
  background: #fff;
  border-right: 15px solid none;
  border-left: 15px solid none;
  margin: 24px 24px 0 0;
  padding: 50px 5px;
  width: 300px;
  position: relative;
`;

const SpotWrapper = styled.li`
  display: flex;
  font-size: 50px;
  font-weight: 500;
  position: relative;
  height: 30px;
  width: 30px;
`;

const Spot = styled.input`
  opacity: 0;
  position: absolute;
  height: 30px;
  width: 30px;
  margin: 0;
  &:checked + span {
  background: lightgrey;
  color: grey;
  font-weight: 700;
}
`;

const SpotNumber = styled.span`
  transition: all ease 300ms;
  justify-content: center;
  font-family: Helvetica;
  align-items: center;
  position: absolute;
  margin-top: 10px;
  font-size: 25px;
  display: flex;
  color: white;
  height: 30px;
  width: 30px;
`;

const Available = styled(SpotNumber)`
  border: 1px solid black;
  background: black;
  cursor: pointer;
  &.checked,
  &:hover {
    background: white;
    color: black;
    font-weight: 700;
  }
`;
const Unavailable = styled(SpotNumber)`
  background: red;
  cursor: not-allowed;
  opacity: 0.2;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  margin-left: 100px;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  margin-left: 10px;
  background: black;
  padding: 12px;
  color: white;
  width: 250px;
  &:hover:not([disabled]) {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
    color: grey;
    background-color: white;
  }
`;

export default Month;
