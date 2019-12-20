import { ACTION_TYPES, RequestPayload, ActionHttp} from './types';

export const request = (p: RequestPayload): ActionHttp => ({
    type: ACTION_TYPES.REQUEST,
    ...p
})
