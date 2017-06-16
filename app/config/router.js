import React from "react";
import {
  TabNavigator,
  StackNavigator,
  NavigationActions
} from "react-navigation";
import { Icon } from "react-native-elements";
import { TouchableOpacity, Text } from "react-native";

import Feed from "../screens/Feed";
import ComposeNewChat from "../screens/ComposeNewChat";
import UserDetail from "../screens/UserDetail";
import Me from "../screens/Me";
import { users } from "../config/data";

export const FeedStack = StackNavigator({
  MessageList: {
    screen: Feed,
    navigationOptions: ({ navigation }) => ({
      title: "MessageList",
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Compose");
          }}
        >
          <Text style={{ color: "red" }}>New Chat</Text>
        </TouchableOpacity>
      )
    })
  },
  Details: {
    screen: UserDetail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`
    })
  }
});

export const Tabs = TabNavigator({
  Feed: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: "Feed",
      tabBarIcon: ({ tintColor }) =>
        <Icon name="list" size={35} color={tintColor} />
    }
  },
  Me: {
    screen: Me,
    navigationOptions: {
      tabBarLabel: "Me",
      tabBarIcon: ({ tintColor }) =>
        <Icon name="account-circle" size={35} color={tintColor} />
    }
  }
});

export const ComposeStack = StackNavigator({
  ComposeNewChat: {
    screen: ComposeNewChat,
    navigationOptions: ({ navigation }) => ({
      title: "Compose",

      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(
              NavigationActions.reset({
                index: 0,
                key: null,
                actions: [
                  NavigationActions.navigate({
                    routeName: "Tabs",
                    action: NavigationActions.navigate({
                      routeName: "MessageList",
                      action: NavigationActions.navigate({
                        routeName: "Details",
                        params: { ...users[0] }
                      })
                    })
                  })
                ]
              })
            );
          }}
        >
          <Text style={{ color: "red" }}>Start Chat1</Text>
        </TouchableOpacity>
      ),

      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(
              NavigationActions.reset({
                index: 0,
                key: null,
                actions: [
                  NavigationActions.navigate({
                    routeName: "Tabs",
                    action: NavigationActions.navigate({
                      routeName: "Details",
                      params: { ...users[0] }
                    })
                  })
                ]
              })
            );
          }}
        >
          <Text style={{ color: "red" }}>Start Chat2</Text>
        </TouchableOpacity>
      )
    })
  }
});

export const Root = StackNavigator(
  {
    Tabs: {
      screen: Tabs
    },
    Compose: {
      screen: ComposeStack
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);
