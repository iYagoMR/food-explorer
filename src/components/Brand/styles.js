import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
    display: ${({ isclosed }) => (isclosed ? 'none' : 'flex')};
    gap: 12px;
    align-items: center;

    > h1 {
        font-family: "Roboto", sans-serif;
        color: ${({ theme }) => theme.COLORS.LIGHT_100};
    }
    h2 {
        font-size: 1rem;
        color: ${({theme}) => theme.COLORS.CAKE_200};
        font-weight: 400;
    }
    h3{
        font-size: 1.4rem;
        color: ${({theme}) => theme.COLORS.CAKE_200};
        font-weight: 400;
    }
`;