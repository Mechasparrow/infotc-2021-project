import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventPageComponent } from './pages/add-event-page/add-event-page.component';
import { AddNewGroupComponent } from './pages/add-new-group/add-new-group.component';
import { AddNewProjectComponent } from './pages/add-new-project/add-new-project.component';
import { AddProjectNotePageComponent } from './pages/add-project-note-page/add-project-note-page.component';
import { AddProjectProposalPageComponent } from './pages/add-project-proposal-page/add-project-proposal-page.component';
import { BrowsePageComponent } from './pages/browse-page/browse-page.component';
import { GroupPageComponent } from './pages/group-page/group-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { ProjectProposalPageComponent } from './pages/project-proposal-page/project-proposal-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { ViewGroupPageComponent } from './pages/view-group-page/view-group-page.component';
import { ViewProjectPageComponent } from './pages/view-project-page/view-project-page.component';
import { ViewUserPageComponent } from './pages/view-user-page/view-user-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'browse', component: BrowsePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SignUpPageComponent},
  {path: 'profile', component: ProfilePageComponent},
  {path: 'project-proposal/new', component: AddProjectProposalPageComponent},
  {path: 'groups', component: GroupPageComponent},
  {path: 'groups/new-group', component: AddNewGroupComponent},
  {path: 'groups/new-group/:id', component: AddNewGroupComponent},
  {path: 'groups/:id', component: ViewGroupPageComponent},
  {path: 'groups/:id/new-event', component: AddEventPageComponent},
  {path: 'groups/:id/new-event/:id2', component: AddEventPageComponent},
  {path: 'projects', component: ProjectPageComponent},
  {path: 'projects/new-project', component: AddNewProjectComponent},
  {path: 'projects/new-project/:id', component: AddNewProjectComponent},
  {path: 'projects/:id', component: ViewProjectPageComponent},
  {path: 'projects/:id/new-note', component: AddProjectNotePageComponent},
  {path: 'projects/:id/new-note/:id2', component: AddProjectNotePageComponent},
  {path: 'users/:id', component: ViewUserPageComponent},
  {path: 'proposals/:id', component: ProjectProposalPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
