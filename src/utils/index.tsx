import {CommonActions, NavigationProp} from '@react-navigation/native';

export const navigateAndReset = (
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'>,
  screenName: string,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: screenName}],
    }),
  );
};
