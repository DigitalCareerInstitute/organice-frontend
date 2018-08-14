import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  TextInput
} from "react-native";
import SingleView from "./SingleView";
import { createStackNavigator } from "react-navigation";
import { SearchBar, Icon } from "react-native-elements";
import SvgUri from "react-native-svg-uri";
// import { data } from "../db.js";

const styles = StyleSheet.create({
  background: {
    paddingBottom: 80,
    paddingTop: 24,
    backgroundColor: "#f9f9f9"
  },
  searchBarContainer: {
    // height: 200,
    // flex: 4
  },
  topIconsContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 2
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
    fontSize: 13,
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
  },
  modalBackground: {
    backgroundColor: "#bada55"
  },
  modalContainer: {
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 160,
    marginBottom: 160,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: "#484848",
    shadowOpacity: 0.8,
    shadowRadius: 100,
    elevation: 2,
    backgroundColor: "rgba(249,249,249, 0.9)",
    borderRadius: 4
  },
  modalContent: {
    alignSelf: "center",
    fontSize: 17,
    color: "#484848"
    // paddingBottom: 8
  },
  modalContentActive: {
    alignSelf: "center",
    fontSize: 17,
    color: "#ff7539"
    // paddingBottom: 8
  },
  parentContainerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

class ListView extends React.Component {
  constructor(props) {
    super(props);
    // use 'this.props.screenProps.scans' if you want to get the scans.
    this.state = {
      scans: this.props.screenProps.scans.scans || [],
      loading: true,
      modalSorting: false,
      sort: "category",
      search: ""
    };
  }
  static navigationOptions = {
    title: "List"
  };

  setModalSortingVisible(visible) {
    this.setState({ modalSorting: visible });
  }

  sortBy() {
    // console.log("sort", this.state.sort);
    let localScans = this.state.scans;
    if (this.state.sort === "date") {
      localScans.sort(function (a, b) {
        return a.date - b.date;
      });
    } else if (this.state.sort === "title") {
      localScans.sort(function compare(a, b) {
        const titleA = a.title.toUpperCase().trim();
        const titleB = b.title.toUpperCase().trim();

        let comparison = 0;
        if (titleA > titleB) {
          comparison = 1;
        } else if (titleA < titleB) {
          comparison = -1;
        }
        return comparison;
      });
    } else if (this.state.sort === "category") {
      localScans.sort(function compare(a, b) {
        const categoryA = a.category.toUpperCase().trim();
        const categoryB = b.category.toUpperCase().trim();

        let comparison = 0;
        if (categoryA > categoryB) {
          comparison = 1;
        } else if (categoryA < categoryB) {
          comparison = -1;
        }
        return comparison;
      });
    }

    this.setState(state => {
      state.scans = localScans;
      return state;
    });
  }

  setStateSorting = sortParameter => {
    this.setState(state => {
      state.sort = sortParameter;
      // console.log(state);
      return state;
    });

    this.sortBy();
  };

  findMatches(search) {
    this.setState({ search });
  }


  // componentWillMount() {
  //   this.setState(state => {
  //     state.scans = this.props.screenProps.scans
  //     console.log(this.state.scan
  //   })
  // }


  render() {
    // console.log(this.state.scans)
    const filteredList = this.state.scans.length > 1 ? this.state.scans.filter(
      item =>
        item.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
        (item.content ? item.content.toLowerCase().includes(this.state.search.toLowerCase()) : false)
    ) : this.state.scans;
    return (
      <View style={styles.background}>
        <SearchBar
          onChangeText={textInput => this.findMatches(textInput)}
          style={styles.searchBarContainer}
          containerStyle={{ backgroundColor: "#212121" }}
          inputStyle={{ backgroundColor: "#f9f9f9" }}
          round
          placeholder={"Search..."}
        />
        <View style={styles.topIconsContainer}>
          <TouchableOpacity style={styles.topIcons}>
            <Icon
              size={30}
              name="sort"
              type="material"
              color="#212121"
              onPress={() => {
                this.setModalSortingVisible(true);
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topIcons}>
            <Icon size={30} name="edit" type="material" color="#212121" />
          </TouchableOpacity>
        </View>
        {/* {console.log("DATA", data)} */}
        <FlatList
          data={filteredList}
          extraData={this.state.scans}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            let iconPath;

            if (item.category === "finance") {
              iconPath = require("../icons/label_finance.svg");
            } else if (item.category === "state") {
              iconPath = require("../icons/label_state.svg");
            } else if (item.category === "car_insurance") {
              iconPath = require("../icons/label_car_insurance.svg");
            } else if (item.category === "health") {
              iconPath = require("../icons/label_health.svg");
            } else {
              iconPath = require("../icons/label_health.svg");
            }

            return (
              <View style={styles.listOuterContainer}>
                <TouchableOpacity
                  style={styles.listInnerContainer}
                  // TODO  pass ID per props to the single view

                  onPress={() => this.props.navigation.navigate("singleView", { item })}
                >
                  <View style={{ alignSelf: "center", padding: 10 }}>
                    <SvgUri width={40} height={40} source={iconPath} />
                  </View>
                  <View style={{ flexShrink: 1 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <Text style={styles.listItemTitle}>{item.title}</Text>
                      <Text style={styles.listItemDate}>{item.content}</Text>
                    </View>
                    <View>
                      <Text style={styles.listItemDescription}>
                        {/* {item.scans.scans[0].recognizedText} */}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={item => item.title}
        />
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalSorting}
            onRequestClose={() => {
              alert("Modal has been closed.");
            }}
          >
            <View style={styles.modalContainer}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#484848"
                    // marginBottom: 5
                  }}
                >
                  Sort By
								</Text>

                <TouchableOpacity
                  onPress={() => {
                    this.setStateSorting("category");
                    setTimeout(() => {
                      this.setModalSortingVisible(false);
                    }, 150);
                  }}
                >
                  <Text
                    style={
                      this.state.sort === "category"
                        ? styles.modalContentActive
                        : styles.modalContent
                    }
                  >
                    Label
									</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setStateSorting("date");
                    setTimeout(() => {
                      this.setModalSortingVisible(false);
                    }, 150);
                  }}
                >
                  <Text
                    style={
                      this.state.sort === "date"
                        ? styles.modalContentActive
                        : styles.modalContent
                    }
                  >
                    Date
									</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setStateSorting("title");
                    setTimeout(() => {
                      this.setModalSortingVisible(false);
                    }, 150);
                  }}
                >
                  <Text
                    style={
                      this.state.sort === "title"
                        ? styles.modalContentActive
                        : styles.modalContent
                    }
                  >
                    Title
									</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const SingleViewNavigator = createStackNavigator(
  {
    listView: {
      screen: ListView,
      title: "ListView",
      navigationOptions: () => ({
        header: null
      })
    },
    singleView: {
      screen: SingleView,
      navigationOptions: () => ({
        headerTitle: "Single View",
        headerStyle: { backgroundColor: "#ff7539" },
        headerTitleStyle: { color: "#f9f9f9" },
        headerTintColor: "#f9f9f9"
      })
    }
  },
  {
    headerMode: "float"
  }
);

export default SingleViewNavigator;
