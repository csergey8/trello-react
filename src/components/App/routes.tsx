import * as React from 'react';
import { Redirect, RouteChildrenProps } from 'react-router-dom';
import { Login } from '../Login';
import { Dashboard } from '../Dashboard';
import { NotFound } from '../NotFound';
import { Profile } from '../Profile';

export enum ROUTES_URLS {
    HOME = '/',
    LOGIN = '/login',
    DASHBOARD = '/dashboard',
    PROFILE = '/profile',
    OAUTH = '/oauth',
    NOT_FOUND = '/404',
}

export interface AppRoute {
    path: ROUTES_URLS;
    render: (props: any) => any;
    title?: string;
    isHidden?: boolean;
    exact?: boolean;
    isProtected?: boolean;
}

export const routes: Array<AppRoute> = [
    {
        path: ROUTES_URLS.LOGIN,
        render: (props: any) => <Login {...props} />,
        title: 'Login'
    },
    {
        path: ROUTES_URLS.PROFILE,
        render: (props: any) => <Profile {...props} />, 
        title: 'Profile',
        isProtected: true
    },
    {
        path: ROUTES_URLS.DASHBOARD,
        render: (props: RouteChildrenProps) => <Dashboard {...props} />,
        title: 'Dashboard',
        isProtected: true
    },
    {
        path: ROUTES_URLS.HOME,
        isHidden: true,
        exact: true,
        render: () => <Redirect to={ROUTES_URLS.DASHBOARD} />
    },
    {
        path: ROUTES_URLS.NOT_FOUND,
        isHidden: true,
        render: (props: RouteChildrenProps) => <NotFound {...props} />
    }
];