import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IngresadoGuard } from './ingresado.guard';
import { NoIngresadoGuard } from './noingresado.guard';
import { ProfesorGuard } from './profesorguard.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [NoIngresadoGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'inicio-qr',
    loadChildren: () => import('./inicio-qr/inicio-qr.module').then(m => m.InicioQrPageModule),
    canActivate: [IngresadoGuard],
  },
  {
    path: 'profesor',
    loadChildren: () => import('./profesor/profesor.module').then(m => m.ProfesorPageModule),
    canActivate: [ProfesorGuard], 
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundPageModule),
  },
  {
    path: 'openweather',
    loadChildren: () => import('./openweather/openweather.module').then( m => m.OpenWeatherPageModule),
  },
  {
    path: 'cambiar-pass',
    loadChildren: () => import('./cambiar-pass/cambiar-pass.module').then(m => m.CambiarPassPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
