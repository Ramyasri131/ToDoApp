import { Routes } from '@angular/router';
import { setLayoutResolver } from './core/resolvers/set-layout.resolver';
import { PageLayout } from './core/enums/page-layout';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
    {
        path:'',loadChildren:()=>import('./modules/home/home.module').then((m)=>m.HomeModule),resolve:{
            layout:setLayoutResolver(PageLayout.Authorized)
        },canActivate:[authGuard]
    },
    {
        path:'',loadChildren:()=>import('./modules/auth-pages/auth.module').then((m)=>m.AuthModule),resolve:{
            layout:setLayoutResolver(PageLayout.UnAuthorized)
        },canActivate:[loginGuard]
    },
];