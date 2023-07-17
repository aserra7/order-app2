import React, { useState } from 'react'
import { Button, Card, Container, Form, Image, Modal } from 'react-bootstrap'
import { formatCurrency } from '../utilities/formatCurrency'
import { useShoppingCart } from '../context/shoppingCartContext'

const FoodCard = ({ id, image, name, preu }) => {
    const { addToCart } = useShoppingCart()
    const [showPop, setShowPop] = useState(false)


    const handleClose = () => setShowPop(false)
    const handleShow = () => setShowPop(true)
    const [quantity, setQuantity] = useState(0)

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value)
        setQuantity(newQuantity)
    }

    const increaseQuantity = () => {
        if (!quantity) {
            setQuantity(1)
        } else {
            setQuantity(quantity + 1)
        }

    }

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
    }

    const resetQuantity = () => {
        setQuantity(0)
    }

    return (
        <>
            <Card className='h-100'>
                <Card.Img
                    variant='top'
                    src={image}
                    height='200px'
                    style={{ objectFit: 'cover' }}
                />
                <Card.Body className='d-flex flex-column'>
                    <Card.Title className='d-flex justify-content-between align-items-baseline my-2'>
                        <span className='fs-2'>{name}</span>
                        <span className='ms-2 text-muted'>{formatCurrency(preu)}</span>
                    </Card.Title>
                    <div className='mt-auto'>
                        <Button className='w-100 mt-2' onClick={handleShow}>Afegir</Button>
                    </div>
                </Card.Body>
            </Card>

            <Modal show={showPop} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={image} thumbnail className='mb-3' style={{ objectFit: 'cover', height: '300px', width: '100%' }} />
                    <div className='d-flex justify-content-between align-items-baseline mx-2'>
                        <span>Quantitat:</span>
                        <div className='d-flex justify-content-center'>
                            <Button className='btn-danger' onClick={decreaseQuantity}>-</Button>
                            <Form>
                                <Form.Control
                                    type='number'
                                    placeholder='0'
                                    value={isNaN(quantity) ? '' : String(quantity)}
                                    style={{ width: '4rem', marginLeft: '0.5rem', marginRight: '0.5rem', }}
                                    onChange={handleQuantityChange}
                                />
                            </Form>
                            <Button onClick={increaseQuantity}>+</Button>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-between align-items-baseline mx-2'>
                    <Button className='btn-danger' onClick={() => { handleClose(); resetQuantity(); }}>Cancelar</Button>
                    <Button
                        onClick={() => { addToCart(id, quantity); handleClose(); resetQuantity(); }}>Afegir</Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default FoodCard