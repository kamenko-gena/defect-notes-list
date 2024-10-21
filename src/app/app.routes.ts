import { Route } from '@angular/router';
import { MyNotesPageComponent } from './components/pages/my-notes-page/my-notes-page.component';
import { AuthenticationPageComponent } from './components/pages/authentication-page/authentication-page.component';
import { MyNotesCreatePageComponent } from './components/pages/my-notes-page/my-notes-create-page/my-notes-create-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';

export const appRoutes: Route[] = [
    {
        path: 'my-notes',
        children: [
            {
                path: 'create',
                component: MyNotesCreatePageComponent
            },
            {
                path: '',
                component: MyNotesPageComponent
            }
        ]
    },
    {
        path: 'authentication',
        component: AuthenticationPageComponent
    },
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: '**',
        component: NotFoundPageComponent
    }
];
