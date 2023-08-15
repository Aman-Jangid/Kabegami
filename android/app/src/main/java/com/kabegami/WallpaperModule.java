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
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Timer;
import java.util.TimerTask;

import java.io.IOException;

public class WallpaperModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private WallpaperManager wallpaperManager;
    private Timer timer;
    private int currentWallpaperIndex;

    public WallpaperModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.wallpaperManager = WallpaperManager.getInstance(reactContext);
        this.timer = null;
        this.currentWallpaperIndex = 0;
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
    public void setWallpapers(ReadableArray uris, int intervalInSeconds, String targetScreen, final Callback callback) {
        if (uris == null || uris.size() == 0) {
            callback.invoke("Array of uris cannot be empty");
            return;
        }

        if (timer != null) {
            timer.cancel();
            timer = null;
        }

        timer = new Timer();
        currentWallpaperIndex = 0;

        TimerTask timerTask = new TimerTask() {
            @Override
            public void run() {
                if (currentWallpaperIndex >= uris.size()) {
                    // If reached the end of the array, stop the timer
                    timer.cancel();
                    timer = null;
                    callback.invoke(null, "Wallpapers set successfully.");
                    return;
                }

                String uri = uris.getString(currentWallpaperIndex);
                Bitmap bitmap = decodeBase64(uri);

                if (bitmap != null) {
                    int flags = WallpaperManager.FLAG_SYSTEM; // Default is home screen
                    if (targetScreen.equals("lock")) {
                        flags = WallpaperManager.FLAG_LOCK; // Set wallpaper for lock screen
                    } else if (targetScreen.equals("both")) {
                        flags = WallpaperManager.FLAG_SYSTEM | WallpaperManager.FLAG_LOCK; // Set wallpaper for both
                                                                                           // screens
                    }

                    try {
                        wallpaperManager.setBitmap(bitmap, null, true, flags);
                    } catch (IOException e) {
                        // Handle any error when setting wallpaper
                        callback.invoke("Error setting wallpaper: " + e.getMessage());
                    }
                } else {
                    callback.invoke("Invalid base64 image data");
                }

                currentWallpaperIndex++;
            }
        };

        // Schedule the task to run at the specified interval
        timer.scheduleAtFixedRate(timerTask, 0, intervalInSeconds * 1000);
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
