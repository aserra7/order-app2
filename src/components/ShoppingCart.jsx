import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import { ReactComponent as ReactLogo } from '../assets/shoppingbasket.svg';
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore/lite";
import connection from "../database/connection";

export function ShoppingCart({ isOpen }) {

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
    const { closeCart, cartItems, sendOrder } = useShoppingCart()
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cistella</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cartItems.length < 1 ? (

                    <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <ReactLogo style={{ width: '50%', height: '25%', fill: 'gray', opacity: '0.50', marginTop: '-20rem' }} />
                        <h4 className="text-muted" style={{ textAlign: 'center', marginTop: '3rem' }}>La cistella esta buida</h4>

                    </div>
                ) : (
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', }}>
                        <div style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto', }}>
                            <Stack gap={3}>
                                {cartItems.map(item => (
                                    <CartItem key={item.id} {...item} />
                                ))}
                            </Stack>
                        </div>
                        <div className="d-flex align-items-baseline justify-content-between mt-3">
                            <div className="fw-bold fs-5" style={{ marginLeft: '1rem' }}>
                                Total {formatCurrency(
                                    cartItems.reduce((total, cartItem) => {
                                        const item = data.find(item => item.id === cartItem.id);
                                        return total + (item?.preu || 0) * cartItem.quantity;
                                    }, 0))}
                            </div>
                            <button className="btn btn-success" onClick={sendOrder} >Finalitza la Compra</button>

                        </div>
                    </div>


                )}
            </Offcanvas.Body>
        </Offcanvas>
    )
}