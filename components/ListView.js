import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Modal
} from "react-native";
import { SearchBar, Icon } from "react-native-elements";
import SvgUri from "react-native-svg-uri";
import { data } from "../db.js";

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
  modalContent: {
    fontSize: 20,
    letterSpacing: 2,
    color: "#f9f9f9"
  },
  modalContentSelected: {
    fontSize: 20,
    letterSpacing: 2,
    color: "#ff7539"
  }
});

class ListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalSorting: true,
      sort: "category",
      data
    };
  }

  static navigationOptions = {
    title: "List"
  };

  componentWillUpdate() {
    //this.sortBy();
  }

  setModalVisible(visible) {
    this.setState({ modalSorting: visible });
  }

  sortBy() {
    // console.log("sort", this.state.sort);
    if (this.state.sort === "date") {
      data.sort(function(a, b) {
        return a.date - b.date;
      });
    } else if (this.state.sort === "title") {
      data.sort(function compare(a, b) {
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
      data.sort(function compare(a, b) {
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
      state.data = data;
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

  render() {
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
          <TouchableOpacity style={styles.topIcons}>
            <Icon name="filter-list" type="material" color="#212121" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topIcons}>
            <Icon
              name="sort"
              type="material"
              color="#212121"
              onPress={() => {
                this.setModalVisible(true);
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topIcons}>
            <Icon name="edit" type="material" color="#212121" />
          </TouchableOpacity>
        </View>
        {/* {console.log("DATA", data)} */}
        <FlatList
          data={this.state.data}
          extraData={this.state.sort}
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
            }

            return (
              <View style={styles.listOuterContainer}>
                <TouchableOpacity style={styles.listInnerContainer}>
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
                      <Text style={styles.listItemDate}>{item.date}</Text>
                    </View>
                    <View>
                      <Text style={styles.listItemDescription}>
                        {item.content}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={item => item._id}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "center"
          }}
        >
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalSorting}
            onRequestClose={() => {
              alert("Modal has been closed.");
            }}
          >
            <View
              style={{
                margin: 100,
                backgroundColor: "#484848",
                padding: 22,
                borderRadius: 4,
                alignItems: "center"
              }}
            >
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.setStateSorting("category");
                  }}
                >
                  <Text
                    style={
                      this.state.sort === "category"
                        ? styles.modalContentSelected
                        : styles.modalContent
                    }
                  >
                    Label
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setStateSorting("date");
                  }}
                >
                  <Text
                    style={
                      this.state.sort === "date"
                        ? styles.modalContentSelected
                        : styles.modalContent
                    }
                  >
                    Date
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setStateSorting("title");
                  }}
                >
                  <Text
                    style={
                      this.state.sort === "title"
                        ? styles.modalContentSelected
                        : styles.modalContent
                    }
                  >
                    Title
                  </Text>
                </TouchableOpacity>

                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalSorting);
                  }}
                >
                  <Text>Close</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

export default ListView;
