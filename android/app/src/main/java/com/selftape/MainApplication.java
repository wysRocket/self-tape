package com.selftape;

import android.support.multidex.MultiDexApplication;

import com.RNTextInputMask.RNTextInputMaskPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.cardio.RNCardIOPackage;
import com.crashlytics.android.Crashlytics;
import com.facebook.react.ReactApplication;
import com.vinzscam.reactnativefileviewer.RNFileViewerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.wheelpicker.WheelPickerPackage;

import io.fabric.sdk.android.Fabric;
import io.github.elyx0.reactnativedocumentpicker.DocumentPickerPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import com.apsl.versionnumber.RNVersionNumberPackage;
import com.reactlibrary.RNSmtpMailerPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFileViewerPackage(),
          new DocumentPickerPackage(),
          new PickerPackage(),
          new AsyncStoragePackage(),
          new RNFetchBlobPackage(),
          new RNGeocoderPackage(),
          new ImageResizerPackage(),
          new ImagePickerPackage(),
          new VectorIconsPackage(),
          new RNFirebasePackage(),
          new RNFirebaseMessagingPackage(),
          new RNFirebaseNotificationsPackage(),
          new RNFirebaseAuthPackage(),
          new RNFirebaseDatabasePackage(),
          new RNFirebaseStoragePackage(),
          new RNTextInputMaskPackage(),
          new MapsPackage(),
          new WheelPickerPackage(),
          new ReactVideoPackage(),
          new RNCardIOPackage(),
          new RNVersionNumberPackage(),
          new RNSmtpMailerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Fabric.with(this, new Crashlytics());
    SoLoader.init(this, /* native exopackage */ false);
  }
}
