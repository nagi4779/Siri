package com.testfile1.testbridge;

import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.CallSuper;
import android.support.annotation.Nullable;
import android.view.View;
import com.testfile1.R;
/**
 * Activity to start from React Native JavaScript, triggered via
 * {@link ActivityStarterModule#navigateToExample()}.
 */
public class LoginExample extends Activity {

    @Override
    @CallSuper
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);
    }

}
