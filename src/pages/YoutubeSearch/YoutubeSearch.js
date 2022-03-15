import { useState } from "react";
import moment from "moment";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { searchListAPI, getSingleVideoDataAPI } from "../../webAPI";
import "./YoutubeSearch.css";

function YoutubeSearch() {
	const [keyword, setKeyword] = useState("");
	const [videoList, setVideoList] = useState(null);
	const [videosData, setVideosData] = useState(null);
	const videoIdUrl = "https://www.youtube.com/watch?v=";
	const channelIdUrl = "https://www.youtube.com/channel/";

	const getVideosData = async (videoList) => {
		let dataArray = [];
		for (let video of videoList) {
			const data = await getSingleVideoDataAPI(video.id.videoId);
			dataArray.push(data);
		}
		return dataArray;
	};

	const onFormSubmit = async (e) => {
		e.preventDefault();
		const videoDataList = await searchListAPI(keyword);
		setVideoList(videoDataList);
		const data = await getVideosData(videoDataList.items);
		console.log("[DEBUG] data", data);
		setVideosData(data);
		setKeyword("");
	};

	const handleMomentTransfer = (time) => {
		return moment(time, "YYYYMMDD").fromNow();
	};

	const handleRedirectUrl = (type, id) => {
		let url;
		switch (type) {
			case "video":
				url = videoIdUrl.concat(id);
				break;
			case "channel":
				url = channelIdUrl.concat(id);
				break;
			default:
				break;
		}
		return url;
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
									<Card.Body className="pt-5 pb-5">
										<a
											href={handleRedirectUrl("video", item.items[0].id)}
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
									<Card.Body className="pt-5 pb-5">
										<a
											href={handleRedirectUrl("video", item.items[0].id)}
											target="_blank"
											rel="noreferrer"
										>
											<Card.Title className="fw-bold">
												{item.items[0].snippet.title}
											</Card.Title>
										</a>
										<Card.Subtitle className="mb-2 fw-bold">
											<span>
												觀看次數: {item.items[0].statistics.viewCount}．
											</span>
											<span>
												{handleMomentTransfer(
													item.items[0].snippet.publishedAt
												)}
											</span>
										</Card.Subtitle>
										<a
											href={handleRedirectUrl(
												"channel",
												item.items[0].snippet.channelId
											)}
											target="_blank"
											rel="noreferrer"
										>
											<Card.Subtitle className="mb-2 fw-bold">
												{item.items[0].snippet.channelTitle}
											</Card.Subtitle>
										</a>
										<Card.Text className="videoInfo">
											{item.items[0].snippet.description}
										</Card.Text>
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
