import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 73px;
    padding: 160px 25px 0 25px;

    max-width: 600px;
    margin: 0 auto;

    a{
        justify-content: center;
    }

    h4 {
        color: ${({theme}) => theme.COLORS.LIGHT_100};
        font-weight: 400;
    }

`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 32px;
    justify-content: center;
    align-items: center;
`;