import { useState } from 'react';
import { Box, styled } from '@mui/material';
import Loader from './Loader';

interface PlaceholderProps {
    size: number;
    center?: boolean;
}
interface ImageProps extends PlaceholderProps {
    [key: string]: unknown;
}

const StyledImage = styled(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ isLoading, ...props }: Omit<ImageProps, 'size' | 'center'>) => (
        <Box {...props} />
    )
)`
    display: ${(props) => (props.isLoading ? 'none' : 'block')};
`;

const StyledPlaceholder = styled(Box)<PlaceholderProps>`
    position: relative;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    display: flex;
    align-items: center;
    left: ${(props) => (props.center ? `calc(50% - ${props.size / 2}px)` : 0)};
`;

const Image = (props: ImageProps) => {
    const { size, center } = props;

    const [isLoading, setIsLoading] = useState(true);

    const onLoad = () => {
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && (
                <StyledPlaceholder size={size} center={center}>
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
