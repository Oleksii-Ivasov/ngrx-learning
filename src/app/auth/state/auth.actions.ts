import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAIL = '[auth page] login fail';
export const SET_ERROR_MESSAGE = '[shared state] set error message';

export const loginStart = createAction(LOGIN_START, props<{email: string, password: string}>())
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{user: User}>())
export const setErrorMessage = createAction(SET_ERROR_MESSAGE, props<{message: string}>())