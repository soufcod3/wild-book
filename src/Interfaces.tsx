export interface IForms {
    refetchSkills: Function,
    refetchWilders: Function,
    wilders: IWilder[],
    skills: ISkill[]
}

export interface ISkillForm {
    refetchSkills: Function
}

export interface ISkill {
    id: number,
    name: string
}

export interface IUpvote {
    id: number,
    count: number,
    wilder: IWilder,
    skill: ISkill
}

export interface IWilder {
    id: number,
    name: string,
    city: string,
    upvotes: IUpvote[],
    onWilderCreated: Function,
};

export interface IWilderForm {
    onWilderCreated: Function
}

export interface IWilderSkillForm {
    wilders: IWilder[],
    skills: ISkill[],
    refetchWilders: Function
}