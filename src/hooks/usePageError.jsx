import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const usePageError = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [pageError, setPageError] = useState(null);

    useEffect(() => {
        if (pageError) setPageError(null);

        const parseErrorFromHash = (hash) => {
            const params = new URLSearchParams(hash.substring(1));
            const error = params.get('error');
            const errorCode = params.get('error_code');
            const errorDescription = params.get('error_description');

            return { error, errorCode, errorDescription };
        };

        const { error, errorCode, errorDescription } = parseErrorFromHash(location.hash);

        if (error) {
            const formattedDescription = errorDescription.replace(/\+/g, ' ');
            setPageError(`Failed to log in: ${formattedDescription}`)
            toast.error(`Failed to log in`, { description: formattedDescription });
            navigate(location.pathname, { replace: true });
        }
    }, []);

    return { pageError, setPageError };
};

export default usePageError;