import { SharedReducer } from "./shared/shared.reducer";
import { SHARED_STATE_NAME } from "./shared/shared.selector";
import { sharedState } from "./shared/shared.state";

export interface AppState {
        [SHARED_STATE_NAME]: sharedState
}

export const appReducer = {
    [SHARED_STATE_NAME]: SharedReducer
}