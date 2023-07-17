import { Button, Modal, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/shoppingCartContext'
import { formatCurrency } from '../utilities/formatCurrency';
import { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';
import connection from '../database/connection';

export function CartItem({ id, quantity }) {
    const [showModal, setShowModal] = useState(false)

    const handleClose = () => setShowModal(false)
    const handleShow = () => setShowModal(true)

    const handleRemoveItem = () => {
        setTimeout(() => {
            removeFromCart(id);
        }, 200); // Retardo de 300 milisegundos (ajusta el valor según la duración de la transición del modal)

        handleClose();
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore(connection);
            const producteCol = collection(db, 'productes')
            const producteSnapshot = await getDocs(producteCol)
            const producteList = producteSnapshot.docs.map(doc => doc.data());
            setData(producteList)
        }

        fetchData();
    }, [])

    const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();
    const item = data.find(menjar => menjar.id === id)
    if (item == null) return null

    return (
        <>
            <Stack direction='horizontal' gap={2} className='d-flex'>
                <img
                    src={item.imatge}
                    style={{ width: '125px', height: '80px', objectFit: 'cover' }}
                    alt='tranquila pequeña'
                />

                <div className='me-auto'>
                    <div>
                        <h5>{item.nom}</h5>
                    </div>
                    <div className='text-muted' style={{ fontSize: '.75rem' }}>{formatCurrency(item.preu)}</div>
                </div>
                <div>{formatCurrency(item.preu * quantity)}</div>
                <div>
                    <Button
                        onClick={() => increaseCartQuantity(id)}
                        style={{ width: '2rem', height: '1.5rem', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>+</Button>
                    <div className='my-1' style={{ textAlign: 'center', }}>
                        {isNaN(quantity) ? '' : String(quantity)}
                    </div>
                    <Button
                        variant='danger'
                        onClick={() => quantity > 1 ? decreaseCartQuantity(id) : handleShow()}
                        style={{ width: '2rem', height: '1.5rem', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>-</Button>
                </div>

            </Stack>
            <Modal show={showModal} centered>
                <Modal.Header><Modal.Title>Vols eliminar?</Modal.Title></Modal.Header>
                <Modal.Body>Vols eliminar aquest producte de la cistella?</Modal.Body>
                <Modal.Footer>
                    <Button variant='default' onClick={() => handleClose()}>Cancelar</Button>
                    <Button variant='danger' onClick={() => { handleRemoveItem() }}>Eliminar</Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}