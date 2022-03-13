import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { searchListAPI, getSingleVideoDataAPI } from "../../webAPI";
import "./YoutubeSearch.css";

function YoutubeSearch() {
	const [keyword, setKeyword] = useState("");
	const [videoList, setVideoList] = useState(null);
	const [videosData, setVideosData] = useState(null);
	const videoIdUrl = "https://www.youtube.com/watch?v=";

	async function getVideosData(videoList) {
		let dataArray = [];
		for (let video of videoList) {
			const data = await getSingleVideoDataAPI(video.id.videoId);
			dataArray.push(data);
		}
		return dataArray;
	}

	const onFormSubmit = async (e) => {
		e.preventDefault();
		const videoDataList = await searchListAPI(keyword);
		setVideoList(videoDataList);
		const data = await getVideosData(videoDataList.items);
		setVideosData(data);
	};

	return (
		<Container className="p-5">
			<Form id="searchForm" onSubmit={(e) => onFormSubmit(e)}>
				<Row>
					<Col xs="10">
						<Form.Group>
							<Form.Control
								type="text"
								placeholder="Type here."
								onChange={(e) => setKeyword(e.target.value)}
								value={keyword}
							></Form.Control>
						</Form.Group>
					</Col>
					<Col xs="2">
						<Button type="submit" className="primary">
							Submit
						</Button>
					</Col>
				</Row>
			</Form>
			{videosData &&
				videosData.map((item, index) => {
					return (
						<Row key={index}>
							<Card className="mt-5 d-flex flex-row">
								<Col xs="6">
									<Card.Body className="pt-2 pb-2">
										<a
											href={videoIdUrl.concat(item.items[0].id)}
											target="_blank"
											rel="noreferrer"
										>
											<img
												className="videoImage"
												src={item.items[0].snippet.thumbnails.high.url}
												alt="img"
											></img>
										</a>
									</Card.Body>
								</Col>
								<Col xs="6">
									<Card.Body className="pt-2 pb-2">
										<Card.Title>{item.items[0].snippet.title}</Card.Title>
										<Card.Subtitle>
											<span>{item.items[0].snippet.channelTitle}</span>
											<span>
												觀看次數: {item.items[0].statistics.viewCount}
											</span>
										</Card.Subtitle>
										<Card.Text>info</Card.Text>
									</Card.Body>
								</Col>
							</Card>
						</Row>
					);
				})}
		</Container>
	);
}

export default YoutubeSearch;
