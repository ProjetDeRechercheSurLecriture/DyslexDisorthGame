package com.github.childphonologylabmcgill.android.alltests.activity;

import ca.ilanguage.oprime.content.JavaScriptInterface;
import ca.ilanguage.oprime.content.OPrime;

import com.github.childphonologylabmcgill.android.alltests.content.DyslexDisorthGame;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

public class DyslexDisorthGameActivity extends Activity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

		Intent intent = new Intent(OPrime.INTENT_START_HTML5_SUB_EXPERIMENT);

		intent.putExtra(OPrime.EXTRA_TAG,
				 DyslexDisorthGame.getTag() );
		intent.putExtra(OPrime.EXTRA_DEBUG_MODE,
				 DyslexDisorthGame.isD() );
		intent.putExtra(OPrime.EXTRA_LANGUAGE,
				((DyslexDisorthGame) getApplication())
						.getLanguage().getLanguage());
		intent.putExtra(OPrime.EXTRA_HTML5_SUB_EXPERIMENT_INITIAL_URL,
				"file:///android_asset/public/dashboard.html");
		intent.putExtra(OPrime.EXTRA_HTML5_JAVASCRIPT_INTERFACE,
				new JavaScriptInterface());

		startActivity(intent);
		finish();
    }
}