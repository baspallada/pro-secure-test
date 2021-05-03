import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { GeneralProvider } from '@clerq/providers/general.provider';
import { Module } from '@clerq/interfaces/Module';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { startWith, map } from 'rxjs/operators';

@Component({
    selector: 'app-commands',
    templateUrl: './commands.component.html',
    styleUrls: ['./commands.component.scss'],
    providers: [GeneralProvider]
})
export class CommandsComponent implements OnInit {
    allModules: Module[];
    selectedModule: Module[];
    selected = '';

    private routeSub: Subscription;
    public commands$: Observable<Module[]>;
    public filter = new FormControl('');
    private count = 0;
    private previousClick;

    constructor(
        private generalProvider: GeneralProvider
    ) {
        this.generalProvider.getCommandsFromJSON().subscribe(data => {
            this.allModules = data['modules'] as Module[];
            this.selectedModule = this.allModules;

            this.commands$ = this.filter.valueChanges.pipe(
                startWith(''),
                map(text => this.searchCommands(text))
            );
        });
    }

    ngOnInit() {
    }

    // Change the background color/opacity of the selected module
    openModule(id: string) {
        // Check how many times the same button gets pressed
        if (this.previousClick == id) {
            this.count++;
        } else {
            this.previousClick = id;
            this.count = 0;
        }

        $('.module-button').css('background-color', '#707070'); // Reset colors of all module buttons
        $("#" + id).css('background-color', '#232227'); // Apply different color to selected module

        // Reset color if same module gets pressed multiple times (odd = module closed, even = opened)
        if (this.count % 2) {
            $('#' + id).css('background-color', '#707070');
        }
    }


    searchCommands(text: string): Module[] {
        const matches = [];

        this.selectedModule.forEach(module => {
            module.commands.filter(command => {
                const term = text.toLowerCase();
                if (command?.name?.toLowerCase().includes(term)) {
                    matches.push(command);
                } else if (command?.examples?.filter(example => example.toLowerCase().includes(term)).length > 0) {
                    matches.push(command);
                } else if (command?.aliases?.filter(aliases => aliases.toLowerCase().includes(term)).length > 0) {
                    matches.push(command);
                } else if (command?.description?.filter(sentence => sentence.toLowerCase().includes(term)).length > 0) {
                    matches.push(command);
                }
            });
        });

        return matches;
    }

    filterCommands(moduleName: string) {
        if (this.selected === moduleName) {
            this.selected = '';
            this.selectedModule = this.allModules;
        } else {
            this.selected = moduleName;
            this.selectedModule = this.allModules.filter(module => module.name === moduleName);
        }
        this.commands$ = this.filter.valueChanges.pipe(
            startWith(''),
            map(text => this.searchCommands(text))
        );
    }
}
