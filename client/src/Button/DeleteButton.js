import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

// user can delete their reservation
const DeleteReservation = () => {
  let navigate = useNavigate();
  const reservationId = JSON.parse(window.localStorage.getItem("_id"));
  const handleDelete = () => {
    fetch(`/api/deleteReservation/${reservationId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          localStorage.removeItem("_id");
          window.location.reload(navigate("/delete"));
        } else {
          console.log("there was an error");
        }
      });
  };

  return (
    <>
      <Linkstyled to={"/delete"}>
        {/* When user deletes their reservation*/}
        <Button onClick={handleDelete}>Delete your reservation</Button>
      </Linkstyled>
    </>
  );
};

const Linkstyled = styled(Link)``;

const Button = styled.button`
  margin-top: 50px;
  border: 1px solid black;
  cursor: pointer;
  font-size: 25px;
  padding: 15px;
  &:hover {
    background-color: FireBrick;
  }
  &:active {
    background-color: Maroon;
  }
`;

export default DeleteReservation;
