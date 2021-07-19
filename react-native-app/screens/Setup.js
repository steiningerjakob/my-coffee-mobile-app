import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import { Alert, Image, Modal, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { userContext } from '../App';
import coverImage from '../assets/setup-cover.jpg';
import Button from '../components/Button';
import Container from '../components/Container';
import FloatingButton from '../components/FloatingButton';
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
  message: {
    color: '#BC6C25',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    padding: 24,
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
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    width: 336,
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
    marginTop: 12,
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
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 16,
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
  cancel: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 999,
  },
  flatlistMachine: {
    height: 392,
  },
  flatlistGrinder: {
    height: 244,
  },
});

export default function Setup() {
  const { id, firstName, refreshUserContext } = useContext(userContext);

  const [machinesSelectionIsActive, setMachinesSelectionIsActive] =
    useState(false);
  const [grindersSelectionIsActive, setGrindersSelectionIsActive] =
    useState(false);
  const [modalIsVisible, setModalVisible] = useState(false);

  const [machines, setMachines] = useState([]);
  const [grinders, setGrinders] = useState([]);
  const [userMachine, setUserMachine] = useState({});
  const [userGrinder, setUserGrinder] = useState({});
  const [userSetup, setUserSetup] = useState([]);

  async function saveSetupButtonHandler() {
    await insertSetup(id, userMachine.id, userGrinder.id);
    await getUserSetup(id).then((data) => {
      if (data) {
        setUserSetup(data.userSetup);
      }
    });
    setModalVisible(false);
  }

  async function updateSetupButtonHandler() {
    await updateSetup(id, userMachine.id, userGrinder.id);
    await getUserSetup(id).then((data) => {
      if (data) {
        setUserSetup(data.userSetup);
      }
    });
    setModalVisible(false);
  }

  function editSetupButtonHandler() {
    setModalVisible(true);
  }

  function removeSetupButtonHandler(setupId) {
    Alert.alert('Delete setup', 'Are you sure you want to delete your setup?', [
      {
        text: 'Cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          removeFromSetups(setupId);
          setUserSetup([]);
          setUserGrinder('');
          setUserMachine('');
        },
      },
    ]);
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
      {/* eslint-disable-next-line */}
      {!machines.length || !grinders.length || !userSetup ? (
        <Loading />
      ) : (
        <>
          <Image source={coverImage} style={setupStyles.cover} />
          <Spacer />
          {userSetup.length === 0 ? (
            <Container fill>
              <Container>
                <Text style={setupStyles.message}>
                  You haven't entered your setup yet...
                </Text>
              </Container>
              <Spacer />
              <Button label="create setup" onPress={editSetupButtonHandler} />
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
                      <Spacer />
                      <TouchableOpacity
                        onPress={() => removeSetupButtonHandler(setup.id)}
                      >
                        <Text style={setupStyles.clear}>Remove setup</Text>
                      </TouchableOpacity>
                    </Container>
                  </View>
                ))}
              </Container>
            </Container>
          )}
          {modalIsVisible && (
            <Modal
              visible={modalIsVisible}
              animationType="slide"
              presentationStyle="pageSheet"
              style={{ flex: 1 }}
            >
              <View style={setupStyles.cancel}>
                <Entypo
                  name="cross"
                  size={36}
                  color="#BC6C25"
                  onPress={() => setModalVisible(false)}
                />
              </View>
              <Spacer large />
              <Container fill>
                <Container>
                  <Headline>Select your setup:</Headline>
                </Container>
                <Spacer />
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
                    <View style={setupStyles.flatlistMachine}>
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
                    </View>
                  )}

                  {userMachine !== '' && !machinesSelectionIsActive && (
                    <View style={setupStyles.wrapper}>
                      <Image
                        resizeMode="contain"
                        style={setupStyles.image}
                        source={{ uri: userMachine.uri }}
                      />
                      <View style={setupStyles.textWrapper}>
                        <Text style={setupStyles.title}>
                          {userMachine.name}
                        </Text>
                      </View>
                    </View>
                  )}
                </Container>
                <Spacer />
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
                    <View style={setupStyles.flatlistGrinder}>
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
                    </View>
                  )}
                  {userGrinder !== '' && !grindersSelectionIsActive && (
                    <View style={setupStyles.wrapper}>
                      <Image
                        resizeMode="contain"
                        style={setupStyles.image}
                        source={{ uri: userGrinder.uri }}
                      />
                      <View style={setupStyles.textWrapper}>
                        <Text style={setupStyles.title}>
                          {userGrinder.name}
                        </Text>
                      </View>
                    </View>
                  )}
                </Container>
              </Container>
              {userSetup.length === 0 ? (
                <Container>
                  <FloatingButton
                    label="Save setup"
                    // eslint-disable-next-line
                    disabled={!userGrinder || !userMachine}
                    onPress={saveSetupButtonHandler}
                    bottom
                  />
                </Container>
              ) : (
                <Container>
                  <FloatingButton
                    label="Update setup"
                    // eslint-disable-next-line
                    disabled={!userGrinder || !userMachine}
                    onPress={updateSetupButtonHandler}
                    bottom
                  />
                </Container>
              )}
            </Modal>
          )}
        </>
      )}
      <Footer />
    </Screen>
  );
}
