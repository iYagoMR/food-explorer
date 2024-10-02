import { useState } from "react";
import { useAuth } from '../../hooks/auth';

import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';
import { Input } from '../../components/Input';
import { Brand } from '../../components/Brand';

import { GrUserAdmin } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";

import { Link } from 'react-router-dom';

import { Container, Form } from './styles';

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const { signIn, bypassLogin } = useAuth();
  
    function handleSignIn() {
        signIn({ email, password });
    }
  
    return (
      <Container>
        <Brand width={3} height={3} fontSize={2.5} pColor={"#065E7C"} demo={true}/>
        <Form>
            {/* Login commented out for demo purposes */}
            {/* <Input 
                placeholder="Example: jhon@email.com"
                type="text"
                label="Email"
                onChange={e => setEmail(e.target.value)}
            />
            <Input  
                placeholder="At least 6 characters"
                type="password"
                label="Password"
                onChange={e => setPassword(e.target.value)}
            />

            <Button 
                title="Login" 
                onClick={handleSignIn}
            />

            <Link to="/register">
                <ButtonText
                    title="Create account"
                />
            </Link> */}
            <Button 
                title="Customer" 
                icon={FaRegUser}
                onClick={() => bypassLogin("customer")}
            />
            <Button 
                title="Admin" 
                icon={GrUserAdmin}
                onClick={() => bypassLogin("admin")}
            />
            
            <h4>The login page was removed in this demo version of the application. You can choose if you want to view the app as a customer of admin.</h4>
        </Form>
      </Container>
    )
  }