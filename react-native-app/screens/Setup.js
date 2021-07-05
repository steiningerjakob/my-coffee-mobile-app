import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { userContext } from '../App';
import { grindersImages } from '../assets/grinders/grindersImages';
import { machinesImages } from '../assets/machines/machinesImages';
import Button from '../components/Button';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Screen from '../components/Screen';
import { Headline } from '../components/Text';
import {
  getGrinders,
  getMachines,
  getUserSetups,
  insertSetup,
  removeFromSetups,
} from '../util/apiFunctions';

const listItemStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#BC6C25',
    borderRadius: 4,
    padding: 20,
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomColor: '#F9DFC2',
    borderBottomWidth: 1,
    width: '90%',
    paddingLeft: 16,
    paddingRight: 16,
    overflow: 'hidden',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: 290,
  },
  selectionWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: 290,
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
  title: {
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
    maxWidth: 160,
  },
  icon: { marginLeft: 'auto' },
});

export default function Setup() {
  const navigation = useNavigation();
  const { id, firstName, refreshUserContext } = useContext(userContext);

  const [machines, setMachines] = useState([]);
  const [grinders, setGrinders] = useState([]);
  const [machinesSelectionIsActive, setMachinesSelectionIsActive] =
    useState(false);
  const [grindersSelectionIsActive, setGrindersSelectionIsActive] =
    useState(false);
  const [userMachine, setUserMachine] = useState('');
  const [userGrinder, setUserGrinder] = useState('');
  const [userSetups, setUserSetups] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getMachines().then((data) => {
        if (data) setMachines(data.machines);
      });
      getGrinders().then((data) => {
        if (data) setGrinders(data.grinders);
      });
      getUserSetups(id).then((data) => {
        if (data) {
          setUserSetups(data.userSetups);
        }
      });
    }, []),
  );

  function saveSetupButtonHandler() {
    insertSetup(id, userMachine.id, userGrinder.id);
    navigation.navigate('Profile');
  }

  function removeSetupButtonHandler(setupId) {
    removeFromSetups(setupId);
    setUserSetups([]);
  }

  return (
    <Screen>
      <Header
        label="Setup"
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      {userSetups.length === 0 ? (
        <Container fill>
          <Container>
            <Headline>Select your setup:</Headline>
          </Container>
          <ScrollView style={{ flex: 1 }}>
            <Container>
              <TouchableOpacity
                onPress={() =>
                  setMachinesSelectionIsActive(!machinesSelectionIsActive)
                }
              >
                <View style={listItemStyles.heading}>
                  <Headline>Select machine</Headline>
                  <AntDesign
                    name="down"
                    size={24}
                    color="black"
                    style={listItemStyles.icon}
                  />
                </View>
              </TouchableOpacity>
              {machinesSelectionIsActive === true &&
                machines.map((machine) => (
                  <TouchableOpacity
                    style={listItemStyles.selectionWrapper}
                    key={machine.id}
                    onPress={() => {
                      setUserMachine({
                        id: machine.id,
                        name: machine.machineName,
                      });
                      setMachinesSelectionIsActive(!machinesSelectionIsActive);
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={listItemStyles.image}
                      source={machinesImages[`image${machine.id}`]}
                    />
                    <Text style={listItemStyles.title}>
                      {machine.machineName}
                    </Text>
                  </TouchableOpacity>
                ))}
              {userMachine !== '' && (
                <View style={listItemStyles.wrapper}>
                  <View style={listItemStyles.item}>
                    <Image
                      resizeMode="contain"
                      style={listItemStyles.image}
                      source={machinesImages[`image${userMachine.id}`]}
                    />
                    <Text style={listItemStyles.title}>{userMachine.name}</Text>
                  </View>
                </View>
              )}
            </Container>
            <Container>
              <TouchableOpacity
                onPress={() =>
                  setGrindersSelectionIsActive(!grindersSelectionIsActive)
                }
              >
                <View style={listItemStyles.heading}>
                  <Headline>Select grinder</Headline>
                  <AntDesign
                    name="down"
                    size={24}
                    color="black"
                    style={listItemStyles.icon}
                  />
                </View>
              </TouchableOpacity>
              {grindersSelectionIsActive === true &&
                grinders.map((grinder) => (
                  <TouchableOpacity
                    style={listItemStyles.selectionWrapper}
                    key={grinder.id}
                    onPress={() => {
                      setUserGrinder({
                        id: grinder.id,
                        name: grinder.grinderName,
                      });
                      setGrindersSelectionIsActive(!grindersSelectionIsActive);
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={listItemStyles.image}
                      source={grindersImages[`image${grinder.id}`]}
                    />
                    <Text style={listItemStyles.title}>
                      {grinder.grinderName}
                    </Text>
                  </TouchableOpacity>
                ))}
              {userGrinder !== '' && (
                <View style={listItemStyles.wrapper}>
                  <View style={listItemStyles.item}>
                    <Image
                      resizeMode="contain"
                      style={listItemStyles.image}
                      source={grindersImages[`image${userGrinder.id}`]}
                    />
                    <Text style={listItemStyles.title}>{userGrinder.name}</Text>
                  </View>
                </View>
              )}
            </Container>
            <Container>
              <Button
                label="Save setup"
                disabled={!userGrinder || !userMachine}
                onPress={saveSetupButtonHandler}
              />
            </Container>
          </ScrollView>
        </Container>
      ) : (
        <Container fill>
          <ScrollView style={{ flex: 1 }}>
            <Container>
              {userSetups.map((setup) => (
                <View style={listItemStyles.container} key={setup.id}>
                  <View style={listItemStyles.heading}>
                    <Headline>{firstName}'s setup</Headline>
                  </View>
                  <View style={listItemStyles.wrapper}>
                    <View style={listItemStyles.item}>
                      <Image
                        resizeMode="contain"
                        style={listItemStyles.image}
                        source={machinesImages[`image${setup.machineId}`]}
                      />
                      <Text style={listItemStyles.title}>
                        {setup.machineName}
                      </Text>
                    </View>
                    <TouchableOpacity style={listItemStyles.icon}>
                      <AntDesign name="edit" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                  <View style={listItemStyles.wrapper}>
                    <View style={listItemStyles.item}>
                      <Image
                        resizeMode="contain"
                        style={listItemStyles.image}
                        source={grindersImages[`image${setup.grinderId}`]}
                      />
                      <Text style={listItemStyles.title}>
                        {setup.grinderName}
                      </Text>
                    </View>
                    <TouchableOpacity style={listItemStyles.icon}>
                      <AntDesign name="edit" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                  <Container>
                    <Button
                      label="remove setup"
                      onPress={() => removeSetupButtonHandler(setup.id)}
                    />
                  </Container>
                </View>
              ))}
            </Container>
          </ScrollView>
        </Container>
      )}
      <Footer />
    </Screen>
  );
}
