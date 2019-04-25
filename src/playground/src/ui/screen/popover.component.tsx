import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ViewProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemedComponentProps,
  ThemeType,
} from '@kitten/theme';
import {
  Button,
  Popover,
  PopoverProps,
} from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

export interface PopoverShowcaseModel {
  placement: string;
  visible: boolean;
}

const popovers: PopoverShowcaseModel[] = [
  {
    placement: 'right',
    visible: false,
  },
  {
    placement: 'right start',
    visible: false,
  },
  {
    placement: 'right end',
    visible: false,
  },
  {
    placement: 'left',
    visible: false,
  },
  {
    placement: 'left start',
    visible: false,
  },
  {
    placement: 'left end',
    visible: false,
  },
  {
    placement: 'top',
    visible: false,
  },
  {
    placement: 'top start',
    visible: false,
  },
  {
    placement: 'top end',
    visible: false,
  },
  {
    placement: 'bottom',
    visible: false,
  },
  {
    placement: 'bottom end',
    visible: false,
  },
  {
    placement: 'bottom start',
    visible: false,
  },
];

interface State {
  popovers: PopoverShowcaseModel[];
  scrollOffset: number;
}

class PopoverScreen extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Popover',
  };

  public state: State = {
    popovers: popovers,
    scrollOffset: 0,
  };

  private onExamplePress = (index: number): void => {
    const popoversCopy: PopoverShowcaseModel[] = this.state.popovers;
    popoversCopy[index].visible = !popoversCopy[index].visible;
    this.setState({ popovers: popoversCopy });
  };

  private renderPopover = (text: string): React.ReactElement<ViewProps> => {
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.popoverContent}>
        <Text style={themedStyle.popoverContentText}>{text}</Text>
      </View>
    );
  };

  private renderExample = (item: PopoverShowcaseModel, index: number): React.ReactElement<PopoverProps> => {
    const { themedStyle } = this.props;
    const placementLabel: string = item.placement.toUpperCase();

    return (
      <Popover
        scrollOffset={this.state.scrollOffset}
        key={index}
        placement={item.placement}
        visible={item.visible}
        style={themedStyle.popover}
        content={this.renderPopover(item.placement)}
        onRequestClose={() => this.onExamplePress(index)}>
        <Button
          style={themedStyle.tip}
          onPress={() => this.onExamplePress(index)}>
          {placementLabel}
        </Button>
      </Popover>
    );
  };

  private onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    this.setState({ scrollOffset: event.nativeEvent.contentOffset.y });
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;

    return (
      <ScrollView
        onScroll={this.onScroll}
        style={themedStyle.container}
        contentContainerStyle={themedStyle.content}>
        {this.state.popovers.map(this.renderExample)}
      </ScrollView>
    );
  }
}

export default withStyles(PopoverScreen, (theme: ThemeType) => ({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 8,
    paddingHorizontal: 96,
  },
  tip: {
    marginVertical: 14,
    marginHorizontal: 12,
  },
  text: {
    alignSelf: 'center',
    color: theme['color-black'],
  },
  popover: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popoverContent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 4,
  },
  popoverContentIcon: {
    tintColor: theme['color-white'],
    width: 16,
    height: 16,
    marginRight: 4,
  },
  popoverContentText: {
    color: theme['color-white'],
    fontSize: 12,
  },
}));
