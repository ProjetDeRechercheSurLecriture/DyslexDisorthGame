package com.github.childphonologylabmcgill.android.alltests.activity;

import ca.ilanguage.oprime.activity.HTML5Activity;
import ca.ilanguage.oprime.activity.HTML5GameActivity;
import ca.ilanguage.oprime.activity.HTML5ReplicatingActivity;

import com.github.childphonologylabmcgill.android.alltests.content.DyslexDisorthGame;
import com.github.childphonologylabmcgill.android.alltests.content.DyslexDysorthJavaScriptInterface;

import android.os.Bundle;

public class DyslexDisorthGameActivity extends HTML5Activity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
    protected void setUpVariables(){
    	this.TAG = DyslexDisorthGame.getTag();
    	this.D  = DyslexDisorthGame.isD();
    	this.mInitialAppServerUrl = 
    			"file:///android_asset/release/index.html";
    	this.mOutputDir = ((DyslexDisorthGame) getApplication())
				.getOutputDir();
    	this.mJavaScriptInterface = new DyslexDysorthJavaScriptInterface(D, TAG, mOutputDir, getApplicationContext(), this, "release/");
    	this.mJavaScriptInterface.setContext(this);
    }
}