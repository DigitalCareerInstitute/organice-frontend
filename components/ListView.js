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
    color: "#f9f9f9"
  }
});

class ListView extends React.Component {
  state = {
    modalSorting: false,
    sort: "category"
  };
  static navigationOptions = {
    title: "List"
  };

  setModalVisible(visible) {
    this.setState({ modalSorting: visible });
  }

  render() {
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
          data={data}
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
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.modalContent}>Label</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.modalContent}>Date</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.modalContent}>Upcoming</Text>
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
