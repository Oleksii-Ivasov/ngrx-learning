export interface sharedState {
  showLoading: boolean;
  errorMessage: string
}
export const initialState: sharedState = {
  showLoading: false,
  errorMessage: ''
};
