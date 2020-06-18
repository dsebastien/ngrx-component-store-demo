export interface BusinessData {
    owner: string;
    name: string;
    active: boolean;
}

export interface User {
    firstName: string;
    givenName: string;
}

export interface WhateverState {
    foo: string;
    bar: string;
    isWorkingFromHome: boolean;
    someData: BusinessData[];
    users: Record<string, User>;
}
