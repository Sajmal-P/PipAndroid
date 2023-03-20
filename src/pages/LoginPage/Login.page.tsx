import React, { useRef,useState,useMemo ,useCallback} from 'react'
import { View ,NativeModules,Appearance} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { t } from 'react-native-tailwindcss'
import { useDispatch } from 'react-redux'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { useSelector} from 'react-redux';
import {RootState} from '../../redux/store/root.reducer';
import { authSlice } from '../../redux/slices/auth.slice'
import {loginStyles} from './Login.style';
import {useSampleHook} from '../../hooks/useSampleHook'
import {
  Text,
} from 'react-native-paper';
interface Props {
    
}

const Loginpage = (props: Props) => {
    const dispatch=useDispatch()
    const {offset,animatedStyles,changeTheme}=useSampleHook()
    const [nativeAndroidText, setNativeAndroidText] = useState();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25%', '30%'], []);
    let colorScheme = Appearance.getColorScheme();
const choosedTheme = useSelector(
  (state: RootState) => state.theme.choosedTheme
);
    NativeModules.HelloWorldModule.getCustomName((val:any) => {setNativeAndroidText(val)})
    const onLogin=()=>{
      offset.value = Math.random()
      dispatch(
        authSlice.actions.login({username:'john',password:"johsnsPass"}),
      );
    }
    
    const handleSheetChanges = useCallback((index: number) => {
      console.log('handleSheetChanges', index);
    }, []);
    const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
    }, []);
   

    return (
      <BottomSheetModalProvider>
      <View style={[loginStyles.container,{backgroundColor:choosedTheme=="dark"?"#333333": '#ffffff'}]}>
      <Text style={loginStyles.nativeText}>{nativeAndroidText} </Text>
        <Animated.View style={[loginStyles.box, animatedStyles]} />
        
         <View>
         <TouchableOpacity style={loginStyles.button} onPress={onLogin}>
         <Text style={[t.selfCenter,t.textWhite]}>Reanimated</Text>
                           </TouchableOpacity>
                             <TouchableOpacity style={loginStyles.button} onPress={handlePresentModalPress}>
         <Text style={[t.selfCenter,t.textWhite]}>Switch Theme</Text>
                             </TouchableOpacity>
                             </View>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={[loginStyles.contentContainer,{backgroundColor:choosedTheme=="dark"?"#333333": '#EDEADE'}]}>
          <Text style={loginStyles.modalText} onPress={()=>changeTheme("systemDefault")}>SYSTEM DEFAULT</Text>
           <Text style={loginStyles.modalText}onPress={()=>changeTheme("light")}>LIGHT</Text>
           <Text style={loginStyles.modalText}onPress={()=>changeTheme("dark")}>DARK</Text>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>

    )
}

export default Loginpage
