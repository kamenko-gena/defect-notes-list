import { Route } from '@angular/router';
import { AuthenticationPageComponent } from './components/pages/authentication-page/authentication-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { noteIdResolver } from './resolvers/note-id.resolver';
import { registerUserGuard } from './guards/register-user/register-user.guard';

export const appRoutes: Route[] = [
    {
        path: 'my-notes',
        canActivate: [registerUserGuard],
        children: [
            {
                path: 'create',
                loadComponent: () =>
                    import(
                        './components/pages/my-notes-page/my-notes-create-page/my-notes-create-page.component'
                    ).then((m) => m.MyNotesCreatePageComponent),
            },
            {
                path: ':noteId',
                loadComponent: () =>
                    import(
                        './components/pages/my-notes-page/my-note-page/my-note-page.component'
                    ).then((m) => m.MyNotePageComponent),
                resolve: { note: noteIdResolver },
            },
            {
                path: '',
                loadComponent: () =>
                    import(
                        './components/pages/my-notes-page/my-notes-page.component'
                    ).then((m) => m.MyNotesPageComponent),
            },
        ],
    },
    {
        path: 'authentication',
        component: AuthenticationPageComponent,
    },
    {
        path: '',
        component: HomePageComponent,
    },
    {
        path: '**',
        component: NotFoundPageComponent,
    },
];
