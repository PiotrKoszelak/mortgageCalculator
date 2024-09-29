import { styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import DataTable from './Table';
import Form from './Form';

const StyledContainer = styled(Paper)`
    height: 80%;
    max-width: 500px;
    display: flex;
    padding: 20px;
    flex-direction: column;
`;

const Card = () => {
    return (
        <StyledContainer variant="outlined">
            <Form />
            <DataTable />
        </StyledContainer>
    );
};

export default Card;
