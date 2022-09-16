import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
    const { isLogged, userInfos } = useSelector((state) => ({ ...state.user }));

    const [widthScreen, setWidthScreen] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidthScreen(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return (
        <nav>
            {widthScreen > 1000 ? (
                <>
                <Link to="/">Accueil</Link>
                <Link to="/product">Magasin</Link>
                {!isLogged ? (
                    <Link to="/login">Connexion</Link>
                    ) : (
                        <>
                        <Link to={`user/${userInfos.uuid}`}>Mon compte</Link>
                        <Link to="/cart">Panier</Link>
                        {
                            userInfos.role_id === 1 ? (null) : <Link to="/admin">Admin</Link>
                        }
                        <Link to="/logout"> Déconnexion </Link>
                        </>
                )}
                </>
                ) : (
                    <>
                    <Link to="/">Accueil</Link>
                    <Link to="/product">Magasin</Link>
                    {!isLogged ? (
                        <Link to="/login">Connexion</Link>
                        ) : (
                            <>
                            <Link to={`user/${userInfos.uuid}`}>Mon compte</Link>
                            <Link to="/cart">Panier</Link>
                            {
                                userInfos.role_id === 1 ? (null) : <Link to="/admin">Admin</Link>
                            }
                            <Link to="/logout"> <FontAwesomeIcon icon={faRightFromBracket} /> </Link>
                            </>
                    )}
                    </>
                )}     
        </nav>
    )
}

export default NavBar;