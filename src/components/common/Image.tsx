import { useState } from 'react';
import { Box, styled } from '@mui/material';
import Loader from './Loader';

type ImageProps = Record<string, unknown>;

interface PlaceholderProps {
    size: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledImage = styled(({ isLoading, ...props }: ImageProps) => (
    <Box {...props} />
))`
    display: ${(props) => (props.isLoading ? 'none' : 'block')};
`;

const StyledPlaceholder = styled(Box)<PlaceholderProps>`
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    display: flex;
    align-items: center;
`;

const Image = (props: ImageProps) => {
    const { size } = props;

    const [isLoading, setIsLoading] = useState(true);

    const onLoad = () => {
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && (
                <StyledPlaceholder size={size as number}>
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
