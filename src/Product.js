import './mycss.css';
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaShoppingBag } from "react-icons/fa";

const Product = () => {

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

	const imgchange = (id) => {
		document.getElementById('main').src = `${(pdata.images || [])[id]}`
	}

	return (
		<>
			<div className="status py-5 ps-5 bg-warning">
				<h1 className="fw-bolder">Product page</h1>
				<Link to="/" className="btn btn-outline-light rounded-pill px-5 mt-2 text-decoration-none">Go Home</Link>
			</div>
			<section>
				<div className="container">
					<div className="row py-5">
						<div className="col-1">
							<div className="row sub_img">
								<div className="col-12 mb-4">
									<img src={(pdata.images || [])[1]} alt="" className="img-fluid" onMouseOver={(e) => { imgchange(1) }} />
								</div>
								<div className="col-12 mb-4">
									<img src={(pdata.images || [])[2]} alt="" className="img-fluid" onMouseOver={(e) => { imgchange(2) }} />
								</div>
								<div className="col-12 mb-4">
									<img src={(pdata.images || [])[3]} alt="" className="img-fluid" onMouseOver={(e) => { imgchange(3) }} />
								</div>
								<div className="col-12 mb-4">
									<img src={(pdata.images || [])[4]} alt="" className="img-fluid" onMouseOver={(e) => { imgchange(4) }} />
								</div>
							</div>
						</div>
						<div className="col-lg-6 col-sm-11 text-center">
							<img src={(pdata.images || [])[0]} alt="" id="main" className="img-fluid"/>
						</div>
						<div className="col-lg-5">
							<ul>
								<li>
									<h3 className="pb-2 fw-bold">{pdata.brand}</h3>
								</li>
								<li className="pb-2">
									<p className="text-muted m-0" style={{ textAlign: 'justify' }}>
										{pdata.description}
									</p>
								</li>
								<li className='py-1'>
									<span>Ratings</span>
									<span className='ms-2 fw-bold text-success'>{pdata.rating}</span>
								</li>
								<li className='py-1'>
									<span>Price</span>
									<span className="fw-bold fs-5 text-danger ms-3">
										${(pdata.price) - ((pdata.price) * (pdata.discountPercentage)) / 100}
									</span>
									<span className="fw-bold fs-6 text-muted text-decoration-line-through ms-2">${pdata.price}</span>
								</li>
								<li className='py-1'>
									<span>Hurry up! available stocks are</span>
									<span className='fw-bold text-success ms-2'>{pdata.stock}.</span>
								</li>
								<li className="pt-3">
									<button className="btn btn-primary rounded-1 px-4 py-2">
										<Link to={`/shop/${pdata.id}`} className="text-white text-decoration-none fw-bold" style={{fontSize:"17px"}}>
											<i className="me-2"><FaShoppingBag/></i>Shop Now
										</Link> 
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Product;