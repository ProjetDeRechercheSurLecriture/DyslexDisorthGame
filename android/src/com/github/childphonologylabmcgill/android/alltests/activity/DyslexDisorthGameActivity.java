package com.github.childphonologylabmcgill.android.alltests.activity;

import ca.ilanguage.oprime.activity.HTML5GameActivity;

import com.github.childphonologylabmcgill.android.alltests.content.DyslexDisorthGame;
import com.github.childphonologylabmcgill.android.alltests.content.DyslexDysorthJavaScriptInterface;

import android.os.Bundle;

public class DyslexDisorthGameActivity extends HTML5GameActivity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
    protected void setUpVariables(){
    	this.TAG = DyslexDisorthGame.getTag();
    	this.D  = DyslexDisorthGame.isD();
    	this.mInitialGameServerUrl = 
    			"file:///android_asset/release/dashboard.html";
    	this.mOutputDir = ((DyslexDisorthGame) getApplication())
				.getOutputDir();
    	this.mJavaScriptInterface = new DyslexDysorthJavaScriptInterface(D, TAG, mOutputDir);
    	this.mJavaScriptInterface.setContext(this);
    }
}