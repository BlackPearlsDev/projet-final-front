import { remove } from "../../../services/API/user";

function ManageUsers({listUsers}) {
    
    const handleDelete = async (e, uuid) => {
        e.preventDefault();
        console.log('uuid:', uuid);
        const res = await remove(uuid);
        if(res.status === 404) {
			console.log(res.data.msg);
			return;
		}
    }

    return (
        <section className="toolsAdmin">
            <h2>Gestion des utilisateurs</h2>

            <section className="allUsersAdmin">

                {listUsers.map((user, index) => {
                    return (
                        <article key={index} className="userLine">
                            <p>{user.email ? user.email : "non renseigné"}</p>
                            <p>{user.firstname ? user.firstname : "non renseigné"}</p>
                            <p>{user.lastname ? user.lastname : "non renseigné"}</p>

                            <button className='btnDeleteUser' onClick={(e) => handleDelete(e, user.uuid)}> Supprimer </button>
                        </article>
                    )
                })}
            </section>

        </section>
    )
}

export default ManageUsers;