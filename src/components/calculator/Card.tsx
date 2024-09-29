import { styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import DataTable from './Table';

const StyledContainer = styled(Paper)`
    height: 80%;
    width: 50%;
    display: flex;
    padding: 20px;
    flex-direction: column;
`;

const Card = () => {
    return (
        <StyledContainer variant="outlined">
            <DataTable />
        </StyledContainer>
    );
};

export default Card;
