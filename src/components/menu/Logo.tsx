import styled from 'styled-components';
import Image from '../common/Image';
import JustFinLogo from '../../assets/justfin_50.png';

const StyledLogo = styled(Image)`
    width: 50px;
    height: 50px;
`;

const Logo = () => <StyledLogo alt="JustFin logo" src={JustFinLogo} />;

export default Logo;
