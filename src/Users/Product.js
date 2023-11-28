import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './user.css';
const Product = () => {
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [highprice, setHighprice] = useState('HighlowTo');
    const [lowprice, setlowprice] = useState('LowToHigh');
    const [status, setStatus] = useState("");
    const [searchproduct, setSearchProduct] = useState("");

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(9);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = product.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(product.length / recordsPerPage)
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    const goToNextPage = () => {
        if (currentPage !== nPages)
            setCurrentPage(currentPage + 1)
    }

    const goToPrevPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }

    const handleSort = (order) => {
        if (order === 'HighlowTo') {
            setProduct([...product].sort((a, b) => a.price - b.price));
        } else {
            setProduct([...product].sort((a, b) => b.price - a.price));
        }
        setHighprice(order);
    };

    const handleLow = (order) => {
        if (order === 'LowToHigh') {
            setProduct([...product].sort((a, b) => b.price - a.price));
        } else {
            setProduct([...product].sort((a, b) => a.price - b.price));
        }
        setlowprice(order);
    };


    const allProduct = () => {
        axios.get(` http://localhost:8000/products?status=instock`)
            .then((res) => {
                setProduct(res.data)
            }).catch((err) => {
                console.log(err);
                return false;
            })
    }

    const allCategory = () => {
        axios.get(` http://localhost:8000/category`)
            .then((res) => {
                setCategory(res.data);
            })
            .catch((err) => {
                console.log(err);
                return false;
            })
    }

    const categoryFilter = (category) => {
        if (typeof category === 'string') {
            if (category.toLowerCase() === "all") {
                allProduct();
            } else {
                axios.get(`http://localhost:8000/products?category=${category}&status=instock`)
                    .then((res) => {
                        console.log(res.data);
                        setProduct(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                        return false;
                    });
            }
        } else {
            return false;
        }
        console.log('Category:', category);

    }

    const handlesearch = (e) => {
        const searchItem = e.target.value;
        setSearchProduct(searchItem);

        if (!searchItem) {
            allProduct();
        } else {
            const filteredItems = product.filter((user) =>
                user.name.toLowerCase().includes(searchItem.toLowerCase())
            );
            setProduct(filteredItems);
        }
    };



    useEffect(() => {
        axios.get(`http://localhost:8000/products?marketstatus=${status}&status=instock`).then((res) => {
            setProduct(res.data);
        }).catch((err) => {
            console.log(err);
            return false;
        })
        console.log('Product:', product);
    }, [status])

    useEffect(() => {
        allProduct();
        allCategory();
        handleSort();
        // categoryFilter();
    }, [])
    return (
        <>
            <div className="product-item pt-2 pb-2">
                <div className="container-fluid">
                    <div className="row justify-content-center ">
                        {
                            category.map((cat, index) => (
                                <div key={index} className="item-show p-3 col-md-1">
                                    <div className="text-center ">
                                        {
                                            cat.image_url ? (
                                                <img src={cat.image_url} alt="Product Image" className='mb-2' />
                                            ) : (
                                                <img src="default-image-url" alt="Default Image" />
                                            )

                                        }

                                        <button
                                            onClick={() => categoryFilter(cat.category_name)}
                                            style={{ width: '100%' }}
                                            className="btn btn-outline-primary"
                                        >
                                            {cat.category_name}
                                        </button>
                                    </div>
                                </div>
                            ))}

                    </div>
                </div>
            </div>

            <div className='container pt-4'>
                <div className='row'>
                    <div className='col-lg-3'>
                        <div className="card" style={{ width: '18rem' }}>
                            <ul className="list-group list-group-flush">
                                <>

                                    <li className="list-group-item p-3">
                                        <button class="btn  btn-outline-secondary w-100" onClick={() => handleSort()}>Price High to Low</button>
                                    </li>
                                    <li className="list-group-item p-3">
                                        <button class="btn  btn-outline-secondary w-100" onClick={() => handleLow()}>Price Low To High</button>
                                    </li>

                                </>

                            </ul>
                        </div>

                    </div>


                    <div className='col-lg-9 row'>
                        <div className='d-flex justify-content-end mb-3'>
                            <div className="col-lg-6">
                                <form>
                                    <input class="form-control ps-3" type="search" id="searchInput" placeholder="Search Product" aria-label="Search" value={searchproduct} onChange={handlesearch} />
                                </form>
                            </div>
                            <div className='col-lg-6'>
                                <select onChange={(e) => setStatus(e.target.value)} className='form'>
                                    <option>--- select status----</option>
                                    <option value="best">Best</option>
                                    <option value="upcomming">Upcomming</option>
                                    <option value="trending">Trending</option>
                                    <option value="latest">latest</option>
                                </select>
                            </div>
                        </div>
                        {
                            currentRecords.map((val) => {
                                return (
                                    <div className="col-lg-4 pb-3">
                                        <div className="card" style={{ width: '18rem', padding: '15px' }}>
                                            <img style={{ height: '200px', objectFit: 'contain' }} src={val.image} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">Name :- {val.name}</h5>
                                                <hr />
                                                <h5 className="card-title">Price :- {val.price}</h5>
                                                <div className='btn btn-primary w-100 mt-2'>
                                                    <Link to={`/productDetails/${val.id}`}>
                                                        <h6 style={{ color: 'white' }}>View More</h6>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <nav className='mt-5'>
                        <ul className='pagination justify-content-center'>
                            <li className="page-item">
                                <a className="page-link"
                                    onClick={goToPrevPage}
                                >

                                    Previous
                                </a>
                            </li>
                            {pageNumbers.map(pgNumber => (
                                <li key={pgNumber}
                                    className={`page-item ${currentPage == pgNumber ? 'active' : ''} `} >

                                    <a onClick={() => setCurrentPage(pgNumber)}
                                        className='page-link'
                                    >

                                        {pgNumber}
                                    </a>
                                </li>
                            ))}
                            <li className="page-item">
                                <a className="page-link"
                                    onClick={goToNextPage}
                                >
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Product;
