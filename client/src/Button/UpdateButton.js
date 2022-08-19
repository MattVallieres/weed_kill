import styled from "styled-components";
import { useState } from "react";
import Popping from "../Popping";


const UpdateReservation = () => {
    const [change, setChange] = useState("")
    const [popUp, setPopUp] = useState(false);
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [zipcode, setZipCode] = useState("")

const id = JSON.parse(window.localStorage.getItem("id"))

const changes = { id: id, firstname, lastname, email, zipcode };
console.log(changes)

const handleUpdate = (e) => {
    fetch(`/api/updateReservation`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, firstname, lastname, email, zipcode })
    })
    .then((res) => res.json())
    .then((json) => {
        setChange(json);
        console.log(json)
        localStorage.getItem("id");
    })
    .catch((err) => console.log(err));
    }

    return (
        <>
        <Button disabled={id === null} onClick={() => setPopUp(true)}>
          Change my informations
        </Button>
            <Popping trigger={popUp} setTrigger={setPopUp}>
            <h3>Re-enter your information</h3>
            <Form onSubmit={handleUpdate}>

            <Input 
            placeholder="First Name"
            name="firstName"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            required>
            </Input>

            <Input
            placeholder="Last Name"
            name="lastName"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            required>
            </Input>

            <Input
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required>
            </Input>

            <Input
            placeholder="Zipcode"
            name="zipcode"
            value={zipcode}
            onChange={(e) => setZipCode(e.target.value)}
            required>
            </Input>

            <Confirm type="submit">Confirm</Confirm>
            <Confirm type="cancel" onClick={() => setPopUp(false)}>Cancel</Confirm>
            </Form>
            </Popping>
        </>
    )
};

const Button = styled.button`
border: 1px solid black;
margin-left: 50px;
margin-top: 50px;
cursor: pointer;
font-size: 25px;
padding: 15px;
&:hover{
    background-color: LightGreen;
}
&:active{
    background-color: green;
}`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: fit-content;
    align-self: center;
    border-radius: 5px;
`;

const Input = styled.input`
    font-size: 18px;
    margin-bottom: 10px;
`;

const Confirm = styled.button`
    background-color: black;
    color: white;
    padding: 3px 10px;
    font-size: 18px;
    border: none;
    margin-top: 5px;
    cursor: pointer;
`;

export default UpdateReservation;