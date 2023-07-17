import { createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";
import connection from "../database/connection";
import { collection, doc, getCount, getFirestore, setDoc } from "firebase/firestore/lite";


const ShoppingCartContext = createContext({});

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}



export function ShoppingCartProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useLocalStorage('shopping-cart', []);


    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);
    const countCartItems = cartItems.length

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getItemQuantity(id) {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    async function sendOrder() {
        const db = getFirestore(connection)
        const orders = collection(db, 'orders');
        const snapshot = await getCount(orders)
        console.log('count: ', snapshot.data().count)
        const id = snapshot.data().count + 1

        const productes = cartItems.map((obj) => { return Object.assign({}, obj) })

        const proj = {
            id: id,
            productes: productes.slice(1)
        }

        setDoc(doc(db, 'orders', `order${id}`), proj)

        setCartItems([])
    }

    function increaseCartQuantity(id) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }];
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    }
    function addToCart(id, quantity) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity }];
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + quantity };
                    } else {
                        return item;
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id);
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    function removeFromCart(id) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id);
        });
    }

    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            addToCart,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            openCart,
            closeCart,
            cartItems,
            cartQuantity,
            countCartItems,
            sendOrder
        }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    );
}