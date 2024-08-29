import { Container, Receipt, HambMenu, Logout } from './styles';

import { IoMenuSharp } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { PiReceipt } from "react-icons/pi";
import { PiSignOut } from "react-icons/pi";
import { IoIosClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

import { Input } from '../../components/Input'
import { ButtonText } from '../../components/ButtonText'
import { Button } from '../../components/Button'
import { Brand } from '../Brand';

import { USER_ROLE } from '../../utils/roles'
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth'
import { useNavigate } from 'react-router-dom';

export function Header({ onOpenCart }){
    
    const [searchString, setSearchString] = useState("");

    const { signOut, user } = useAuth();
    
    const [ menu, setMenu ] = useState(false);

    const navigate = useNavigate();

    function handleSignOut(){
        navigate("/");
        signOut();
    }

    function handleSearch(event ){
        if (event.key === 'Enter') {
            toggleMenu();
            navigate(`/search-results/${searchString}`);

        }
    }

    const toggleMenu = () => {
        setMenu((open) => !open);
    };

    return(
        <Container>

            {/* If Admin logged in adjust header className */}
            <div className={` header ${user.role === USER_ROLE.ADMIN && "admin"}`}>
                <HambMenu type="button" onClick={toggleMenu}>
                    <IoMenuSharp/> 
                </HambMenu>

                <Brand width={2} height={2} fontSize={1.5} pColor={"#065E7C"}/>

                <Input
                    placeholder="Search for dishes or ingredients"
                    onChange={e => setSearchString(e.target.value)}
                    onKeyDown={handleSearch} // Triggers search only on Enter key press
                    icon={CiSearch}
                />

                {
                    [USER_ROLE.CUSTOMER].includes(user.role) &&
                    <Receipt type="button" onClick={onOpenCart}>
                        <span>0</span>
                        <IoCart />
                        <p>Cart <span>(0)</span></p>
                    </Receipt>
                }
                {
                    [USER_ROLE.ADMIN].includes(user.role) &&
                    <>
                        <Button
                            className="new-dish"
                            title="New dish"
                            onClick={() => navigate("/new-dish")}
                        />
                    </>
                }
                <button className='sign-out' onClick={handleSignOut}>
                    <PiSignOut/>
                </button>

            </div>

            <div className={`menu ${menu ? "open" : "closed"}`}>
                <div className='top'>
                    <button>
                        <IoIosClose onClick={toggleMenu}/>
                    </button>
                    <h1> Menu</h1>
                </div>
                <div className='bottom'>
                    <Input
                        placeholder="Search for dishes or ingredients"
                        onChange={e => setSearchString(e.target.value)}
                        onKeyDown={handleSearch} // Triggers search only on Enter key press
                        icon={CiSearch}
                    />
                    <ul>
                            {
                                //[USER_ROLE.ADMIN, USER_ROLE.CUSTOMER].includes(user.role) &&
                                user.role === USER_ROLE.ADMIN &&
                                <li>
                                    <ButtonText
                                        onClick={() => navigate('/new-dish')}
                                        title="New dish"
                                    />  
                                </li>
                            }
                        
                        <li>
                            <ButtonText
                                onClick={handleSignOut}
                                title="Logout"
                            />    
                        </li>
                    </ul>
                </div>

            </div>
            
        </Container>
    )
}
