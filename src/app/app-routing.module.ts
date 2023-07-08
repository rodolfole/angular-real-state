import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ListingsComponent } from './pages/listings/listings.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AgentsComponent } from './pages/agents/agents.component';
import { BecomeAnAgentComponent } from './pages/become-an-agent/become-an-agent.component';

// import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'listings/:id', component: ListingsComponent },
  { path: 'agents/:id', component: AgentsComponent },
  { 
    path: 'become-an-agent', 
    component: BecomeAnAgentComponent ,
    data: { hideNavbar: true },
    children: [
      {
        path: "",
        redirectTo: "about-your-home",
        pathMatch: "full",
      },
    ]
  },
  { path: '**', component: PageNotFoundComponent, data: { hideNavbar: true } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
