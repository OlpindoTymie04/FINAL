import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, Linking, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Card, Avatar } from 'react-native-paper';

const VCard = ({ owner }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [message, setMessage] = useState('');

  const handleAppointment = () => {
    alert(`Appointment requested for ${owner.name} on ${date.toDateString()} at ${time.toLocaleTimeString()}`);
  };

  const handleSendMessage = () => {
    Linking.openURL(`mailto:${owner.email}?subject=Contact&body=${message}`);
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Avatar.Image size={80} source={{ uri: owner.avatar }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.name}>{owner.name}</Text>
          <Text style={styles.jobTitle}>{owner.jobTitle}</Text>
          <Text style={styles.company}>{owner.company}</Text>
        </View>
      </View>
      <Card.Content style={styles.content}>
        <Text style={styles.about}>{owner.about}</Text>
        <Text style={styles.detail}><Text style={styles.boldText}>Phone:</Text> {owner.phoneNumber}</Text>
        <Text style={styles.detail}><Text style={styles.boldText}>Email:</Text> {owner.email}</Text>
        <Text style={styles.detail}><Text style={styles.boldText}>Business Hours:</Text> {owner.businessHours}</Text>
        <Text style={styles.detail}><Text style={styles.boldText}>Services:</Text></Text>
        <View style={styles.services}>
          {owner.services.map((service, index) => (
            <Text key={index} style={styles.serviceItem}>• {service}</Text>
          ))}
        </View>
        
        <Text style={styles.detail}><Text style={styles.boldText}>Products:</Text></Text>
         <Image size={80} source={require('./brew.jpg')} style={styles.logo} />
      </Card.Content>
      <View style={styles.qrCodeContainer}>
        <Image source={{ uri: owner.qrCode }} style={styles.qrCode} />
      </View>
      <Card.Content style={styles.appointment}>
        <Text style={styles.appointmentLabel}>Select Appointment Date:</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
          <Text style={styles.datePickerText}>{date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              setDate(selectedDate || date);
            }}
          />
        )}
        <Text style={styles.appointmentLabel}>Select Appointment Time:</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.datePicker}>
          <Text style={styles.datePickerText}>{time.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              setTime(selectedTime || time);
            }}
          />
        )}
        <Button title="Make an Appointment" onPress={handleAppointment} color="#4FC3F7" />
      </Card.Content>
      <Card.Content style={styles.contact}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message"
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send Message" onPress={handleSendMessage} color="#4FC3F7" />
      </Card.Content>
      <View style={styles.socialMedia}>
        {owner.socialMedia.map((account, index) => (
          <TouchableOpacity key={index} onPress={() => Linking.openURL(account.url)} style={styles.socialMediaLink}>
            <Image source={{ uri: account.icon }} style={styles.socialMediaIcon} />
            <Text style={styles.socialMediaText}>{account.platform}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );
};

const sampleOwner = {
  name: 'Olpindo, Tymie C.',
  jobTitle: 'Graphics Designer',
  company: 'PlasTech Corp',
  phoneNumber: '09455214996',
  email: 'tymieolpindo072@gmail.com',
  about: "Hello! I'm Tymie Olpindo, a passionate graphic designer I specialize in web design, crafting unique visuals branding and logo creation, and creating cohesive and impactful visual identities that resonate with audiences.",
  businessHours: 'Mon-Fri: 9am - 5pm',

  
  services: ['Web Development', 'Mobile App Development', 'Cloud Solutions'],
  products: 'https://scontent.fmnl8-3.fna.fbcdn.net/v/t39.30808-1/415925768_122094074660179972_5611125148054613292_n.jpg?stp=dst-jpg_p200x200&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHVWbxMgQSSvvN6ITb_XKl0RB8WzdhmNv1EHxbN2GY2_ZJpPNtzpO_sQLnNZRO1sH3q4o2YHBS35Db2EASJ1EEc&_nc_ohc=XtP3ZrYbO8MQ7kNvgHjlP3T&_nc_ht=scontent.fmnl8-3.fna&oh=00_AYCEIyTsP-Uud9cZSVUeqFLMqkQn6yG7bFFq4DCzi4Jamg&oe=664969B8', 
  
  
  qrCode: 'https://scontent.xx.fbcdn.net/v/t1.15752-9/440844558_704450921713036_8620368254142803708_n.png?stp=dst-png_p206x206&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFJK2IYYyoHIL56EykB6xSwwuSz3lggSmzC5LPeWCBKbKoOTammJ9tRkT4upobzJxGXSG95CWd_AXErY5zoDaQH&_nc_ohc=9IFCVxK58sEQ7kNvgGPcHQR&_nc_oc=AdjQHdyN5k4JBsVGM4q0eAJC5mOab3cw3sZiABElRLT4HMjs3uPwNcIKbuemdXUObZAj74kcZjMKl07PDX74CoTc&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QGhQEd9BMAPUo4nyMXVwNo-x4jojQsFbg7af6r8zgnnaw&oe=666B04B7',

  avatar: 'https://scontent.fmnl8-3.fna.fbcdn.net/v/t39.30808-1/431488067_1095338445032231_8053444545606884561_n.jpg?stp=dst-jpg_s200x200&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEcrbT9gWKPWfSKxtQ0GTR5ob-QLeQhvOihv5At5CG86Gz0lO9H4GVoN1ndwl94hqJrE0jiA59yayKndTOajdwt&_nc_ohc=JbExAOTIs_QQ7kNvgFd9RWm&_nc_ht=scontent.fmnl8-3.fna&oh=00_AYBlSWOLhJOwW8e1DLxQR4svradJKsd_ll4MQL9Os_0mLw&oe=66498878',

  socialMedia: [
    { platform: 'Facebook', url: 'https://www.facebook.com/OlpindoTymie29', icon: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/f1a2b5a4e002935c0ac1e6dcf8d25270' },
    { platform: 'Instagram', url: 'https://www.instagram.com/tymieeeee_/', icon: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/34c9c61018544afbba6f469785acd230' },
    { platform: 'GitHub', url: '', icon: 'https://via.placeholder.com/24?text=GH' }
  ]
};
 
export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <VCard owner={sampleOwner} />
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 15,
    borderColor: '#000',
    backgroundColor: '#FFE082',
    elevation: 3,
    shadowOffset: {width: 1 , height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    marginHorizontal: 4,
    marginVertical: 6,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'rgb(234,182,118)',
    borderColor: '#000',
    elevation: 3,
    shadowOffset: {width: 1 , height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  avatar: {
    marginRight: 15,
  },
  headerText: {
    flex: 1,
    
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  jobTitle: {
    fontSize: 16,
    color: '#777',
  },
  company: {
    fontSize: 16,
    color: '#777',
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  about: {
    fontSize: 16,
    width: 260,
    marginBottom: 40,
    
  },
  logo: {
    width: 100,
    height: 100,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  boldText: {
    fontWeight: 'bold',
  },
  services: {
    marginTop: 10,
  },
  serviceItem: {
    fontSize: 16,
    color: '#555',
  },
  qrCodeContainer: {
    alignItems: 'center',
    padding: 20,
    
  },
  qrCode: {
    width: 100,
    height: 100,
  },
  appointment: {
    padding: 20,
  },
  appointmentLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  datePicker: {
    backgroundColor: '#FFE0B2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 16,
  },
  contact: {
    padding: 20,
  },
  textInput: {
    borderColor: '#ccc',
    backgroundColor: '#FFE0B2',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  socialMedia: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  socialMediaLink: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  socialMediaIcon: {
    width: 24,
    height: 24,
  },
  socialMediaText: {
    marginTop: 5,
    fontSize: 12,
    color: '#555',
  },
});