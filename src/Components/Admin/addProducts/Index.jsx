import { useState, useRef } from 'react';
import { validate } from "../../../Helpers/sanitize";
import { addProducts, addImg } from "../../../services/API/product";

function AddProducts({categories}) {

    const [product, setProduct] = useState({title: '', description: '', image_name: null, quantityInStock: '', price: '', category_id: ''});
    const fileInput = useRef();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
        // mettre a jour l'image avec fileInput.current.files[0]
        // setImage(fileInput.current.files[0]);
    }
    
    const handleSubmit = async (e) => {
        const formData = new FormData();
        e.preventDefault();
        if (product.image_name) {
            formData.append('image', product.image_name);
            const res1 = await addImg(formData);
            if (res1.status === 200) {
                const inputsSanitized = validate(product);
                const datas = {
                    ...inputsSanitized,
                    image_name : res1.data.url,
                }
                const res2 = await addProducts(datas);
                if (res2.status === 200) {
                    console.log('product added');
                }
            } else {
                console.log('error');
            }
        } else {
            const inputsSanitized = validate(product);
            const res = await addProducts(inputsSanitized);
            if (res.status === 200) {
                console.log('product added');
            }
        }
    }

    return (
        <section className="toolsAdmin">
            <form onSubmit={handleSubmit} id="formAddProduct">
                <label htmlFor="title">Nom du produit</label>
                <input type="text" name="title" id="title" onChange={(e) => handleChange(e)}/>

                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" cols="30" rows="10" onChange={(e) => handleChange(e)}></textarea>

                <label htmlFor="image_name">Image</label>
                <input type="file" name="image_name" id="image_name" ref={fileInput} onChange={(e) => setProduct({...product, image_name: fileInput.current.files[0]})}/>

                <label htmlFor="quantityInStock">Quantité en stock</label>
                <input type="number" name="quantityInStock" id="quantityInStock" onChange={(e) => handleChange(e)}/>

                <label htmlFor="price">Prix</label>
                <input type="number" name="price" id="price" onChange={(e) => handleChange(e)}/>

                <label htmlFor="category_id">Catégorie</label>
                <select name="category_id" id="category_id" onChange={(e) => handleChange(e)}>
                    <option value="0">Choisir une catégorie</option>
                    {
                        categories.map((category) => {
                            return (
                                <option key={category.id} value={category.id}>{category.category_name}</option>
                            );
                        })
                    }
                </select>

                <button type="submit" className='btnAdd marginElem'>Ajouter</button>
            </form>
        </section>
    )
}

export default AddProducts;