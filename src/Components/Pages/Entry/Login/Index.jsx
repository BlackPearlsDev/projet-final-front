import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "../../../../Helpers/sanitize";
import { login } from "../../../../services/API/user";
import { useDispatch, useSelector } from 'react-redux';
import { setToggle } from '../../../../store/slices/menu.slice';

function Login() {
    const dispatch = useDispatch();
    const { isToggle } = useSelector((state) => ({...state.menu}));

    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ email: "", password: "" });

    const handleLogin = async(e) => {
        e.preventDefault();
        console.log(inputs);
		const inputsSanitized = validate(inputs);
		const res = await login(inputsSanitized);
		console.log(res)
		if(res.status === 404) {
			console.log(res.data.msg);
			return;
		}
		localStorage.setItem("auth_token", res.data.token);
		navigate(`/user/${res.data.uuid}`);
    };

    return (
        <main>
            <div className={isToggle ? "overlay" : undefined} onClick={() => dispatch(setToggle(!isToggle))}></div>


            <section className='mainContent'>
                <h2>Connexion</h2>

                <form onSubmit={handleLogin}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={inputs.email} onChange={(e) => setInputs({...inputs, email: e.target.value})} />

                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})} />

                    <input type="submit" value="Se connecter" />
                </form>

                <p className="txtCenter">Pas de compte déjà créer ? Inscrit toi <Link to="/register" className="txtLinkBlue">ici</Link>.</p>

                <fieldset className="disclaimer">
                    <legend>Vos données sont précieuses</legend>
                    <p>Aucunes des données saisies ne seront enregistrées et revendues à des fins commerciales conformément aux lois et décisions régies par la RGPD.</p>
                </fieldset>
            </section>
        </main>
    )
}

export default Login;