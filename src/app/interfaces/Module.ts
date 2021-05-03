import { Command } from './Command';

export interface Module {
    name: string;
    icon: string;
    commands: Command[];
}
