import { Action } from '../types';

// QQQ <P = any>??
export interface RequestPayload<P = any> {
    path: string;
    onSuccess?: (p?: P) => void;
    onError?: (e?: any) => void;
}

export enum ACTION_TYPES {
    REQUEST = '@@HTTP/REQUEST',
    SUCCESS = '@@HTTP/SUCCESS',
    ERROR = '@@HTTP/ERROR'
}

// QQQ <P = any>?? all string???
export interface ActionHttp<P = any> extends Action<ACTION_TYPES>, RequestPayload<P> {

}