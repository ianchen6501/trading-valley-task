import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import YoutubeSearch from "./pages/YoutubeSearch";
import Navbar from "./components/Navbar/Navbar";

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
