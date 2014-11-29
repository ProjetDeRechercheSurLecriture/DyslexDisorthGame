package com.github.childphonologylabmcgill.android.alltests.activity;

import ca.ilanguage.oprime.activity.HTML5Activity;
import ca.ilanguage.oprime.content.JavaScriptInterface;

import com.github.childphonologylabmcgill.android.alltests.content.DyslexDisorthGame;
import com.github.childphonologylabmcgill.android.alltests.content.DyslexDysorthJavaScriptInterface;

import android.app.Application;
import android.os.Bundle;

public class DyslexDisorthGameActivity extends HTML5Activity {
  DyslexDysorthJavaScriptInterface mJavaScriptInterface;

  /** Called when the activity is first created. */
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
  }

  protected void setUpVariables() {
    this.TAG = DyslexDisorthGame.getTag();
    this.D = DyslexDisorthGame.isD();
    this.mInitialAppServerUrl = "file:///android_asset/release/index.html";
    this.mOutputDir = ((DyslexDisorthGame) getApplication()).getOutputDir();
    this.mJavaScriptInterface = new DyslexDysorthJavaScriptInterface(D, TAG,
        mOutputDir, getApplicationContext(), this, "release/");
  }

  @Override
  public JavaScriptInterface getJavaScriptInterface() {
    return mJavaScriptInterface;
  }

  @Override
  public void setJavaScriptInterface(JavaScriptInterface javaScriptInterface) {
    this.mJavaScriptInterface = (DyslexDysorthJavaScriptInterface) javaScriptInterface;
  }

  @Override
  public Application getApp() {
    return this.getApplication();
  }

  @Override
  public void setApp(Application app) {
    // TODO Auto-generated method stub

  }
}