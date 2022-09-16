import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "../../../../Helpers/sanitize";
import { register } from "../../../../services/API/user";
import { useDispatch, useSelector } from 'react-redux';
import { setToggle } from '../../../../store/slices/menu.slice';

function Register() {
    const dispatch = useDispatch();
    const { isToggle } = useSelector((state) => ({...state.menu}));

    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ email: "", password: "" });

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("inputs:", inputs);
        const inputsValidation = validate(inputs);
		if(inputsValidation === true) {
			const res = await register(inputs);
			if (res.status === 409) {
				console.log(res.data.msg);
				return;
			} else {
				navigate("/login");
			}
		} else {
			console.log('inputsValidation:', inputsValidation);
		}
    };

    return (
        <main>
            <div className={isToggle ? "overlay" : undefined} onClick={() => dispatch(setToggle(!isToggle))}></div>

            <section className='mainContent'>
                <h2>Enregistrement</h2>
                {console.log(window.location.pathname)}

                <form onSubmit={handleRegister}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={inputs.email} onChange={(e) => setInputs({...inputs, email: e.target.value})} />

                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})} />

                    <input type="submit" value="S'enregistrer" />
                </form>

                <p className="txtCenter">Déjà inscrit ? Connecte toi <Link to="/login" className="txtLinkBlue">ici</Link>.</p>
            </section>
        </main>
    )
}

export default Register;