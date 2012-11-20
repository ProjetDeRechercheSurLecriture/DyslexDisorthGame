package com.github.childphonologylabmcgill.android.alltests.content;


import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;
import ca.ilanguage.oprime.activity.HTML5Activity;
import ca.ilanguage.oprime.content.JavaScriptInterface;

public class DyslexDysorthJavaScriptInterface extends JavaScriptInterface {

  private static final long serialVersionUID = -8186639717009199855L;

  public DyslexDysorthJavaScriptInterface(boolean d, String tag,
      String outputDir, Context context, HTML5Activity UIParent,
      String assetsPrefix) {
    super(d, tag, outputDir, context, UIParent, assetsPrefix);
  }

  public DyslexDysorthJavaScriptInterface(Context context) {
    super(context);
  }

  public void runSAILS() {
    Toast.makeText(mContext, "Running SAILS", Toast.LENGTH_LONG).show();
    if (D)
      Log.d(TAG, "Running SAILS");
    Intent i = new Intent(
        "com.github.childphonologylabmcgill.android.START_SAILS_SUB_EXPERIMENT");
    mContext.startActivity(i);
  }

  public void runTCPP() {
    Toast.makeText(mContext, "Running TCPP", Toast.LENGTH_LONG).show();
    if (D)
      Log.d(TAG, "Running TCPP");
  }

  public void runTDFP() {
    Toast.makeText(mContext, "Running TDFP", Toast.LENGTH_LONG).show();
    if (D)
      Log.d(TAG, "Running TDFP");
  }

  public void runTDFM() {
    Toast.makeText(mContext, "Running TDFM", Toast.LENGTH_LONG).show();
    if (D)
      Log.d(TAG, "Running TDFM");
  }

}
