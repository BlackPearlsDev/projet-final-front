import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setToggle } from '../../../../store/slices/menu.slice';

function Detail({ products }) {
    const dispatch = useDispatch();
    const { isToggle } = useSelector((state) => ({...state.menu}));

    const { id } = useParams();

    const product = products.find((product) => product.id === parseInt(id));

    return (
        <main>
            <div className={isToggle ? "overlay" : undefined} onClick={() => dispatch(setToggle(!isToggle))}></div>
            
            <section className='mainContent'>
                <h2>Detail du produit</h2>

                <section className="productDetail">
                    <img src={`/images/${product.image_name}`} alt={product.title} />
                    <h3>{product.title}</h3>
                    <p className="txtContent">{product.description}</p>

                    <div className="txtPriceQuantity">
                        <p><span className="txtBlue">{product.price}</span>€</p>
                        <p>Disponible: <span className="txtBlue">{product.quantityInStock}</span></p>
                    </div>

                    <button className='btnAddCart btnCartDetail'>Ajouter au panier</button>
                </section>

                <aside>
                    <p>Vous pouvez ajoutez ce produit à votre panier ou bien retourner consulter l'ensemble de nos produits</p>
                    <Link to="/product" className="txtLinkBlue">Retour aux produits</Link>
                </aside>
            </section>
        </main>
    )
}

export default Detail;