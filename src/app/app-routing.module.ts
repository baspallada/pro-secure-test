import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { DiscordCallbackComponent } from './pages/discord-callback/discord-callback.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { RemindersComponent } from './pages/reminders/reminders.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { PlaylistDetailComponent } from './pages/playlist-detail/playlist-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerSelectionComponent } from './pages/server-selection/server-selection.component';
import { StaffComponent } from './pages/staff/staff.component';
import { CommandsComponent } from './pages/commands/commands.component';


const routes: Routes = [
  { path: 'discord/callback', component: DiscordCallbackComponent },
  { path: '', component: HomepageComponent },
  { path: 'commands', component: CommandsComponent },
  { path: 'staff', component: StaffComponent },
  {
    path: 'dashboard', canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuard] },
      { path: 'reminders', component: RemindersComponent, canActivate: [AuthGuard] },
      { path: 'servers', component: ServerSelectionComponent, canActivate: [AuthGuard]},
      {
        path: 'playlist', canActivate: [AuthGuard],
        children: [
          { path: '', component: PlaylistComponent, canActivate: [AuthGuard] },
          { path: ':name', component: PlaylistDetailComponent, canActivate: [AuthGuard] }
        ]
      }
    ]
  },
  { path: '**', component: NotFoundComponent },
  { path: '404', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
