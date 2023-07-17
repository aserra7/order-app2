import { Offcanvas } from "react-bootstrap";

<Button variant='outline-danger' size='sm' onClick={() => removeFromCart(item.id)}>&times;</Button>


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

<Offcanvas.Body>
    <Stack gap={3}>
        {
            cartItems.map(item => (
                <CartItem key={item.id}{...item} />
            ))}

        <div className="ms-auto fw-bold fs-5">
            Total {formatCurrency(cartItems.reduce((total, cartItem) => {
                const item = menjars.find(item => item.id === cartItem.id)
                return total + (item?.preu || 0) * cartItem.quantity
            }, 0)
            )}
        </div>
    </Stack>
</Offcanvas.Body>

<Offcanvas.Body>
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <div>
      <Stack gap={3}>
        {cartItems.map(item => (
          <CartItem key={item.id} {...item} />
        ))}
      </Stack>
    </div>
    <div className="ms-auto fw-bold fs-5">
      Total {formatCurrency(
      cartItems.reduce((total, cartItem) => {
        const item = menjars.find(item => item.id === cartItem.id);
        return total + (item?.preu || 0) * cartItem.quantity;
      }, 0))}
    </div>
    <button className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>Botón</button>
  </div>
</Offcanvas.Body>
