import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  FlatList,
  List,
  ListItem
} from "react-native";
import { SearchBar, Icon } from "react-native-elements";
import SvgUri from "react-native-svg-uri";

const styles = StyleSheet.create({
  background: {
    marginBottom: 100,
    paddingTop: 24,
    backgroundColor: "#f9f9f9"
  },
  searchBarContainer: {
    flex: 1
  },
  topIconsContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 10
  },
  topIcons: {
    paddingRight: 10
  },
  listOuterContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5
  },
  listInnerContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5
  },
  listItemTitle: {
    fontSize: 15,
    color: "#212121"
  },
  listItemDescription: {
    width: "100%",
    fontSize: 10,
    color: "#212121"
  },
  listItemDate: {
    fontSize: 10,
    color: "#ff7539"
  }
});

class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          title: "Postbank",
          label: "blalblala",
          date: "12 Mar 2018",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
          title: "Postbank1",
          label: "blalblala",
          date: "12 Mar 2018",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
          title: "Postbank2",
          label: "blalblala",
          date: "12 Mar 2018",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
          title: "Postbank3",
          label: "blalblala",
          date: "12 Mar 2018",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
          title: "Postbank4",
          label: "blalblala",
          date: "12 Mar 2018",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
          title: "Postbank5",
          label: "blalblala",
          date: "12 Mar 2018",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
          title: "Postbank6",
          label: "blalblala",
          date: "12 Mar 2018",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
          title: "Postbank7",
          label: "blalblala",
          date: "12 Mar 2018",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
          title: "Postbank8",
          label: "blalblala",
          date: "12 Mar 2018",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
          title: "Postbank9",
          label: "blalblala",
          date: "12 Mar 2018",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        }
      ]
    };
  }
  static navigationOptions = {
    title: "List"
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.background}>
        <SearchBar
          style={styles.searchBarContainer}
          containerStyle={{ backgroundColor: "#212121" }}
          inputStyle={{ backgroundColor: "#f9f9f9" }}
          round
          placeholder="Search.."
        />
        <View style={styles.topIconsContainer}>
          <View style={styles.topIcons}>
            <Icon name="filter-list" type="material" color="#212121" />
          </View>
          <View style={styles.topIcons}>
            <Icon name="sort" type="material" color="#212121" />
          </View>
          <View style={styles.topIcons}>
            <Icon name="edit" type="material" color="#212121" />
          </View>
        </View>
        <FlatList
          data={this.state.data}
          showsVerticalScrollIndicator={true}
          renderItem={({ item }) => (
            <View style={styles.listOuterContainer}>
              <View style={styles.listInnerContainer}>
                <View style={{ alignSelf: "center" }}>
                  <SvgUri
                    width={60}
                    height={60}
                    source={require("../icons/label_03.svg")}
                  />
                </View>
                <View style={{ flexShrink: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text style={styles.listItemTitle}>{item.title}</Text>
                    <Text style={styles.listItemDate}>{item.date}</Text>
                  </View>
                  <View>
                    <Text style={styles.listItemDescription}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.title}
        />
      </View>
    );
  }
}

export default ListView;
