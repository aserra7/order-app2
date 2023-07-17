import { useEffect, useState } from "react";
import { Button, Col, Container, Image, Navbar as NavbarBs, Offcanvas, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { categories } from "../assets/database/basedades";
import { useShoppingCart } from "../context/shoppingCartContext";

function Navbar() {
    const { openCart, cartQuantit, countCartItems } = useShoppingCart()

    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <NavbarBs sticky="top" className='bg-white shadow-sm mb-3'>
                <Container>
                    <Button
                        onClick={handleClose}
                        variant="outline-secondary"
                        style={{ width: '4rem', height: '4rem', position: 'relative' }}
                        className="d-flex justify-content-center align-items-center"
                    >
                        <svg viewBox="0 0 100 80" width="40" height="40">
                            <rect width="100" height="20"></rect>
                            <rect y="30" width="100" height="20"></rect>
                            <rect y="60" width="100" height="20"></rect>
                        </svg>
                    </Button>
                    <Link to='/'>
                        <NavbarBs.Brand ><img src={require("../assets/logo.png")} alt="imatge" style={{ width: '8rem' }} /></NavbarBs.Brand>
                    </Link>


                    <Button
                        onClick={openCart}
                        style={{ width: '4rem', height: '4rem', position: 'relative' }}
                        variant="outline-primary"
                        className="rounded-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" /></svg>
                        <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                            style={{
                                color: 'white',
                                width: '2rem',
                                height: '2rem',
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                transform: 'translate(25%, 25%)'
                            }}>
                            {countCartItems}
                        </div>
                    </Button>
                </Container>

            </NavbarBs>
            <Offcanvas show={isOpen} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><h1>Categories</h1></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body style={{ marginRight: '1rem' }}>
                    <Container>
                        {categories.map((categoria) => (
                            <Link to={`/category/${categoria.name}`} style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleClose}>
                                <div className="d-flex align-items-baseline justify-content-between my-2">
                                    <div>
                                        <Image src={categoria.image} fluid className="small-image" style={{ height: '70px', objectFit: 'cover' }} />
                                    </div>
                                    <div>
                                        <h3>{categoria.name}</h3>
                                    </div>
                                </div>
                                <hr />
                            </Link>
                        ))}
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>

    )
}

export default Navbar