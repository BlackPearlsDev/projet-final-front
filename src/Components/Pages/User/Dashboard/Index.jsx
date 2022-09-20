import { useEffect, useState } from 'react';
import { update } from "../../../../services/API/user";
import { useDispatch, useSelector } from 'react-redux';
import { setToggle } from '../../../../store/slices/menu.slice';

function Dashboard({userInfos}) {
    useEffect(() => {
        document.title = "Mon compte - HYPER SHOP";
    }, [])

    const dispatch = useDispatch();
    const { isToggle } = useSelector((state) => ({...state.menu}));

    const [inputs, setInputs] = useState({ alias: userInfos?.alias, firstname: userInfos?.firstname, lastname: userInfos?.lastname, address: userInfos?.address , zip: userInfos?.zip, city: userInfos?.city, phone: userInfos?.phone});

    const handleUpdate = async(e) => {
        e.preventDefault();
        const res = await update(userInfos.uuid, inputs);
        if(res.status === 404) {
			console.log(res.data.msg);
			return;
		}
    };

    return (
        <main>
            <div className={isToggle ? "overlay" : undefined} onClick={() => dispatch(setToggle(!isToggle))}></div>

            <section className='mainContent'>
                <h2>Mes informations</h2>

                <form onSubmit={handleUpdate}>

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={userInfos?.email} disabled />
                    
                    <label htmlFor="alias">Alias</label>
                    <input type="text" id="alias" value={inputs.alias ? inputs.alias : "A remplir"} onChange={(e) => setInputs({...inputs, alias: e.target.value})} />

                    <label htmlFor="firstname">Prénom</label>
                    <input type="text" id="firstname" value={inputs.firstname ? inputs.firstname : "A remplir"} onChange={(e) => setInputs({...inputs, firstname: e.target.value})} />

                    <label htmlFor="lastname">Nom</label>
                    <input type="text" id="lastname" value={inputs.lastname ? inputs.lastname : "A remplir"} onChange={(e) => setInputs({...inputs, lastname: e.target.value})} />

                    <label htmlFor="address">Adresse</label>
                    <input type="text" id="address" value={inputs.address ? inputs.address : "A remplir"} onChange={(e) => setInputs({...inputs, address: e.target.value})} />

                    <label htmlFor="zip">Code postal</label>
                    <input type="number" id="zip" value={inputs.zip ? inputs.zip : "00000"} onChange={(e) => setInputs({...inputs, zip: e.target.value})} />

                    <label htmlFor="city">Ville</label>
                    <input type="text" id="city" value={inputs.city ? inputs.city : "A remplir"} onChange={(e) => setInputs({...inputs, city: e.target.value})} />

                    <label htmlFor="phone">Téléphone</label>
                    <input type="tel" id="phone" value={inputs.phone ? inputs.phone : "A remplir"} onChange={(e) => setInputs({...inputs, phone: e.target.value})} />
                    
                    <input type="submit" value="Mettre à jour" />

                </form>
            </section>
        </main>
    )
}

export default Dashboard;