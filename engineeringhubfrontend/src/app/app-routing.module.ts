import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectNotePageComponent } from './pages/add-project-note-page/add-project-note-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { ViewProjectPageComponent } from './pages/view-project-page/view-project-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SignUpPageComponent},
  {path: 'profile', component: ProfilePageComponent},
  {path: 'projects', component: ProjectPageComponent},
  {path: 'projects/:id', component: ViewProjectPageComponent},
  {path: 'projects/:id/new-note', component: AddProjectNotePageComponent},
  {path: 'projects/:id/new-note/:id2', component: AddProjectNotePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
