import { Container, Banner, DishSection } from './styles';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

import { DishCard } from '../../components/DishCard';
import { Bottom } from '../../components/Bottom'
import { Header } from '../../components/Header';
import { FaArrowRight } from "react-icons/fa";

import BannerImg from '../../assets/banner-img.png'

import dishPlaceholderImg from '../../assets/plates/Mask-group-10.png'
import { Cart } from '../../components/Cart';

export function Home(){
    const [ search, setSearch ] = useState("");
    const [ ingredientsSelected, setIngredientsSelected ] = useState([]);
    const [ dishes, setDishes ] = useState([]);
    const [ cartIsOpen, setCartIsOpen ] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchDishes(){
            const response = await api.get(`/dishes?name=${search}&ingredients=${ingredientsSelected}`);
            setDishes(response.data);
            console.log(response);
        }
        fetchDishes();
    }, [ingredientsSelected, search]);

    async function handleFavoriteToggle(id){

        try{
            const dish = await api.get(`/dishes/${id}`);

            let favDish;
            try {
                // Try to get the favorite dish
                favDish = await api.get(`/userFavorites/${dish.data.id}`);
            } catch (error) {
                // Handle the 404 error specifically
                if (error.response && error.response.status === 404) {
                    favDish = null; // If dish is not found, set favDish to null
                } else {
                    throw error; // Re-throw other errors to be handled by the outer catch
                }
            }

            if(favDish == null){
                await api.post(`/userFavorites/${dish.data.id}`);
            }
            else{
                await api.delete(`/userFavorites/${favDish.data.id}`);  
            }
        }
        catch(error){
            alert("Something went wrong while trying to add or remove favorite dish.")
            console.log(error)
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
                <Banner>
                    <img src={BannerImg} alt="banner image showing french macarons, strawberries and bluebeeries" />
                    <div>
                        <h2>Unparalleled flavors</h2>
                        <p>Feel the care of the preparation with selected ingredients.</p>
                    </div>
                </Banner>
                <div className='sections'>
                    <DishSection>
                        <h2>Meals</h2>
                        <div>
                        {
                            dishes && dishes
                                .filter(dish => dish.category == "meal")
                                .map(dish => (
                                    <DishCard 
                                        addFavBtn={() => handleFavoriteToggle(dish.id)}
                                        key={String(dish.id)}
                                        data={dish}
                                    />
                                ))
                        }
                        </div>
                    </DishSection>
                    <DishSection>
                        <h2>Salads</h2>
                        <div>
                            {
                                dishes && dishes
                                    .filter(dish => dish.category == "salad")
                                    .map(dish => (
                                        <DishCard 
                                            addFavBtn={() => handleFavoriteToggle(dish.id)}
                                            key={String(dish.id)}
                                            data={dish}
                                        />
                                    ))
                            }
                        </div>
                    </DishSection>
                    <DishSection>
                        <h2>Desserts</h2>
                        <div>
                            {
                                dishes && dishes
                                    .filter(dish => dish.category == "dessert")
                                    .map(dish => (
                                        <DishCard 
                                            addFavBtn={() => handleFavoriteToggle(dish.id)}
                                            key={String(dish.id)}
                                            data={dish}
                                        />
                                    ))
                            }
                        </div>
                    </DishSection>
                </div>
            </main>
            <Bottom/>
        </Container>
    )
}