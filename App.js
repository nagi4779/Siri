import { ShortcutOptions } from "react-native-siri-shortcut";

import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  SiriShortcutsEvent,
  donateShortcut,
  suggestShortcuts,
  clearAllShortcuts,
  clearShortcutsWithIdentifiers,
  presentShortcut
} from "react-native-siri-shortcut";
import AddToSiriButton, {
  SiriButtonStyles
} from "react-native-siri-shortcut/AddToSiriButton";

const opts1: ShortcutOptions = {
  activityType: "com.github.gustash.SiriShortcutsExample.sayHello",
  title: "Say Hi",
  userInfo: {
    foo: 1,
    bar: "baz",
    baz: 34.5
  },
  keywords: ["kek", "foo", "bar"],
  persistentIdentifier: "com.github.gustash.SiriShortcutsExample.sayHello",
  isEligibleForSearch: true,
  isEligibleForPrediction: true,
  suggestedInvocationPhrase: "Say something",
  needsSave: true
};

const opts2: ShortcutOptions = {
  activityType: "com.github.gustash.SiriShortcutsExample.somethingElse",
  title: "Something Else",
  persistentIdentifier: "some.persistent.identifier",
  isEligibleForSearch: true,
  isEligibleForPrediction: true,
  suggestedInvocationPhrase: "What's up?"
};

type Props = {};
type State = {
  shortcutInfo: ?any,
  shortcutActivityType: ?string,
  addToSiriStyle: 0 | 1 | 2 | 3
};
export default class App extends Component<Props, State> {
  state = {
    shortcutInfo: null,
    shortcutActivityType: null,
    addToSiriStyle: SiriButtonStyles.blackOutline
  };

  componentDidMount() {
    SiriShortcutsEvent.addListener(
      "SiriShortcutListener",
      this.handleSiriShortcut.bind(this)
    );

    // This will suggest these two shortcuts so that they appear
    // in Settings > Siri & Search, even if they are not yet
    // donated. Suitable for shortcuts that you expect the user
    // may want to use. (https://developer.apple.com/documentation/sirikit/shortcut_management/suggesting_shortcuts_to_users)
    suggestShortcuts([opts1, opts2]);
  }

  handleSiriShortcut({ userInfo, activityType }: any) {
    this.setState({
      shortcutInfo: userInfo,
      shortcutActivityType: activityType
    });
  }

  setupShortcut1() {
    donateShortcut(opts1);
  }

  setupShortcut2() {
    donateShortcut(opts2);
  }

  async clearShortcut1() {
    try {
      await clearShortcutsWithIdentifiers([
        "com.github.gustash.SiriShortcutsExample.sayHello"
      ]);
      alert("Cleared Shortcut 1");
    } catch (e) {
      alert("You're not running iOS 12!");
    }
  }

  async clearShortcut2() {
    try {
      await clearShortcutsWithIdentifiers(["some.persistent.identifier"]);
      alert("Cleared Shortcut 2");
    } catch (e) {
      alert("You're not running iOS 12!");
    }
  }

  async clearBothShortcuts() {
    try {
      await clearShortcutsWithIdentifiers([
        "com.github.gustash.SiriShortcutsExample.sayHello",
        "some.persistent.identifier"
      ]);
      alert("Cleared Both Shortcuts");
    } catch (e) {
      alert("You're not running iOS 12!");
    }
  }

  async clearShortcuts() {
    try {
      await clearAllShortcuts();
      alert("Deleted all the shortcuts");
    } catch (e) {
      alert("You're not running iOS 12!");
    }
  }

  swapSiriButtonTheme() {
    const { addToSiriStyle } = this.state;

    const styles = Object.keys(SiriButtonStyles).map(
      key => SiriButtonStyles[key]
    );
    const index = styles.findIndex(style => style === addToSiriStyle);
    if (index === styles.length - 1)
      this.setState({ addToSiriStyle: styles[0] });
    else this.setState({ addToSiriStyle: styles[index + 1] });
  }

  render() {
    const { shortcutInfo, shortcutActivityType, addToSiriStyle } = this.state;
    console.log(addToSiriStyle);

    return (
      <View style={styles.container}>
        <Text>Nagender You Rocks</Text>
        <Text>
          Click to Siri
        </Text>
        
        <AddToSiriButton
          buttonStyle={addToSiriStyle}
          onPress={() => {
            presentShortcut(opts1, ({ status }) => {
              console.log(`I was ${status}`);
            });
          }}
          shortcut={opts1}
        />
        <Button
          title="Swap Siri Button Theme"
          onPress={this.swapSiriButtonTheme.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
