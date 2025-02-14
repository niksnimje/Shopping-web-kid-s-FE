import React, { useState, useRef, useEffect } from "react";
import { useCookies } from "react-cookie";
import {jwtDecode} from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import { Offcanvas } from "bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import toast from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";

const Navigation = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['_vercel_jwt']);
  const [user, setUser] = useState(null);

  // Ref for the loading bar
  const loadingBarRef = useRef(null);

  // Decode the JWT token and set user data
  useEffect(() => {
    if (cookies._vercel_jwt) {
      try {
        const decodedToken = jwtDecode(cookies._vercel_jwt);
        setUser(decodedToken.userData); // Set user data from the token
      } catch (error) {
        console.error("Error decoding token:", error);
        removeCookie('_vercel_jwt', { path: '/' }); // Remove invalid token
      }
    }
  }, [cookies._vercel_jwt, removeCookie]);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const ForgotButton = () => {
    navigate("/forgotpassword");
    handleCloseLogin();
  };

  const toggleSearch = () => {
    navigate("/product");
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const userLoginData = { email, password };

    // Start the loading bar
    loadingBarRef.current.continuousStart();

    try {
      const res = await axios.post("https://shopping-web-kid-s-be.onrender.com/auth/login", userLoginData, {
        withCredentials: true,
      });
      console.log(res.data);
      toast.success(res.data.message);
      handleCloseLogin();

      // Complete the loading bar
      loadingBarRef.current.complete();

      // window.location.reload()
      
      navigate("/product");

    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Login failed");

      // Complete the loading bar on error
      loadingBarRef.current.complete();
    }
  };

  const handleSubmitRegister = async () => {
    const userData = { name, email, password, confirmPassword };

    // Start the loading bar
    loadingBarRef.current.continuousStart();

    try {
      const res = await axios.post("https://shopping-web-kid-s-be.onrender.com/auth/register", userData, {
        withCredentials: true,
      });
      console.log(res.data);
      toast.success(res.data.message);

      // Complete the loading bar
      loadingBarRef.current.complete();

      // Open the login modal after successful registration
      handleShowLogin();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Registration failed");

      // Complete the loading bar on error
      loadingBarRef.current.complete();
    }
  };

  const handleLogout = () => {
    removeCookie('_vercel_jwt', { path: '/' });
    setUser(null);
    navigate("/");
  };

  return (
    <header className="header">
      {/* Top Header */}
      <div className="top-header d-none d-sm-none d-md-none d-lg-block">
        <div className="line d-flex justify-content-around">
          <marquee behavior="" direction="left" scrollAmount="12" width="100%">
            FREE DELIVERY ON FRIST ORDERS OVER ₹5000
          </marquee>
          <marquee behavior="" direction="left" scrollAmount="12">
            FREE DELIVERY ON FRIST ORDERS OVER ₹5000  
          </marquee>
          <marquee behavior="" direction="left" scrollAmount="12">
            FREE DELIVERY ON FRIST ORDERS OVER ₹5000
          </marquee>
        </div>
      </div>

      <LoadingBar color="#fff" height={3} ref={loadingBarRef} />

      {/* Bottom Header */}
      <div className="bottom-header">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* Left Section */}
            <div className="col-2 p-0 col-sm-4 col-md-4 col-lg-4">
              <div className="left">
                <button
                  className="btn d-block d-sm-block d-md-block d-lg-none text-black"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasScrolling"
                >
                  <span>
                    <img src="https://cdn-icons-png.flaticon.com/512/5036/5036960.png" height={40}  alt="" />
                  </span>
                </button>
                <nav className="d-none d-sm-none d-md-none d-lg-block">
                  <ul className="list-unstyled d-flex p-2">
                    <li className="pe-4 pt-2 ps-4">
                      <a href="secound.html" className="nav-link p-0 nav-a">
                        Hair Type
                      </a>
                      <div className="nav-hov justify-content-evenly gap-3 w-100">
                        {/* Dropdown content */}
                      </div>
                    </li>
                    <li className="pe-4 pt-2">
                      <a href="" className="nav-link p-0 nav-a">
                        Hair Concern
                      </a>
                      <div className="nav-hov justify-content-evenly gap-3 w-100">
                        {/* Dropdown content */}
                      </div>
                    </li>
                    <li className="pe-4 pt-2">
                      <a href="product.html" className="nav-link p-0 nav-a">
                        Products
                      </a>
                      <div className="nav-hov justify-content-evenly gap-3 w-100 pe-5">
                        {/* Dropdown content */}
                      </div>
                    </li>
                    <li className="pe-4 pt-2">
                      <a href="pet.html" className="nav-link p-0 nav-a">
                        Pet Teezer
                      </a>
                      <div className="nav-hov justify-content-evenly gap-3 w-100">
                        {/* Dropdown content */}
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Center Section */}
            <div className="col-7 col-sm-4 col-md-4 col-lg-4 p-0">
              <div className="center text-center">
                <a href="/">
                  <img src="https://images.ctfassets.net/dvf03q5b4rnw/6n4pfghgiGacCYkeg5M8Gc/aa0f131417aff2e41c11c963417ba548/babyshop_logo.svg?w=537&h=173&q=80" alt="Logo" height={48} width={150} />
                </a>
              </div>
            </div>

            {/* Right Section */}
            <div className="col-3 p-0 col-sm-4 col-md-4 col-lg-4">
              <div className="right">
                <nav>
                  <ul className="list-unstyled d-flex p-2 justify-content-end ">
                    <li className="pe-3 pt-2">
                      <button
                        onClick={toggleSearch}
                        style={{ backgroundColor: "transparent", border: "none" }}
                      >
                        <img
                          src="https://intenship-project-fe.vercel.app/img/icon-1.png"
                          id="flip"
                          alt="Search"
                        />
                      </button>
                    </li>
                    <li className="pe-4 pt-2">
                      <a href="Cart.html">
                        <img src="https://intenship-project-fe.vercel.app/img/icon-3.png" alt="Cart" />
                      </a>
                    </li>
                    <li className="pe-4 pt-2 d-none d-sm-none d-md-none d-lg-block">
                      {user ? (
                        <div className="dropdown">
                          <div >
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG1dXcbGQTvqLXLBEQnr3S2ta1flJNUUc6kw&s" height={45} alt="user"/>
              </div>
              <button
                className="btn dropdown-toggle p-0"
                type="button"
                id="dropdownMenuButtonOffcanvas"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                            {user.name}
                          </button>
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><span className="dropdown-item">{user.email}</span></li>
                            <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                          </ul>
                        </div>
                      ) : (
                        <a href="#" onClick={handleShowLogin}>
                          <img src="https://intenship-project-fe.vercel.app/img/icon-2.png" alt="Login" />
                        </a>
                      )}
                    </li>

                    {/* Login Modal */}
                    <Modal show={showLogin} onHide={handleCloseLogin}>
                      <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                          </Form.Group>
                          <Button variant="link" onClick={ForgotButton}>
                            Forgot Password ?
                          </Button>
                          <Button variant="link" onClick={handleShowRegister}>
                            Do You Not have Account?
                          </Button>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseLogin}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmitLogin}>
                          Submit
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    {/* Register Modal */}
                    <Modal show={showRegister} onHide={handleCloseRegister}>
                      <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
                          </Form.Group>
                          <Button variant="link" onClick={handleShowLogin}>
                            Login Here
                          </Button>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseRegister}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmitRegister}>
                          Submit
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offcanvas Menu */}
      <div
  className="offcanvas offcanvas-start w-75"
  data-bs-scroll="true"
  data-bs-backdrop="false"
  tabIndex="-1"
  id="offcanvasScrolling"
  aria-labelledby="offcanvasScrollingLabel"
