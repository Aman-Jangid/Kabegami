package com.fileexplorermodule;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class FileExplorerModulePackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new FileExplorerModule(reactContext)); // Assuming you've defined FileExplorerModule class
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext
    reactContext) {
    return Collections.emptyList();
    }
}
