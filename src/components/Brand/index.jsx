import { useAuth } from '../../hooks/auth'
import { Container } from './styles';
import { USER_ROLE } from '../../utils/roles';

export function Brand({ width, height, isclosed, fontSize, pColor, noAdminTag, demo }){
    const { signOut, user } = useAuth();

    return(
        <Container to="/" isclosed={isclosed}>
            <svg width={`${width}rem`} height={`${height}rem`} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.76367 0.240356L19.29 4.74036V13.7404L9.76367 18.2404L0.237392 13.7404V4.74036L9.76367 0.240356Z" fill={`${pColor}`}/>
            </svg>
            <h1 style={{ fontSize: `${fontSize}rem` }}>food explorer</h1>
            {
                !noAdminTag &&
                user?.role === USER_ROLE.ADMIN &&
                <h2>admin</h2>
            }
            {
                demo &&
                <h3>demo version</h3>
            }
        </Container>
    )
}