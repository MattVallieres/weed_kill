import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Example = () => {
  const [res, setRes] = useState([]);

  const apiRoot = "https://api.unsplash.com";
  const query = "page=1&query=landscaping";
  const accessKey = process.env.REACT_APP_ACCESSKEY;

useEffect(() => {
  const fetchRequest = async () => {
    const data = await fetch(`${apiRoot}/search/photos?${query}&client_id=${accessKey}&per_page=4`);
    const dataJ = await data.json();
    const result = dataJ.results;
    console.log(result);
    setRes(result);
  };
    fetchRequest();
  }, []);

  return (
    <>
      <div>
        {res.map((image) => {
          return (
            <>
              <Row>
                <li>
                  {/* Warning: Each child in a list should have a unique "key" prop. */}
                  <Image src={image.urls.small} style={{ height: "280px", width: "280px" }}
                  />
                </li>
              </Row>
            </>
          );
        })}
      </div>
    </>
  );
};

const Row = styled.div`
  list-style-type: none;
  display: inline-block;
  flex-wrap: nowrap;
`;

const Image = styled.img`
  border: 5px solid black;
  box-shadow: 5px 10px;
  margin-right: 5vh;
`;

export default Example;
