import { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

function YoutubeSearch() {
	return (
		<Container className="p-5">
			<Form>
				<Row>
					<Col xs="8">
						<Form.Group>
							<Form.Control type="text" placeholder="Type here."></Form.Control>
						</Form.Group>
					</Col>
					<Col>
						<Button className="primary">Submit</Button>
					</Col>
				</Row>
			</Form>
			<Row>
				<Card className="mt-5 d-flex flex-row">
					<Card.Body className="p-2"></Card.Body>
					<Card.Body className="p-2">
						<Card.Title>Title</Card.Title>
						<Card.Subtitle>Publisher</Card.Subtitle>
						<Card.Text>info</Card.Text>
					</Card.Body>
				</Card>
			</Row>
		</Container>
	);
}

export default YoutubeSearch;
