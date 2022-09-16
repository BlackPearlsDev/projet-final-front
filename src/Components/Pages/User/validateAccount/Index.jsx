import React from 'react';
import { Link } from 'react-router-dom';

function validateAccount() {
    return (
        <main>
            <h2>Validation de votre compte</h2>

            <p>Votre compte a bien été validé</p>

            <p>Vous pouvez maintenant vous connecter</p>

            <Link to="/login">Se connecter</Link>
        </main>
    )
}

export default validateAccount;