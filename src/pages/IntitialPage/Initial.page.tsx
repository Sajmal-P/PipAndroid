import React, {useEffect, useRef} from 'react';

import {AppState, Platform, useWindowDimensions} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import PipHandler from '../../../PipHandler';

const InitialPage = () => {
  // Use this boolean to show / hide ui when pip mode changes
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        appState.current = nextAppState;
      } else {
        if (Platform.OS === 'android') {
          PipHandler.enterPipMode(300, 214);
        }
        appState.current = nextAppState;
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);
  const playerRef = useRef(null);

  return (
    <VideoPlayer
      video={{
        uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      }}
      controls
      ref={playerRef}
      videoWidth={1600}
      videoHeight={900}
      thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
      playInBackground={true}
      pictureInPicture={true}
      style={{
        height: useWindowDimensions().height,
        width: useWindowDimensions().width,
      }}
      onPictureInPictureStatusChanged={(data: any) => {
        console.log(data, 'isPictureInPicture');
      }}
      pauseOnPress
    />
  );
};

export default InitialPage;
