
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface User {
    id: number;
    name?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export interface IQuery {
    getHello(): string | Promise<string>;
    getAllUsers(): User[] | Promise<User[]>;
}

type Nullable<T> = T | null;
