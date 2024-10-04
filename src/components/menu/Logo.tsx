import styled from 'styled-components';
import JustFinLogo from '../../assets/justfin_50.png';

const StyledLogo = styled.div`
    background-image: url(${JustFinLogo});
    width: 50px;
    height: 50px;
`;

const Logo = () => <StyledLogo />;

export default Logo;
