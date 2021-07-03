import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableNativeFeedback,
  AsyncStorage,
} from 'react-native';
import withHeader from '../hoc/WithHeader';
import axios from '../config/axios';
import Loader from '../components/Loader';
import Input from '../components/Input';
import { DOCTORS_URL } from '../config/urls';
import { transformName, debounce } from '../config/helpers';
import styles from './Styles/doctorsStyles';
import DoctorDetails from './DoctorsDetails';

class DoctorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      doctors: [],
      selectedDoctor: null,
    };
  }

  componentDidMount() {
    this._getDoctors();
  }

  search = debounce((value) => {
    this._getDoctors(value);
  }, 1000);

  _getDoctors = async (query) => {
    this.setState({ isLoading: true });
    try {
      const token = await AsyncStorage.getItem('accessToken');
      axios.defaults.headers.common.Authorization = `JWT ${token}`;
      const response = await axios.get(DOCTORS_URL, {
        params: { q: query ? query : '' },
      });
      this.setState({ doctors: response.data, isLoading: false });
    } catch (e) {
      this.setState({
        alert: { messages: e.response.data.message, type: 'danger' },
        isLoading: false,
      });
    }
  };

  itemPressHandler = (itemId) => {
    this.setState((prevState) => {
      return {
        selectedDoctor: prevState.doctors.find((doctor) => doctor.id === itemId),
      };
    });
  };

  _renderItem = ({ item }) => (
    <TouchableNativeFeedback onPress={() => this.itemPressHandler(item.id)}>
      <View style={styles.itemContainer}>
        <View style={styles.doctorAvatar}>
          <Text style={styles.doctorAvatarText}>{transformName(item.name)}</Text>
        </View>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{item.name}</Text>
          <Text style={styles.doctorSpec}>{item.profile.specialization}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );

  _keyExtractor = (item) => item.id.toString();

  render() {
    const { doctors, selectedDoctor, isLoading } = this.state;
    return (
      <View>
        <Loader title="إحضار الأطباء" loading={isLoading} />
        <View style={styles.searchSection}>
          <View style={styles.searchInputContainer}>
            <Input
              inputStyles={styles.searchInput}
              placeholder="ابحث عن طبيب"
              icon="md-search"
              onChangeText={this.search}
            />
          </View>
        </View>

        <DoctorDetails
          selectedDoctor={selectedDoctor}
          closeModal={() => this.setState({ selectedDoctor: null })}
        />

        <ScrollView contentContainerStyle={styles.doctorsListContainer}>
          {doctors.length !== 0 ? (
            <FlatList
              data={doctors}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
            />
          ) : (
            <Text style={styles.noDoctorsText}>لا يوجد أطباء</Text>
          )}
        </ScrollView>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignContent: 'center'
//     }
// })
export default withHeader(DoctorScreen, 'الاطباء');
