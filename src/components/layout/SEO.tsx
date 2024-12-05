import { Helmet } from 'react-helmet-async';

interface SeoProps {
    title: string;
    description: string;
}

const SeoWrapper = (props: SeoProps) => {
    const { title, description } = props;
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
    );
};

export default SeoWrapper;
