import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToggle } from '../../../store/slices/menu.slice';

function Shop({categories, products}) {
    useEffect(() => {
        document.title = "Magasin - HYPER SHOP";
    }, [])
    
    const dispatch = useDispatch();
    const { isToggle } = useSelector((state) => ({...state.menu}));

    const [category, setCategory] = useState(0);

    const handleCategory = (e) => {
        setCategory(parseInt(e.target.value));
    }

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        console.log(`Ajout du produit ${product.title} au panier`);
        // Let's go store the product in the local storage and check if product already exist
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart === null) {
            cart = [];
        }
        let productAlreadyInCart = false;
        cart.forEach(item => {
            if (item.id === product.id) {
                productAlreadyInCart = true;
                console.log("Produit déjà dans le panier, on augmente la quantité");
                item.quantity++;
            }
        });
        if (!productAlreadyInCart) {
            cart.push({...product, quantity: 1});
            console.log("Produit ajouté au panier");
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    return (
        <main>
            <div className={isToggle ? "overlay" : undefined} onClick={() => dispatch(setToggle(!isToggle))}></div>
            <section className='mainContent'>
                <h2>Nos produits</h2>

                <section className='selector'>
                    <select name="category" id="category-select" onChange={handleCategory} value={category}>
                        <option value="0">Toutes les catégories</option>
                        {
                            categories.map((category) => {
                                return (
                                    <option key={category.id} value={category.id}>{category.category_name}</option>
                                    );
                                })
                            }
                    </select>
                </section>


                <section className='products'>
                    {
                        products.map((product) => {
                            return (category === product.category_id) && (
                                <article key={product.id} className='productCard'>
                                    <img src={`images/${product.image_name}`} alt={product.title} />
                                    <h3>{product.title}</h3>
                                    <p className='txtContent'>{product.description}</p>
                                    <div className='txtPriceQuantity'>
                                        <p><span className='txtBlue'>{product.price}</span>€</p>
                                        <p>Disponible: <span className='txtBlue'>{product.quantityInStock}</span></p>
                                    </div>

                                    <div className='flex-btn-card'>
                                        <Link to={`/product/${product.id}`} className='btnAddCart btnReadMore'>En savoir plus</Link>
                                        <button className='btnAddCart' onClick = {(e) => {handleAddToCart(e, product)}} value={product.id}> <FontAwesomeIcon icon={faCartPlus}/> </button>
                                    </div>
                                </article>
                            )
                        })
                    }
                </section>
            </section>
        </main>
    )
}

export default Shop;