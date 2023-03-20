
import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux/store/root.reducer';
import {StyleSheet, Dimensions, View} from 'react-native';
import {loaderSlice} from '../../redux/slices/loader.slice';
import { C } from '../../constants';

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    height,
    width,
    position: 'absolute',
    zIndex: 100,
    backgroundColor: C.colors.shadow.loaderShadow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 70,
    height: 70,
    backgroundColor: C.colors.primary.primary2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
});
const Spinner = () => {
  const enable = useSelector((state: RootState) => state.loader.loader.enable);

  const dispatch = useDispatch();

  useEffect(() => {
    if (enable) {
      setTimeout(() => {
        dispatch(loaderSlice.actions.hide());
      }, 1000 * 10);
    }
  }, [enable]);

  return enable ? (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <ActivityIndicator size={'large'} color={C.colors.primary.primary1} />
      </View>
    </View>
  ) : null;
};

export default Spinner;
