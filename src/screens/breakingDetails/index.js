import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Nav";

const Details = (props) => {
	const [details, setDetails] = useState({})
	const [quotes, setQuotes] = useState([])

	function getQuotes(id) {
		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		};

		fetch(`https://www.breakingbadapi.com/api/quotes/${id}`, requestOptions)
			.then(response => response.json())
			.then(result => {
				console.log(result)
				setQuotes(result)
			})
			.catch(error => console.log('error', error));
	}

	useEffect(() => {
		if (props.location.query.char_id) {
			setDetails(props.location.query)
			getQuotes(props.location.query.char_id)

		}
		console.log(props.location.query.appearance)
	}, [props])

	return (
		<>
			<Navbar />
			<div className="wrapper">
				<div className="container container-sm">
					<div className="details-flex">
						<div className="det-img">
							<img src={details.img}
								alt="anImg" />
						</div>
						<div className="detail-content">
							<h3 className="mb-3">{details.name}</h3>
							<ul className="card-text">
								<li><b>Birthday: </b> &nbsp; {details.birthday}</li>
								<li><b>Occupation: </b> &nbsp; {details.occupation}</li>
								<li><b>Status: </b> &nbsp; {details.status}</li>
								{
									details.nickname && (
										<li><b>Nickname: </b> &nbsp; {details.nickname}</li>
									)
								}
								<li><b>Seasons: </b> &nbsp; {
									details.appearance && details.appearance.map(e => (
										<>{e}, </>
									))
								}</li>
							</ul>
							<hr />
							<div className="quotes-list">
								<h5>Quotes</h5>
								<ul>
									{
										quotes.map(e => (
											<li key={e.quote_id}>{e.quote}</li>
										))
									}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default Details;
