import Month from "./Month";
import styled from "styled-components";
import { useEffect, useState } from "react";

const SpotSelect = ({}) => {
  const [months, setMonths] = useState("");
  const [load, setLoad] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("select");

  // get all month data
  useEffect(() => {
    fetch("/api/get-months")
      .then((res) => res.json())
      .then((data) => {
        setMonths(data.data);
        console.log(data)
        setLoad(true);
      })
      .catch((err) => console.log(err));
    //     const fetchData = async () => {
    //       const data = await fetch("/api/getAllMonth");
    //       const json = await data.json();
    //       console.log(json.data);
    //       setMonth(json.data);
    //       setLoad(true);
    //       return json;
    //     };
    //     fetchData().catch(() => {});
  }, []);

  // loading state
  if (load === false) {
    return <>loading</>;
  }

  // Selecting a month
  const handleChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <>

      <Label>
        <span>Select a month:</span>
        <Select value={selectedMonth} onChange={handleChange}>
          <option value={"select"}>Select</option>
          {/* Warning: Each child in a list should have a unique "key" prop. */}
          {/* Simple fix, added id prop and key={id} in <option> */}
          {months.map((el, id) => (<option key={id} value={el}>{el}</option>))}</Select>
      </Label>

      {selectedMonth !== "select" ? (
        <>
          <H3>Select a spot and provide your information</H3>
          <Month month={selectedMonth} />
        </>
      ) : (
        <>
          <H3>Select a month to recieve information for a specific month.</H3>
            <Month month={selectedMonth} />
        </>
      )}
    </>
  );
};

const Select = styled.select`
  margin-left: 15px;
  margin-top: 45px;
  font-size: 22px;
`;

const H3 = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 15px;
`;

const Label = styled.label`
  text-align: left;
  padding: 15px;
  color: black;
`;


export default SpotSelect;
