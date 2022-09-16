import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToggle } from '../../../../store/slices/menu.slice';

function Cart({userInfos}) {
    useEffect(() => {
        document.title = "Mon panier - HYPER SHOP";
    }, [])

    const dispatch = useDispatch();
    const { isToggle } = useSelector((state) => ({...state.menu}));

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));

    const handleDelete = (e, product) => {
        e.preventDefault();
        // delete the product from the cart in the local storage, if cart is empty, delete the cart
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart === null) {
            cart = [];
        }
        cart.forEach((item, index) => {
            if (item.id === product.id) {
                cart.splice(index, 1);
            }
        }
        );
        if (cart.length === 0) {
            localStorage.removeItem('cart');
        }
        else {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        setCart(cart);
    }

    const handlePurchase = (e) => {
        e.preventDefault();
        console.log("Achat des produits du panier");
        // delete the cart in the local storage
        // TODO: decrease the quantity of the products in the cart in the database !important
        // TODO: add the products in the cart to the user's orders in the database !important
        
        localStorage.removeItem('cart');
        setCart([]);
        console.log('cart after purchase', cart);
    }

    return (
        <main>
            <div className={isToggle ? "overlay" : undefined} onClick={() => dispatch(setToggle(!isToggle))}></div>

            <section className='mainContent'>
                <section className='cart'>
                    {(cart === null || cart.length === 0) && 
                    <section>
                        <p className='txtCenter'>Votre panier est vide {userInfos.firstname}.</p>
                        <Link to='/product' className='txtLinkBlue txtCenter'>Retourner à la boutique</Link>
                    </section>
                    }
                    {cart !== null && cart.map((product) => {
                        return (
                            <article key={product.id} className='productCard'>
                                <img src={`images/${product.image_name}`} alt={product.title} />
                                <h3>{product.title}</h3>
                                <p className='txtContent'>{product.description}</p>
                                <div className='txtPriceQuantity'>
                                    <p className='txtPrice'>Prix: <span className='txtBlue'>{product.price}</span> €</p>
                                    <p>Disponible: <span className='txtBlue'>{product.quantityInStock}</span></p>
                                </div>
                                <button className='btnDeleteCart' onClick = {(e) => {handleDelete(e, product)}} >Supprimer</button>
                            </article>
                        )
                    })}
                </section>
                <section className='cartTotal'>
                    <p>Vous avez <span className='txtBlue'>{cart.length}</span> produits dans votre panier <span className='txtBlue'>{userInfos.firstname}</span>.</p>
                    <button className='btnPurchase' onClick = {(e) => {handlePurchase(e)}} >Commander</button>
                </section>
            </section>
        </main>
    )
}

export default Cart;