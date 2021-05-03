export interface Staff {
    name: string;
    discriminator: number;
    image: string;
    description?: string[];
    github?: string;
    twitter?: string;
    twitch?: string;
}