import { useState, useEffect } from "react";
import Card from "../../components/Card";
import Navbar from "../../components/Nav";
import Footer from "../../components/Footer";

const Home = () => {
    const [page, setPage] = useState(1);
    const [list, setList] = useState([])
    const [loader, setLoader] = useState(true)
    const [query, setQuery] = useState('')


    function getList(id) {
        setLoader(true)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://www.breakingbadapi.com/api/characters?limit=10&offset=${eval(id * 10)}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setList(result)
                setLoader(false)
            })
            .catch(error => console.log('error', error));
    }

    function nextPageHandler(id) {
        getList(id)
        setPage(id)
    }

    function search(query, type) {
        console.log(query)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        let q = query.replace(" ", "+")

        setLoader(true)
        let url = `https://www.breakingbadapi.com/api/characters?limit=10&name=${q}`;
        if (type == 'c') {
            url = `https://www.breakingbadapi.com/api/characters?limit=10&category=${q}`
        }
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setList(result)
                setLoader(false)
                setQuery('')
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getList(1)
    }, [])

    return (
        <>
            <Navbar />
            <div className="wrapper">
                <div className="container container-sm">
                    <div className="input-group mb-3">
                        <div className="form-outline">
                            <input value={query} onChange={(e) => setQuery(e.target.value)} type="search" id="form1" className="form-control search-main" />
                            <label className="form-label" for="form1">Search</label>
                        </div>
                        <button onClick={() => search(query)} type="button" className="btn btn-outline-primary">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                    <span>
                        <b>NOTE: ACCORDING TO API DOCS</b> <br />
                        Notice the 'plus sign' between the first and last name represents a space. This query only works with the full name of a character. Double check your spelling!
                    </span>
                    <hr />

                    <div>
                        <button onClick={() => search('Breaking Bad', 'c')} type="button" className="btn btn-outline-primary mx-2"
                            data-mdb-ripple-color="dark">
                            Breaking Bad
                        </button>
                        <button onClick={() => search('Better Call Saul', 'c')} type="button" className="btn btn-outline-primary mx-2"
                            data-mdb-ripple-color="dark">
                            Better Call Saul
                        </button>
                    </div>

                    <hr />

                    <div className="py-5 pt-2">
                        <h2 className="mb-5 text-center">CHARACTERS</h2>
                        <div className="position-relative main-card-cont">
                            {
                                loader ? (
                                    <div className="loader-vrd">
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="cards-flexbox">
                                        {
                                            list.map(e => (
                                                <Card
                                                    key={`card-${e.char_id}`}
                                                    {...e}
                                                />
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>

                    </div>

                    <nav aria-label="...">
                        <ul className="pagination">
                            <li className="page-item disabled">
                                <span onClick={() => nextPageHandler(page - 1)} className="page-link"
                                    tabindex="-1" aria-disabled={page == 1 ? "true" : "false"}>Previous</span>
                            </li>
                            {
                                [1, 2, 3, 4, 5].map(e => (
                                    <li
                                        onClick={() => nextPageHandler(e)}
                                        key={`pageination-${e}`}
                                        className={page == e ? "page-item active" : "page-item"}>
                                        <span className="page-link">{e}</span>
                                    </li>
                                ))
                            }
                            <li className="page-item">
                                <span className="page-link" onClick={() => nextPageHandler(page + 1)}
                                    aria-disabled={page == 5 ? "true" : "false"}>Next</span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home;