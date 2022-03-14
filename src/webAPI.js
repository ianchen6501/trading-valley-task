const apiKey = process.env.REACT_APP_API_KEY;

const apiUrl = "https://www.googleapis.com/youtube/v3";

const parameters = {
	listQuery: `/search?q={keyword}&maxResults=4&key=${apiKey}&type=video&part=snippet`,
	singleVideoQuery: `/videos?id={videoId}&key=${apiKey}&part=snippet,statistics`,
};

export function searchListAPI(keyword) {
	let url = `${apiUrl}${parameters.listQuery}`;
	url = url.replace("{keyword}", keyword);
	return fetch(url)
		.then((res) => {
			return res.json();
		})
		.catch((err) => {
			console.log(err);
		});
}

export function getSingleVideoDataAPI(videoId) {
	let url = `${apiUrl}${parameters.singleVideoQuery}`;
	url = url.replace("{videoId}", videoId);
	return fetch(url)
		.then((res) => {
			return res.json();
		})
		.catch((err) => {
			console.log(err);
		});
}
