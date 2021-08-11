import { Link } from "react-router-dom";

const Card = (props) => {

    return (
        <div className="card list-cr">
            {/* <div className="ce-li-img">
                <img src="https://vignette.wikia.nocookie.net/breakingbad/images/e/e7/Krazy8.png/revision/latest?cb=20130208041554"
                    className="card-img-top" alt="anImg" />
            </div> */}
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <ul className="card-text">
                    <li><b>Birthday: </b> {props.birthday}</li>
                    <li><b>Occupation: </b> {props.occupation}</li>
                    <li><b>Status: </b> {props.status}</li>
                </ul>
                <Link to={{ pathname: "search", query: { ...props } }} >
                    <button type="button" className="btn btn-outline-primary w-100"
                        data-mdb-ripple-color="dark">
                        Learn More
                    </button>
                </Link>
            </div>
        </div>
    );
};

Card.defaultProps = {
    name: "",
    birthday: "",
    occupation: "",
    status: ""
}

export default Card;