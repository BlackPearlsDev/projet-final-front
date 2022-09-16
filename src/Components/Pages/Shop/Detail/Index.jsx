import { Link, useParams } from "react-router-dom";

function Detail({ products }) {
    const { id } = useParams();
    console.log('id', id);

    const product = products.find((product) => product.id === parseInt(id));
    console.log('product', product);


    console.log(`images/${product.image_name}`);

    return (
        <main>
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
        </main>
    )
}

export default Detail;