>
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Menu Bar</h5>
    <button
      type="button"
      className="btn-close text-reset"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
    ></button>
  </div>
  <div className="offcanvas-body">
    <nav>
      <ul className="list-unstyled p-2">
        {/* Conditionally render profile dropdown or login button */}
        <li className="pe-4 pt-2 d-block d-sm-block d-md-block d-lg-none">
          {user ? (
            <div className="dropdown">
              <div >
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG1dXcbGQTvqLXLBEQnr3S2ta1flJNUUc6kw&s" height={45} alt="user"/>
              </div>
              <button
                className="btn dropdown-toggle p-0"
                type="button"
                id="dropdownMenuButtonOffcanvas"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user.name}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonOffcanvas">
                <li>
                  <span className="dropdown-item">{user.email}</span>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <a href="#" className="text-decoration-none text-black" onClick={handleShowLogin}>
              <img src="https://intenship-project-fe.vercel.app/img/icon-2.png" alt="Login" />
              <span>Login/Register</span>
            </a>
          )}
        </li>

        {/* Other menu items */}
        <li className="pe-4 pt-2">
          <a href="secound.html" className="nav-link p-0">
            Hair Type
          </a>
        </li>
        <li className="pe-4 pt-2">
          <a href="" className="nav-link p-0">
            Hair Concern
          </a>
        </li>
        <li className="pe-4 pt-2">
          <a href="product.html" className="nav-link p-0">
            Products
          </a>
        </li>
        <li className="pe-4 pt-2">
          <a href="" className="nav-link p-0">
            Pet Teezer
          </a>
        </li>
      </ul>
    </nav>
  </div>
</div>
    </header>
  );
};

export default Navigation;