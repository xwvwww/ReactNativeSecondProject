import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  Image
} from "react-native";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [contacts, setContacts] = useState([
    {
      id: "1",
      name: "Иванов Иван Иванович",
      phone: "+7 (999) 123-45-67",
      photo: null
    },
    {
      id: "2",
      name: "Петров Петр Петрович",
      phone: "+7 (999) 765-43-21",
      photo: null
    }
  ]);

  const [contactsList, setContactsList] = useState(contacts);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleAddContact = () => {
    const newId = (contactsList.length + 1).toString();
    const newContactObject = {
      id: newId,
      name: name,
      phone: phone,
      photo: photo
    };
    setContactsList([...contactsList, newContactObject]);
    setModalVisible(false);
    setName("");
    setPhone("");
    setPhoto(null);
  };

  const handleDeleteContact = (id) => {
    const newContactsList = contactsList.filter((contact) => contact.id !== id);
    setContactsList(newContactsList);
  };

  const handleChoosePhoto = () => {
    // TODO: реализовать выбор фото
  };

  const renderContact = ({ item }) => (
    <TouchableOpacity onPress={() => handleDeleteContact(item.id)}>
      <Contact contact={item} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contactsList}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalHeaderText}>Отмена</Text>
            </TouchableOpacity>
            <Text style={styles.modalHeaderText}>Новый контакт</Text>
            <TouchableOpacity onPress={handleAddContact}>
              <Text style={styles.modalHeaderText}>Готово</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleChoosePhoto}>
              {photo ? (
                <Image style={styles.modalPhoto} source={photo} />
              ) : (
                <View style={styles.modalNoPhoto}>
                  <Text style={styles.modalNoPhotoText}>Добавить фото</Text>
                </View>
              )}
            </TouchableOpacity>
            <TextInput
              style={styles.modalInput}
              placeholder="ФИО"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Номер телефона"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Contact = ({ contact }) => {
  return (
    <View style={styles.contactContainer}>
      {contact.photo ? (
        <Image style={styles.contactPhoto} source={contact.photo} />
      ) : (
        <View style={styles.contactNoPhoto}>
          <Text style={styles.contactNoPhotoText}>
            {contact.name.slice(0, 2)}
          </Text>
        </View>
      )}
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{contact.name}</Text>
        <Text style={styles.contactPhone}>{contact.phone}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    paddingVertical: 8
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  contactPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16
  },
  contactNoPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center"
  },
  contactNoPhotoText: {
    fontSize: 18,
    color: "#888"
  },
  contactInfo: {
    flex: 1
  },
  contactName: {
    fontSize: 18,
    fontWeight: "bold"
  },
  contactPhone: {
    fontSize: 16,
    color: "#888"
  },
  addButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#1a73e8",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4
  },
  addButtonText: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold"
  },
  modalContainer: {
    flex: 1
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  modalContent: {
    alignItems: "center"
  },
  modalPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 16
  },
  modalNoPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 16,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center"
  },
  modalNoPhotoText: {
    fontSize: 16,
    color: "#888"
  },
  modalInput: {
    width: "100%",
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4
  }
});

export default App;
