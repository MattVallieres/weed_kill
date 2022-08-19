
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
    const _id = localStorage.getItem("_id");

return (
    <Container>
        <Navbar>

        <Linkstyled to={"/"}> {/* links to homepage */}
            <BigText>Weed Kill</BigText>
        </Linkstyled>

        <Linkstyled to={"/qoute"}>
        <Text>Get a free qoute</Text>
        </Linkstyled>

        <Linkstyled to={"/about"}> {/* links to about us page */}
            <Text>About Us</Text>
        </Linkstyled>

        <Linkstyled to={"/services"}> {/*links to services page */}
            <Text>Our Services</Text>
        </Linkstyled>

        {_id && <Linkstyled to="/confirmed"><Text>Reservation</Text></Linkstyled>}

        {/* {_id && <Linkstyled to={"/confirmed"}><Text>Our Services</Text></Linkstyled>} */}

        </Navbar>
    </Container>
    );
};

const Linkstyled = styled(Link)`
    text-decoration: none;
    color: white;
    &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}`;

const Container = styled.div`
    font-family: Arial, sans-serif;
    color: white;
`;

const Navbar = styled.span`
    justify-content: space-between;
    border-bottom: solid 4px black;
    background-color: black;
    margin-bottom: 50px;
    padding: 20px;
    display: flex;
`;

const Text = styled.div`
    text-shadow: 2px 1px grey;
    text-decoration: none;
    font-weight: bolder;
    margin-top: 5px;
    font-size: 25px;
    cursor: pointer;
    &:hover {
        color: hsl(120, 99%, 60%);
        transition: 1s;
}`;

const BigText = styled.div`
    text-shadow: 2px 1px grey;
    font-weight: bolder;
    font-style: italic;
    cursor: pointer;
    font-size: 40px;
`;

export default Header;
