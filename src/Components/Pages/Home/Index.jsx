import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToggle } from '../../../store/slices/menu.slice';

function Home() {
    useEffect(() => {
        document.title = "Accueil - HYPER SHOP";
    }, [])
    
    const dispatch = useDispatch();
    const { isToggle } = useSelector((state) => ({...state.menu}));
    // fetch image from API
    const [image, setImage] = useState('');

    useEffect(() => {
        fetch('/images/slider/900x400.png')
            .then(res => res.url)
            .then(url => setImage(url))
    }, []);



    return (
        <main>
            <div className={isToggle ? "overlay" : undefined} onClick={() => dispatch(setToggle(!isToggle))}></div>

            <section className='mainContent'>
                <section id="slider">
                    <img src={image} alt="slider" />
                </section>

                <h2>Bienvenue sur <span className='txtOswald txtBlue'>HYPER SHOP</span>, le site de réference.</h2>
            </section>
        </main>
    )
}

export default Home;