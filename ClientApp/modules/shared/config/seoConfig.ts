export const SEO_CONFIGS = {
    RoutingPaths: {
        JobDetail: {
            FullParams: ':company/:title/:id',
        },
        JobSearchingList: {
            Default: 'search',
            OneParamURL: 'search/:firstParam',
            TwoParamURL: 'search/:firstParam/:secondParam',
        }
    },
    PositionMapper: [
        { id: 0, textKey: 'student-job' },
        { id: 1, textKey: 'entry-level' },
        { id: 2, textKey: 'experienced' },
        { id: 3, textKey: 'manager' },
        { id: 4, textKey: 'senior-manager' },
        { id: 5, textKey: 'top-management' }
    ],
    JobTypeMapper: [
        { id: 0, textKey: 'full-time' },
        { id: 1, textKey: 'part-time' },
        { id: 2, textKey: 'temporary' },
        { id: 3, textKey: 'internship' }
    ],
    FreeTextKey: {
        AllCategories: 'all-categories',
        AllLevels: 'all-levels',
        AllJobTypes: 'all-job-types',
        AllLocations: 'any-location',
        AllJobs: 'all'
    },
    SummaryTemplate: {
        AllJobs: 'Jobs in Malaysia',
        JobsTitle: '{0} Jobs {1} in {2}',
        For: ' for <b>{0}</b>',
        In: ' in <b>{0}</b>',
        Position: '{0} position for '
    },
    Delimiter: ',',
    Branchs: {
        TalentCorp: 'Talent Corp',
        JobsCentral: 'HiredNOW.com.my'
    }
}