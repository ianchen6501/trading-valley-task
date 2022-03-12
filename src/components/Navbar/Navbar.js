import "./Navbar.css";
import { Navbar as Nav, Container } from "react-bootstrap";

function Navbar() {
	return (
		<Nav className="navbar" bg="light">
			<Container>
				<Nav.Brand>TradingValley task.</Nav.Brand>
			</Container>
		</Nav>
	);
}

export default Navbar;
