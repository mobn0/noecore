import { Routes } from '@angular/router';
import { Messageboard } from './pages/messageboard/messageboard';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {
        path: "",
        component: Home
    },
    {
        path: "messageboard",
        component: Messageboard
    }
];
