import { PageSection } from '../../components/PageSection';
import { Header } from '../../components/Header';
import { Bottom } from '../../components/Bottom';
import { Cart } from '../../components/Cart';
import { Container } from './styles';

import picturePlaceholder from '../../assets/plates/Mask-group-1.png'
import { IoIosArrowRoundForward } from "react-icons/io";

import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useState, useEffect } from 'react';

export function Favorites(){
    const [ dishes, setDishes ] = useState([]);
    const [ cartIsOpen, setCartIsOpen ] = useState(false);

    const navigate = useNavigate();

    function handleDishDetails(dishId){
        navigate(`/dish-details/${dishId}`)
    }

    useEffect(() => {
        async function fetchDishes(){
            const response = await api.get(`/userFavorites`);
            setDishes(response.data);
        }
        fetchDishes();
    }, []);

    async function removeFromFavs(id, dishObj){
        try{
            await api.delete(`userFavorites/${id}`);

            setDishes(prevState => prevState.filter(dish => dish !== dishObj));
        }
        catch(error){
            alert(`Something went wrong while trying to remove this dish`)
        }
    }

    return(
        <Container>
            <Cart 
                cartIsOpen={cartIsOpen} 
                onCloseCart={() => setCartIsOpen(false)}
            />
            <Header onOpenCart={() => setCartIsOpen(true)}/>
            <main>
                <PageSection title="My favorites"/>
                <div className='dishes'>
                    {
                        dishes && dishes
                            .map(dish =>(
                                <div key={dish.id} className='fav-dish-card'>
                                    <img src={dish.picture ? `${api.defaults.baseURL}/files/${dish.picture}` : picturePlaceholder} alt="" />
                                    <div>
                                        <button onClick={() => handleDishDetails(dish.id)}>{dish.name} <IoIosArrowRoundForward/></button>
                                        <button onClick={() => removeFromFavs(dish.id, dish)}>Remove from favorites</button>
                                    </div>
                                </div>
                            ))
                    }
                </div>
            </main>
            <Bottom/>
        </Container>
    )
}