package com.wallpapermodule;

import android.app.WallpaperManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import java.io.IOException;

public class WallpaperModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public WallpaperModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "WallpaperModule";
    }

    @ReactMethod
    public void setWallpaper(ReadableMap options, String targetScreen, final Callback callback) {
        try {
            if (!options.hasKey("uri")) {
                callback.invoke("Missing 'uri' parameter");
                return;
            }

            String uri = options.getString("uri");
            Bitmap bitmap = decodeBase64(uri);
            WallpaperManager wallpaperManager = WallpaperManager.getInstance(reactContext);

            if (bitmap != null) {
                int flags = WallpaperManager.FLAG_SYSTEM; // Default is home screen
                if (targetScreen.equals("lock")) {
                    flags = WallpaperManager.FLAG_LOCK; // Set wallpaper for lock screen
                } else if (targetScreen.equals("both")) {
                    flags = WallpaperManager.FLAG_SYSTEM | WallpaperManager.FLAG_LOCK; // Set wallpaper for both screens
                }

                wallpaperManager.setBitmap(bitmap, null, true, flags);
                callback.invoke(null, "Wallpaper set successfully.");
            } else {
                callback.invoke("Invalid base64 image data");
            }
        } catch (IOException e) {
            callback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void setWallpaperFromUrl(String imageUrl, String targetScreen, final Callback callback) {
        try {
            URL url = new URL(imageUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoInput(true);
            connection.connect();

            InputStream inputStream = connection.getInputStream();
            Bitmap bitmap = BitmapFactory.decodeStream(inputStream);

            if (bitmap != null) {
                int flags = WallpaperManager.FLAG_SYSTEM; // Default is home screen
                if (targetScreen.equals("lock")) {
                    flags = WallpaperManager.FLAG_LOCK; // Set wallpaper for lock screen
                } else if (targetScreen.equals("both")) {
                    flags = WallpaperManager.FLAG_SYSTEM | WallpaperManager.FLAG_LOCK; // Set wallpaper for both screens
                }

                WallpaperManager wallpaperManager = WallpaperManager.getInstance(reactContext);
                wallpaperManager.setBitmap(bitmap, null, true, flags);

                callback.invoke(null, "Wallpaper set successfully.");
            } else {
                callback.invoke("Failed to load image from URL");
            }
        } catch (Exception e) {
            callback.invoke(e.getMessage());
        }
    }

    private Bitmap decodeBase64(String base64String) {
        try {
            byte[] decodedBytes = Base64.decode(base64String, Base64.DEFAULT);
            return BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.length);
        } catch (Exception e) {
            return null;
        }
    }
}
