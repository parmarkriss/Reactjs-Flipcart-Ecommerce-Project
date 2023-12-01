import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
    const handleAccordionClick = (e) => {
        e.preventDefault();
    };

    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('checkUserLogin'));
    console.log(user);

    const logout = () => {
        navigate('/');
        localStorage.removeItem('checkUserLogin');
    };




    return (
        <header className="navbar navbar-expand-lg navbar-light bg-light p-2" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <div className="container">
                <div className="col-md-5">
                    <NavLink className="navbar-brand" to="/home">
                        <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/flipkart-095e08.svg" style={{ width: '120px' }} alt="Logo" />
                    </NavLink>
                </div>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div className="col-md-7 class=" collapse="navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto ps-5  align-items-center">
                        <li className="nav-item pe-4">
                            <NavLink to='/' className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item pe-4">
                            <NavLink to='/product' className="nav-link">Products</NavLink>
                        </li>
                        {
                            user && (
                                  <li className="nav-item pe-4">
                                    <NavLink to='/cart' className="nav-link">Cart</NavLink>
                                </li>
                               
                            )
                        }
                        <li className="nav-item pe-4">
                            <NavLink to='/contact' className="nav-link">Contact</NavLink>
                        </li>
                        {
                            user && (
                                <li className="nav-item pe-4">
                                <NavLink to='/profile' className="nav-link"><i class="bi bi-person-fill pe-1"></i>Profile</NavLink>
                             </li>
                            )
                        }
                        
                        {
                            !user ?
                                (
                                    <>
                                        <li class="nav-item">
                                            <NavLink to='/register'><i class="bi bi-r-circle-fill"></i> <span>Register</span></NavLink>
                                        </li>
                                        <li class="nav-item ps-4">
                                            <NavLink to='/login'>
                                                <i class="bi bi-door-open-fill"></i><span>Login</span></NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <li class="nav-item ps-2">
                                        <NavLink to='/login' onClick={() => logout()}>
                                            <i class="bi bi-power"></i><span>Logout</span></NavLink>
                                    </li>
                                )
                        }
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
