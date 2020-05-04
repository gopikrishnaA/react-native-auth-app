# Sample React Native application

## MERN based react native application
Minimal full-stack MERN app with authentication using passport and JWTs. Project includes react native based user authentication having backend server using Express with Mongo db.

![Login](./images/login.jpg?raw=true "Login")  |  ![Signup](./images/signup.jpg?raw=true "Signup")  |  ![Home](./images/home.jpg?raw=true "Home")  |  ![Drawer](./images/drawer.jpg?raw=true "Drawer")  |  ![Summary](./images/summary.jpg?raw=true "Summary")  |  ![Details](./images/detail.jpg?raw=true "Details")  |  ![Popup](./images/popup.jpg?raw=true "Details") | ![Profile](./images/profile.jpg?raw=true "Details")

#### Project Setup
Expo CLI Quickstart - Cli tool

Assuming that you have Node 12 LTS or greater installed, you can use npm to install the Expo CLI command line utility:

```sh
npm install -g expo-cli
```

Then run the following commands to create a new React Native project called "firstProject":
```sh
expo init firstProject
cd firstProject
npm start # you can also use: expo start
```

React Native CLI Quickstart
```sh
npm run eject 
```
To eject the internal modules which is to be run apart of expo.

We recommend installing `Node and Python2`. If you have already installed Node on your system, make sure it is [Node 8.3](https://nodejs.org/) or newer. If you already have a JDK on your system, make sure it is version 8 or newer.

#### Android development environment

1. Install [Android Studio](https://developer.android.com/studio)
    choose a "Custom" setup when prompted to select an installation type. Make sure the boxes next to all of the following are checked:

        Android SDK
        Android SDK Platform
        Performance (Intel ® HAXM) (See here for AMD)
        Android Virtual Device

    Then, click "Next" to install all of these components.

2. Install the Android SDK
    Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the Android 9 (Pie) SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.

    The SDK Manager can be accessed from the "Welcome to Android Studio" screen. Click on "Configure", then select "SDK Manager".

    The SDK Manager can also be found within the Android Studio "Preferences" dialog, under `Settings → Appearance & Behavior → System Settings → Android SDK`.

    Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the Android 9 (Pie) entry, then make sure the following items are checked:

        Android SDK Platform 28
        Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

    Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that `28.0.3` is selected.

    Finally, click "Apply" to download and install the Android SDK and related build tools.

3. Configure the `ANDROID_HOME` environment variable
    The React Native tools require some environment variables to be set up in order to build apps with native code.

    Open the System pane under System and Security in the Windows Control Panel, then click on Change settings.... Open the Advanced tab and click on Environment Variables.... Click on New... to create a new ANDROID_HOME user variable that points to the path to your Android SDK: C:\Users\<user>\AppData\Local\Android\Sdk

    You can find the actual location of the SDK in the Android Studio "Preferences" dialog, under Appearance & Behavior → System Settings → Android SDK.

4. Add platform-tools to Path
    Open the System pane under System and Security in the Windows Control Panel, then click on Change settings.... Open the Advanced tab and click on Environment Variables.... Select the Path variable, then click Edit. Click New and add the path to platform-tools to the list.
    The default location for this folder is:
    ```sh
    C:\Users\<user>\AppData\Local\Android\Sdk\platform-tools
    ```

5. Go to your React-native Project -> Android
    Create a file `local.properties`
    Open the file
    paste your Android SDK path like below
    ```
    in Windows sdk.dir = C:\\Users\\USERNAME\\AppData\\Local\\Android\\sdk
    in macOS sdk.dir = /Users/USERNAME/Library/Android/sdk
    in linux sdk.dir = /home/USERNAME/Android/Sdk
    ```
    
6. To run on real android devices [click here for documentation.](https://reactnative.dev/docs/running-on-device)

7. Debugging the app [click here for documentation.](https://reactnative.dev/docs/debugging)

8. To publich on google play store, generation of [signed APK](https://reactnative.dev/docs/signed-apk-android)

9. You will have to create a key to sign the apk. Use below to create your key:
    ```sh
    keytool -genkey -v -keystore my-app-key.keystore -alias my-app-alias -keyalg RSA -keysize 2048 -validity 10000
    ```
    Use a password when prompted

    Once the key is generated, use it to generate the installable build:
    ```sh
    react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ && react-native run-android
    ```

    if you get error

    ENOENT: no such file or directory, open 'android/app/src/main/assets/index.android.bundle'
    run below command
    ```sh
    mkdir android/app/src/main/assets
    ```


#### IOS development environment
You will need Node, Watchman, the React Native command line interface, and Xcode.We recommend installing Node and Watchman using [Homebrew](https://brew.sh/).
```
Install Node & Watchman
brew install node
brew install watchman
```

If you have already installed Node on your system, make sure it is [Node 8.3](https://nodejs.org/) or newer.

[Watchman](https://facebook.github.io/watchman) is a tool by Facebook for watching changes in the filesystem. It is highly recommended you install it for better performance.

The easiest way to install Xcode is via the [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12). Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.

If you have already installed Xcode on your system, make sure it is version 9.4 or newer.   

##### Installing an iOS Simulator in Xcode
To install a simulator, open `Xcode > Preferences...` and select the Components tab. Select a simulator with the corresponding version of iOS you wish to use.

##### CocoaPods
[CocoaPods](https://cocoapods.org/) is built with Ruby and it will be installable with the default Ruby available on macOS. You can use a Ruby Version manager, however we recommend that you use the standard Ruby available on macOS unless you know what you're doing.

Using the default Ruby install will require you to use sudo when installing gems. (This is only an issue for the duration of the gem installation, though.)
```sh
sudo gem install cocoapods
```

#### React Native Router
[React Navigation](https://reactnavigation.org/docs/getting-started)

react-native-safe-area-context https://github.com/th3rdwave/react-native-safe-area-context

#### Redux Integration

It is extremely easy to use Redux in an app with React Navigation. It's basically no different than without React Navigation.
```
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from 'store';
// Render the app container component with the provider around it
export default class App() {
return (
    <Provider store={store}>
    <NavigationContainer>
        {/* Screen configuration */}
    </NavigationContainer>
    </Provider>
);
}
```
create store file with react-redux and reducers are pure functions as usual 

```
import { createStore } from 'redux'
import reducer from './reducers'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
```

#### Resources
Why expo? Why it is required? [go through](https://levelup.gitconnected.com/expo-vs-react-native-cli-a-guide-to-bootstrapping-new-react-native-apps-6f0fcafee58f)

The Full React Native Layout [Cheat Sheet](https://medium.com/wix-engineering/the-full-react-native-layout-cheat-sheet-a4147802405c)
