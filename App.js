import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from './Weather';

const API_KEY = "f7b2fe5458142faaf22d4356f3c79276";

export default class App extends Component {
  state = {
    isLoaded: false,
    error: false,
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position.coords.latitude, position.coords.longitude)
      },
      error => {
        this.setState({
          error: error,
        });
      }
    );
  }

  _getWeather = (lat, long) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APPID=${API_KEY}`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
    })
  }

  render() {
    const { isLoaded, error } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        { isLoaded ? (
          <Weather />
        ) : (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Getting the fucking weather</Text>
            {error ? <Text>{error}</Text> : null}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorText: {
    color: "red",
    backgroundColor: "transparent",
    marginBottom: 40,
  },
  loading: {
    flex: 1,
    backgroundColor: '#FDF6AA',
    justifyContent: 'flex-end',
    paddingLeft: 25
  },
  loadingText: {
    fontSize: 38,
    marginBottom: 24
  }
});
