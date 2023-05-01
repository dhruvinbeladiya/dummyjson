import './mycss.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch, FaBars, FaEye, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Rating from '@mui/material/Rating';
import { fontSize } from '@mui/system';

const Home = () => {

	const [productdata, setproductdata] = useState([]);
	const [category, setcategory] = useState([]);

	useEffect(() => {
		axios.get('https://dummyjson.com/products')
			.then(function (response) {
				console.log(response.data.products);
				setproductdata(response.data.products);
			})
			.catch(function (error) {
				console.log(error);
			})

		axios.get('https://dummyjson.com/products/categories')
			.then(function (response) {
				console.log(response.data);
				setcategory(response.data);
			})
			.catch(function (error) {
				console.log(error);
			})
	}, []);

	const myfun = (items) => {
		axios.get(`https://dummyjson.com/products/category/${items}`)
			.then(function (response) {
				console.log(response.data.products);
				setproductdata(response.data.products);
			})
			.catch(function (error) {
				console.log(error);
			})

		setShow(handleClose);
	}

	const allproduct = () => {
		axios.get('https://dummyjson.com/products')
			.then(function (response) {
				console.log(response.data.products);
				setproductdata(response.data.products);
			})
			.catch(function (error) {
				console.log(error);
			})

		setShow(handleClose);
	}

	const searching = (val) => {
		var search;
		search = val;
		search = document.getElementById('search').value;
		axios.get(`https://dummyjson.com/products/search?q=${search}`)
			.then(function (response) {
				console.log(response.data.products);
				setproductdata(response.data.products);
			})
			.catch(function (error) {
				console.log(error);
			})
	}

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<header className="py-3 header text-bg-primary sticky-top">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-4">
							<div className="bar_icon d-flex align-items-center">
								<Button variant="" className="text-white" onClick={handleShow}>
									<i className="fs-4"><FaBars /></i>
								</Button>
								<div className="title text-center">
									<h2 className="m-0">Ecommerce Store</h2>
								</div>
							</div>
						</div>
						<div className="col-4">
							<div class="search_bar d-flex justify-content-end">
								<input class="form-control rounded-1" type="search" id="search" placeholder="search your products" aria-label="Search" onKeyUp={(e) => searching(e.target.value)} />
								<button class="btn btn-warning rounded-1" type="button" onClick={() => searching()}>
									<i><FaSearch /></i>
								</button>
							</div>
						</div>
						<div className="col-4 text-end">
							<div className="cart">
								<a href="#" className="text-white text-decoration-none">
									<span className="fs-4"><i className="me-2"><FaShoppingCart /></i>cart</span>
								</a>
							</div>
						</div>
					</div>
					<Offcanvas show={show} onHide={handleClose}>
						<Offcanvas.Header closeButton>
							<Offcanvas.Title className="fs-1 fw-bold">Products</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body className="p-0">
							<ul className="ps-4">
								<li><Link className="text-decoration-none text-dark" onClick={() => { allproduct() }} >All</Link></li>
								{
									category.map((items) => {
										return (
											<>
												<li className="py-1">
													<Link className="text-decoration-none text-dark" onClick={() => { myfun(items) }}>{items}</Link>
												</li>
											</>
										)
									})
								}
							</ul>
						</Offcanvas.Body>
					</Offcanvas>
				</div>
			</header>

			<section className="py-5">
				<div className="container">
					<div className="row">
						<div class="alert alert-danger d-none" role="alert" id="error">
							Opps! Items Not Found!
						</div>
						{
							productdata.map((item) => {
								return (
									<>
										<div className="col-lg-4 col-md-6 mb-5">
											<div className="card product_card mb-3 h-100 mx-2">
												<div className="product_img">
													<img src={item.thumbnail} alt="" />
												</div>
												<div className="card-body pb-0 ps-4">
													<ul>
														<li>
															<h3 className="pb-2 fw-bold">{item.title}</h3>
														</li>
														<li className="pb-2">
															<p className="text-muted m-0" style={{ textAlign: 'justify' }}>
																{item.description}
															</p>
														</li>
														<li className='py-1 d-flex align-items-center'>
															<span className="me-2 fw-bold">Ratings</span>
															<Rating name="half-rating-read" value={item.rating} precision={0.5} readOnly />
														</li>
														<li className='py-1'>
															<span className="fw-bold">Price</span>
															<span className="fw-bold fs-5 text-danger ms-3">
																${(item.price) - ((item.price) * (item.discountPercentage)) / 100}
															</span>
															<span className="fw-bold fs-6 text-muted text-decoration-line-through ms-2">${item.price}</span>
														</li>
														<li className='pt-1'>
															<span className="fw-bold">Hurry up! available stocks are</span>
															<span className='fw-bold text-success ms-2'>{item.stock}.</span>
														</li>
													</ul>
												</div>
												<div className="px-3">
													<Link to={`/product/${item.id}`} className="btn btn-outline-primary w-100 mx-auto mb-3 rounded-1 text-decoration-none py-2" style={{fontSize :"17px"}}>
														View Details<i className="ms-2"><FaEye /></i>
													</Link>
												</div>
											</div>
										</div>
									</>
								)
							})
						}
					</div>
				</div>
			</section>
		</>
	);
}

export default Home;

