import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export  const  requestUserPermission= async()=> {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken()
  }
}

const getFCMToken=async ()=>{
    let fcmToken=await AsyncStorage.getItem("fcmToken")

    console.log({oldToken:fcmToken});
    if(!fcmToken){
        try {
            let fcmToken=await messaging().getToken()
            console.log({newToken:fcmToken});
            if(fcmToken){
                AsyncStorage.setItem("fcmToken",fcmToken)
            }
        } catch (error) {
            
        }
    }
}


export const notificationListener=()=>{
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        
      });

      messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          
        }
       
      });

      messaging().onMessage(async (remoteMessage)=>{
        console.log("notification on froground state....",remoteMessage);
      })
}