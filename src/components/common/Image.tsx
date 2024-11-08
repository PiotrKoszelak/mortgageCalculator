import { useState } from 'react';
import { Box, styled } from '@mui/material';
import Loader from './Loader';

type ImageProps = Record<string, unknown>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledImage = styled(({ isLoading, ...props }: ImageProps) => (
    <Box {...props} />
))`
    display: ${(props) => (props.isLoading ? 'none' : 'block')};
`;

const StyledPlaceholder = styled(Box)`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
`;

const Image = (props: ImageProps) => {
    const [isLoading, setIsLoading] = useState(true);

    const onLoad = () => {
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && (
                <StyledPlaceholder>
                    <Loader size="30px" />
                </StyledPlaceholder>
            )}
            <StyledImage
                component="img"
                onLoad={onLoad}
                isLoading={isLoading}
                {...props}
            />
        </>
    );
};

export default Image;
