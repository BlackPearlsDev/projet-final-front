import { useState, useEffect } from 'react';
import { deleteProduct } from '../../../services/API/product';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToggle } from '../../../store/slices/menu.slice';
import { Outlet } from 'react-router-dom';

function Panel({categories, products}) {
    useEffect(() => {
        document.title = "Admin - HYPER SHOP";
    }, [])

    const dispatch = useDispatch();
    const { isToggle } = useSelector((state) => ({...state.menu}));
    const [category, setCategory] = useState(0);
    const [widthScreen, setWidthScreen] = useState(window.innerWidth);
    const [toggleBtn, setToggleBtn] = useState(false);

    const handleToggle = () => {
        setToggleBtn(!toggleBtn);
    }

    useEffect(() => {
        const handleResize = () => setWidthScreen(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });


    const handleCategory = (e) => {
        setCategory(parseInt(e.target.value));
    }

    const handleDelete = (e) => {
        e.preventDefault();
        deleteProduct(e.target.value);
    }

    return (
        <main>
            <div className={isToggle ? "overlay" : undefined} onClick={() => dispatch(setToggle(!isToggle))}></div>

            <section className="mainContent">
                <h2>Panel admin</h2>

                <nav className='navAdmin'>
                    <Link to="addProducts" onClick={handleToggle}>Gérer les produits</Link>
                    <Link to="addCategories" onClick={handleToggle}>Gérer les catégories</Link>
                    <Link to="manageUsers">Gérer les utilisateurs</Link>
                </nav>
                {toggleBtn && <Outlet />}

                <section className='adminProductsZone'>
                    <h3>Tout les produits</h3>

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
                        
                    <section className='productsListAdmin'>
                        {
                            products.map((product) => {
                                return (category === product.category_id) && (
                                    <article className="adminCardProduct" key={product.id}>

                                    {widthScreen > 767 && (
                                        <picture>
                                            <source media="(min-width:767px)" srcSet={`images/${product?.image_name}`}/>
                                            <img src={product.image} alt={product.name} />
                                        </picture>
                                    )}
                                            

                                        <p><strong>{product.title}</strong></p>
                                        <p>Prix: <span className='txtBlue'>{product.price}</span>€</p>
                                        <p>Quantité: <span className='txtBlue'>{product.quantityInStock}</span></p>

                                        <button className='btnAdminProduct'>Modifier</button>
                                        <button className='btnAdminProduct' onClick={(e) => {handleDelete(e)}} value={product.id}>Supprimer</button>
                                    </article>
                                )
                            })
                        }
                    </section>
                </section>
            </section>
        </main>
    )
}

export default Panel;