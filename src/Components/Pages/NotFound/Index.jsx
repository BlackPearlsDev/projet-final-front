import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <main className="mainContent txtCenter">
            <h2>404 Not Found</h2>

            <p>La page que vous recherchez n'existe pas.</p>

            <Link to="/"><span className='txtLinkBlue'>Retour à l'accueil</span></Link>
        </main>
    )
}

export default NotFound;