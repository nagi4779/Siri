/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <RNSiriShortcuts/RNSiriShortcuts-Swift.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"testfile1"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [UIColor blackColor];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

// This method checks for shortcuts issued to the app
- (BOOL)application:(UIApplication *)application
continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> *restorableObjects))restorationHandler
{
  UIViewController *viewController = [self.window rootViewController];
  RCTRootView *rootView = (RCTRootView*) [viewController view];

  // If the initial properties say the app launched from a shortcut (see above), tell the library about it.
  if ([[rootView.appProperties objectForKey:@"launchedFromShortcut"] boolValue]) {
    ShortcutsModule.initialUserActivity = userActivity;

    rootView.appProperties = @{ @"launchedFromShortcut":@NO };
  }

  [ShortcutsModule onShortcutReceivedWithUserActivity:userActivity];

  return YES;
}
@end