import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ListingsComponent } from './pages/listings/listings.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AgentsComponent } from './pages/agents/agents.component';

// import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'listings/:id', component: ListingsComponent },
  { path: 'agents/:id', component: AgentsComponent },
  { path: '**', component: PageNotFoundComponent, data: { pageNotFound: true } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
