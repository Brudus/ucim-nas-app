import React from 'react';
import { Link } from 'react-router-dom';

export const DashboardPage = ({ startStudy }) => (
    <div>
        <Link to={`/study`}>Study now</Link>
    </div>
);

export default DashboardPage;