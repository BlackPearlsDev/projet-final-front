import { useState } from 'react';
import { validate } from "../../../Helpers/sanitize";
import { addCategory } from "../../../services/API/category";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { deleteCategory } from "../../../services/API/category";

function AddCategories({categories}) {

    const [category, setCategory] = useState({category_name: ''});

    const handleChange = (e) => {
        e.preventDefault();
        setCategory({
            ...category,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputsSanitized = validate(category);
        const res = await addCategory(inputsSanitized);
        if(res.status === 404) {
			console.log(res.data.msg);
			return;
		}
    }

    const handleCategory = async (e) => {
        setCategory(parseInt(e.target.value));
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const res = await deleteCategory(category);
        if(res.status === 404) {
			console.log(res.data.msg);
			return;
		}
    }

    return (
        <section className='toolsAdmin'>
            <form onSubmit={handleSubmit} className="adminAddCategories">
                <label htmlFor="category_name">Nom de la catégorie</label>
                <input type="text" name="category_name" id="category_name" onChange={(e) => handleChange(e)}/>

                <button type="submit" className='btnAdd'> Ajouter <FontAwesomeIcon icon={faPlus} /> </button>
            </form>


            <section className='selector-delete-category'>
            <label htmlFor="delete-category">Supprimer une catégorie:</label>
                <select name="categories" id="categories-select" onChange={(e) => handleCategory(e)}>
                    <option value="0">Toutes les catégories</option>

                    {categories.map((category) => {
                        return (
                            <option key={category.id} value={category.id}>{category.category_name}</option>
                            );
                        })}
                </select>

                <button type="submit" className='btnDelete' onClick={(e) => handleDelete(e)}> Supprimer <FontAwesomeIcon icon={faMinus} /> </button>
            </section>
        </section>
    )
}

export default AddCategories;