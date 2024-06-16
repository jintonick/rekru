import React from "react";
import News from "../pages/start_page/news";
import Main from "../pages/start_page/main";
import Job from "../pages/job/job";
import JobForm from "../pages/job/job_form";
import Interview from "../pages/interview/interview";
import { Route, Routes } from "react-router-dom";
import ResumeListing from "../pages/specialists/specialists";
import Lk from "../pages/lk/lk";

function AppRoutes(){
    return (
        <Routes>
            <Route path="/news" element={<News />} />
            <Route path="/" element={<Main />} />
            <Route path="/job" element={<Job />} />
            <Route path='/job/new_job/' element={<JobForm />}/>
            <Route path='/spec' element={<ResumeListing />}/>
            <Route path='/interview/:id' element={<Interview />} />
            <Route path='/lk' element={<Lk />} />
        </Routes>
    )
}

export default AppRoutes;