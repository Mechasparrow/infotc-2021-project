import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { FooterComponent } from './share/footer/footer.component';
import { NavbarComponent } from './share/navbar/navbar.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { HttpClientModule } from '@angular/common/http';
import { DefaultPageLayoutComponent } from './share/default-page-layout/default-page-layout.component';
import { AttributeListComponent } from './share/attribute-list/attribute-list.component';
import { MainSearchComponent } from './share/main-search/main-search.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { ResultCardComponent } from './share/result-card/result-card.component';
import { AddNewProjectComponent } from './pages/add-new-project/add-new-project.component';
import { ViewProjectPageComponent } from './pages/view-project-page/view-project-page.component';
import { AddProjectNotePageComponent } from './pages/add-project-note-page/add-project-note-page.component';
import { AddProjectProposalPageComponent } from './pages/add-project-proposal-page/add-project-proposal-page.component';
import { BrowsePageComponent } from './pages/browse-page/browse-page.component';
import { CardCarousalComponent } from './share/card-carousal/card-carousal.component';
import { CarousalCardComponent } from './share/carousal-card/carousal-card.component';
import { GroupPageComponent } from './pages/group-page/group-page.component';
import { AddNewGroupComponent } from './pages/add-new-group/add-new-group.component';
import { ViewGroupPageComponent } from './pages/view-group-page/view-group-page.component';
import { AddEventPageComponent } from './pages/add-event-page/add-event-page.component';
import { ViewUserPageComponent } from './pages/view-user-page/view-user-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomePageComponent,
    LoginPageComponent,
    SignUpPageComponent,
    ProfilePageComponent,
    DefaultPageLayoutComponent,
    AttributeListComponent,
    MainSearchComponent,
    ProjectPageComponent,
    ResultCardComponent,
    AddNewProjectComponent,
    ViewProjectPageComponent,
    AddProjectNotePageComponent,
    AddProjectProposalPageComponent,
    BrowsePageComponent,
    CardCarousalComponent,
    CarousalCardComponent,
    GroupPageComponent,
    AddNewGroupComponent,
    ViewGroupPageComponent,
    AddEventPageComponent,
    ViewUserPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
