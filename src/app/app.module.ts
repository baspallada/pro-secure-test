
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCalendarAlt, faVolumeUp, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { FullCalendarModule } from '@fullcalendar/angular';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { InfoBlockComponent } from '@clerq/components/info-block/info-block.component';
import { NavbarComponent } from '@clerq/components/navbar/navbar.component';
import { NextCardComponent } from './components/next-card/next-card.component';
import { PlaylistCardComponent } from './components/playlist-card/playlist-card.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomepageComponent } from '@clerq/pages/homepage/homepage.component';
import { DiscordCallbackComponent } from '@clerq/pages/discord-callback/discord-callback.component';
import { AppointmentsComponent } from '@clerq/pages/appointments/appointments.component';
import { DashboardComponent } from '@clerq/pages/dashboard/dashboard.component';
import { RemindersComponent } from './pages/reminders/reminders.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { ServerSelectionComponent } from './pages/server-selection/server-selection.component';
import { ServerDropdownComponent } from './components/server-dropdown/server-dropdown.component';
import { PlaylistDetailComponent } from './pages/playlist-detail/playlist-detail.component';

import { TokenInterceptorService } from '@clerq/services/interceptors/token-interceptor.service';
import { AppRoutingModule } from './app-routing.module';

import { DiscordProvider } from './providers/discord.provider';
import { SocketioService } from './services/socketio/socketio.service';
import { environment } from '@clerq/environment';
import { StaffComponent } from './pages/staff/staff.component';
import { CommandsComponent } from './pages/commands/commands.component';
import { CommandComponent } from './components/command/command.component';
import { StaffCardComponent } from './components/staff-card/staff-card.component';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

const config: SocketIoConfig = { url: environment.url, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DiscordCallbackComponent,
    InfoBlockComponent,
    NavbarComponent,
    AppointmentsComponent,
    DashboardComponent,
    NextCardComponent,
    RemindersComponent,
    ServerSelectionComponent,
    ServerDropdownComponent,
    PlaylistComponent,
    PlaylistCardComponent,
    PlaylistDetailComponent,
    NotFoundComponent,
    StaffComponent,
    CommandsComponent,
    CommandComponent,
    StaffCardComponent
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:3000', 'clerqbot.com'],
        blacklistedRoutes: ['localhost:3000/auth', 'clerqbot.com/auth']
      }
    }),
    HttpClientModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FontAwesomeModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
    DiscordProvider,
    SocketioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faCalendarAlt, faVolumeUp, faUserCog);
  }
}
