import { StateSchema } from 'app/providers/StoreProvider';
import {
    getLoginPassword,
} from 'features/AuthByUsername/model/selectors/getLoginPassword/getLoginPassword';

describe('getLoginPassword.test', () => {
    test('should return password', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                password: '1234',
            },
        };
        expect(getLoginPassword(state as StateSchema)).toEqual('1234');
    });

    test('working with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginPassword(state as StateSchema)).toEqual('');
    });
});