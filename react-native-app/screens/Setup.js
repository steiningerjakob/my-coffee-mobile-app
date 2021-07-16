import { AntDesign, Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { userContext } from '../App';
import coverImage from '../assets/setup-cover.jpg';
import Button from '../components/Button';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Screen from '../components/Screen';
import Spacer from '../components/Spacer';
import { Headline } from '../components/Text';
import {
  getGrinders,
  getMachines,
  getUserSetups as getUserSetup,
  insertSetup,
  removeFromSetups,
  updateSetup,
} from '../util/apiFunctions';

const setupStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#BC6C25',
    borderRadius: 4,
    padding: 12,
    width: 320,
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomColor: '#F9DFC2',
    borderBottomWidth: 1,
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    overflow: 'hidden',
  },
  headline: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 12,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    overflow: 'hidden',
  },
  selectionWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '100%',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    marginRight: 12,
    height: 48,
    width: 48,
  },
  cover: {
    height: 150,
    width: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
    maxWidth: 160,
  },
  clear: {
    color: '#BC6C25',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
  },
  icon: { marginLeft: 'auto' },
});

export default function Setup() {
  const navigation = useNavigation();
  const { id, firstName, refreshUserContext } = useContext(userContext);
  const [editing, setEditing] = useState(false);

  const [machines, setMachines] = useState([]);
  const [grinders, setGrinders] = useState([]);
  const [machinesSelectionIsActive, setMachinesSelectionIsActive] =
    useState(false);
  const [grindersSelectionIsActive, setGrindersSelectionIsActive] =
    useState(false);
  const [userMachine, setUserMachine] = useState({});
  const [userGrinder, setUserGrinder] = useState({});
  const [userSetup, setUserSetup] = useState([]);

  function saveSetupButtonHandler() {
    insertSetup(id, userMachine.id, userGrinder.id);
    navigation.navigate('Profile');
  }

  function editSetupButtonHandler() {
    setUserSetup([]);
    setEditing(!editing);
  }

  function updateSetupButtonHandler() {
    updateSetup(id, userMachine.id, userGrinder.id);
    setEditing(!editing);
    navigation.navigate('Profile');
  }

  function removeSetupButtonHandler(setupId) {
    removeFromSetups(setupId);
    setUserSetup([]);
  }

  useFocusEffect(
    useCallback(() => {
      getMachines().then((data) => {
        if (data) setMachines(data.machines);
      });
      getGrinders().then((data) => {
        if (data) setGrinders(data.grinders);
      });
      getUserSetup(id).then((data) => {
        if (data) {
          setUserSetup(data.userSetup);
        }
      });
    }, [id]),
  );

  return (
    <Screen>
      <Header
        label="Setup"
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      {!machines.length || !grinders.length || !userSetup ? (
        <Loading />
      ) : (
        <ScrollView>
          <Image source={coverImage} style={setupStyles.cover} />
          <Spacer />
          {userSetup.length === 0 ? (
            <Container fill>
              <Container>
                <Headline>Select your setup:</Headline>
              </Container>
              <Container>
                <TouchableOpacity
                  onPress={() =>
                    setMachinesSelectionIsActive(!machinesSelectionIsActive)
                  }
                >
                  <View style={setupStyles.heading}>
                    <Text style={setupStyles.headline}>Select machine</Text>
                    <AntDesign
                      name="down"
                      size={24}
                      color="black"
                      style={setupStyles.icon}
                    />
                  </View>
                </TouchableOpacity>
                {machinesSelectionIsActive === true && (
                  <FlatList
                    data={machines}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={setupStyles.selectionWrapper}
                        onPress={() => {
                          setUserMachine({
                            id: item.id,
                            name: item.machineName,
                            uri: item.uri,
                          });
                          setMachinesSelectionIsActive(
                            !machinesSelectionIsActive,
                          );
                        }}
                      >
                        <Image
                          resizeMode="contain"
                          style={setupStyles.image}
                          source={{ uri: item.uri }}
                        />
                        <Text style={setupStyles.title}>
                          {item.machineName}
                        </Text>
                        <Feather
                          name="circle"
                          size={24}
                          color="lightgray"
                          style={setupStyles.icon}
                        />
                      </TouchableOpacity>
                    )}
                  />
                )}
                {userMachine !== '' && (
                  <View style={setupStyles.wrapper}>
                    <Image
                      resizeMode="contain"
                      style={setupStyles.image}
                      source={{ uri: userMachine.uri }}
                    />
                    <Text style={setupStyles.title}>{userMachine.name}</Text>
                    <Feather
                      name="check-circle"
                      size={24}
                      color="#BC6C25"
                      style={setupStyles.icon}
                    />
                  </View>
                )}
              </Container>
              <Container>
                <TouchableOpacity
                  onPress={() =>
                    setGrindersSelectionIsActive(!grindersSelectionIsActive)
                  }
                >
                  <View style={setupStyles.heading}>
                    <Text style={setupStyles.headline}>Select grinder</Text>
                    <AntDesign
                      name="down"
                      size={24}
                      color="black"
                      style={setupStyles.icon}
                    />
                  </View>
                </TouchableOpacity>
                {grindersSelectionIsActive === true && (
                  <FlatList
                    data={grinders}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={setupStyles.selectionWrapper}
                        onPress={() => {
                          setUserGrinder({
                            id: item.id,
                            name: item.grinderName,
                            uri: item.uri,
                          });
                          setGrindersSelectionIsActive(
                            !grindersSelectionIsActive,
                          );
                        }}
                      >
                        <Image
                          resizeMode="contain"
                          style={setupStyles.image}
                          source={{ uri: item.uri }}
                        />
                        <Text style={setupStyles.title}>
                          {item.grinderName}
                        </Text>
                        <Feather
                          name="circle"
                          size={24}
                          color="lightgray"
                          style={setupStyles.icon}
                        />
                      </TouchableOpacity>
                    )}
                  />
                )}
                {userGrinder !== '' && (
                  <View style={setupStyles.wrapper}>
                    <Image
                      resizeMode="contain"
                      style={setupStyles.image}
                      source={{ uri: userGrinder.uri }}
                    />
                    <Text style={setupStyles.title}>{userGrinder.name}</Text>
                    <Feather
                      name="check-circle"
                      size={24}
                      color="#BC6C25"
                      style={setupStyles.icon}
                    />
                  </View>
                )}
              </Container>
              {editing === false ? (
                <Container>
                  <Button
                    label="Save setup"
                    disabled={!userGrinder || !userMachine}
                    onPress={saveSetupButtonHandler}
                  />
                </Container>
              ) : (
                <Container>
                  <Button
                    label="Save setup"
                    disabled={!userGrinder || !userMachine}
                    onPress={updateSetupButtonHandler}
                  />
                </Container>
              )}
            </Container>
          ) : (
            <Container fill>
              <Container>
                {userSetup.map((setup) => (
                  <View style={setupStyles.container} key={setup.id}>
                    <View style={setupStyles.heading}>
                      <Text style={setupStyles.headline}>
                        {firstName}'s setup
                      </Text>
                    </View>
                    <View style={setupStyles.wrapper}>
                      <View style={setupStyles.item}>
                        <Image
                          resizeMode="contain"
                          style={setupStyles.image}
                          source={{ uri: setup.machineUri }}
                        />
                        <Text style={setupStyles.title}>
                          {setup.machineName}
                        </Text>
                      </View>
                    </View>
                    <View style={setupStyles.wrapper}>
                      <View style={setupStyles.item}>
                        <Image
                          resizeMode="contain"
                          style={setupStyles.image}
                          source={{ uri: setup.grinderUri }}
                        />
                        <Text style={setupStyles.title}>
                          {setup.grinderName}
                        </Text>
                      </View>
                    </View>
                    <Container>
                      <Spacer />
                      <Button
                        label="edit setup"
                        onPress={editSetupButtonHandler}
                      />
                      <TouchableOpacity onPress={removeSetupButtonHandler}>
                        <Text style={setupStyles.clear}>Remove setup</Text>
                      </TouchableOpacity>
                    </Container>
                  </View>
                ))}
              </Container>
            </Container>
          )}
        </ScrollView>
      )}
      <Footer />
    </Screen>
  );
}
