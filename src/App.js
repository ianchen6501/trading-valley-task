import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import YoutubeSearch from "./pages/YoutubeSearch";
import Navbar from "./components/Navbar/Navbar";
import { Card, Button } from "react-bootstrap";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<YoutubeSearch />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
