import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../services/API/product";
import { getCategories } from "../services/API/category";
import Error from "../Components/Error";
import { loadProducts } from "../store/slices/product.slice";
import { loadCategories } from "../store/slices/category.slice";
import { checkToken } from "../services/API/user";
import { login, logout } from '../store/slices/user.slice';

function HOC({ child, isAuthRequired }) {
    const navigate = useNavigate();

    const [fetchError, setFetchError] = useState(false);
    
    const dispatch = useDispatch();
    const { list, userInfos, isLogged, listCategories } = useSelector((state) => ({...state.products, ...state.user, ...state.categories}));

    useEffect(() => {
        if (!list.length) {
            async function fetchData() {
                const res = await getProducts();
                if (res.code) {
                    setFetchError(true);
                    return;
                }
                dispatch(loadProducts(res.data.result));
            }
            fetchData();
        } 
    }, [dispatch, list.length]);
    // }, []); // DEFAULT

    useEffect(()=>{
        async function checkAuth(){
            // on récupère le token du LS placé à la connexion de l'user (voir composant login)
            const TOKEN = localStorage.getItem("auth_token");

            // si la route nécessite une authentification et que le TOKEN n'est pas présent dans le local storage on effectue une déconnexion de l'user dans le store puis on redirige sur le home
            if(isAuthRequired && !TOKEN){
                dispatch(logout());
                navigate("/");
            }

            
            // si l'user n'est pas connecté (state globale dans notre store pas à jour)
            if(!isLogged) {
                // et qu'une authentification est requise on le redirige vers le home
                if(isAuthRequired) navigate("/");
                // ou si le localstorage contient un token
                if(TOKEN !== null){
                    // on effectue une requête pour vérifier l'exactitude du token et récupérer les infos de l'user
                    const res = await checkToken(TOKEN);
                    console.log(res)
                    if(res.status === 200){
                        // si c'est ok, on mets à jour les states du slice user 
                        dispatch(login(res.data.result));
                    }
                }
            }
        }
        checkAuth();
    }, [dispatch, isLogged, isAuthRequired, navigate]);
    // }, []); // DEFAULT

    useEffect(() => {
        if (!listCategories.length) {
            async function fetchData() {
                const res = await getCategories();
                if (res.code) {
                    setFetchError(true);
                    return;
                }
                dispatch(loadCategories(res.data.result));
            }
            fetchData();
        }
    }, [dispatch, listCategories.length]);


    const Child = child;

    if (fetchError) {
        return <Error />;
    }

    return (
        <>
            {!list.length ? (
                <p>loading ...</p>
            ) : (
                    <Child products={list} userInfos={userInfos} categories={listCategories}/>
            )}
        </>
    );
}

export default HOC;
