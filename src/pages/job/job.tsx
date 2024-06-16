// src/pages/Job.tsx
import React from "react";
import JobAdmin from "./job_admin";
import JobUser from "./job_user";
import { useAuth } from '../../auth/auth_context';

const Job: React.FC = () => {
    const { userType } = useAuth();

    return (
        <div className="h-full">
            {userType === 'RECRUITER' ? <JobAdmin /> : <JobUser />}
        </div>
    );
}

export default Job;
