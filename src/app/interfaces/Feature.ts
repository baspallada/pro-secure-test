export interface Feature {
    title: string;
    description: string[];
    imageLink: string;
    iconSrc: string;
    type: 'MUSIC' | 'MODERATION' | 'APPOINTMENT' | 'REMINDER' | 'OVERVIEW' | 'WEATHER';
}
