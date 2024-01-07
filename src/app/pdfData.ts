export class Resume {
    profilePic: any;
    name: any;
    address: any;
    contactNo: any;
    email: any;
    socialProfile: any;
    experiences: Experience[] = [];
    educations: Education[] = [];
    otherDetails: any;
    skills: Skill[] = [];

    constructor() {
        this.experiences.push(new Experience());
        this.educations.push(new Education());
        this.skills.push(new Skill());
    }
}

export class Experience {
    employer: any;
    jobTitle: any;
    jobDescription: any;
    startDate: any;
    experience: any;
}

export class Education {
    degree: any;
    college: any;
    passingYear: any;
    percentage: any;
}

export class Skill {
    value: any;
}