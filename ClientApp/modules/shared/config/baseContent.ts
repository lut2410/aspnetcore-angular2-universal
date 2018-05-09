const baseContentForServerRendering = getBaseContentForServerRendering();

function getBaseContentForServerRendering(){
  return {
    findJobPageHeading_TalentCorp: 'Find the job you want',
    findJobPageHeading_JobsCentral: 'Find the right job. Get hired now.',
    findJobButtonText: 'Find Jobs',
    brands: {
        jobsCentral: 'HireNow',
        talentCorp: 'TalentCorp'
    },
    mainMenu: {
        browseCompanies: 'Browse Companies',
        favouriteJobs: 'Favourite jobs',
        forEmployers: 'For Employers',
        forJobseekers: 'For Jobseekers',
        forCandidates: 'For Candidates',
        forCompanies: 'For Companies',
        forJobseekersArticles: 'Articles',
        forJobseekersEvents: 'Events',
        jobs: 'Jobs',
        jobSearch: 'Job Search',
        malaysia100: 'Malaysia\'s 100',
        myApplication: 'My Applications',
        myCalendar: 'My Calendar',
        myCV: 'My CV',
        logIn: 'Log In',
        sighUp: 'Sign Up',
        viewProfile: 'View profile',
        editAccountInfo: 'Edit account information',
        sighOut: 'Sign out',
        myProfile: 'My Profile',
        logout: 'Logout'
    },
    subMenu: {
        dashboard: 'Dashboard',
        savedJobs: 'Saved Jobs',
        appliedJobs: 'Applied Jobs',
        interviews:  'Interviews'
    }
  }
}

export default baseContentForServerRendering;