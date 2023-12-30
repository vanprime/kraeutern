import { InterruptScreen } from '@/components/InterruptScreen';
import React from 'react';

const NotFoundPage = () => {
    return (
        <InterruptScreen
            title={'404'}
            description={'The page you are looking for does not exist.'} />
    );
};

export default NotFoundPage;
