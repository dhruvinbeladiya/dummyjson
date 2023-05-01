import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaShoppingBag } from "react-icons/fa";

const Shop = () => {

    var { id } = useParams();

    const [pdata, setpdata] = useState([]);

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/${id}`)
            .then(function (response) {
                console.log(response.data);
                setpdata(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    return (
        <>
            <div className="status py-5 ps-5 bg-warning">
                <h1 className="fw-bolder">Shopping page</h1>
                <Link to={`/product/${id}`} className="btn btn-outline-light rounded-pill px-5 mt-2 text-decoration-none">Go Product Page</Link>
            </div>
            <section className="mt-3 py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="shop">
                                <div className="shop_img">
                                    <img src={pdata.thumbnail} alt="" className="img-fluid" width="100%" />
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="purchase_form shadow p-4">
                                <form action="">
                                    <div className="col-12 mb-3">
                                        <label>Your Name *</label>
                                        <input type="text" className="form-control" name="" id="" />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label>Your Email *</label>
                                        <input type="email" className="form-control" name="" id="" />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label>Your Mobile *</label>
                                        <input type="text" className="form-control" name="" id="" />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label>Your Address *</label>
                                        <textarea className="form-control" name="" id="" cols="30" rows="3"></textarea>
                                    </div>
                                    <div className="col-12 mt-3">
                                        <Link to="" className="btn btn-primary w-100 text-white text-decoration-none" style={{ fontSize: "17px" }}>Place an order</Link >
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Shop;