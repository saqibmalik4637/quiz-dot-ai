import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Privacy Policy</Text>
      <Text style={styles.lastUpdated}>Last updated: May 23, 2024</Text>

      <Text style={styles.sectionHeading}>1. Information We Collect</Text>
      <Text style={styles.text}>
        We may collect information about you in a variety of ways. The information we may collect via the application includes:
      </Text>
      <Text style={styles.subHeading}>Personal Data</Text>
      <Text style={styles.text}>
        - <Text style={styles.bold}>Name:</Text> To personalize your experience and display it in the app.
        {"\n"}- <Text style={styles.bold}>Age:</Text> To ensure age-appropriate content and comply with legal requirements.
        {"\n"}- <Text style={styles.bold}>Country:</Text> To provide localized content and improve user experience.
      </Text>

      <Text style={styles.sectionHeading}>2. Use of Your Information</Text>
      <Text style={styles.text}>
        We use the information we collect in the following ways:
      </Text>
      <Text style={styles.text}>
        - To personalize your experience and provide content tailored to your preferences.
        {"\n"}- To track your progress and performance in quizzes.
        {"\n"}- To improve our app and provide better services.
        {"\n"}- To communicate with you about updates, new features, and other information related to the app.
        {"\n"}- To comply with legal obligations.
      </Text>

      <Text style={styles.sectionHeading}>3. Disclosure of Your Information</Text>
      <Text style={styles.text}>
        We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
      </Text>
      <Text style={styles.text}>
        - <Text style={styles.bold}>By Law or to Protect Rights:</Text> If we believe the release of information about you is necessary to respond to legal processes, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
        {"\n"}- <Text style={styles.bold}>Business Transfers:</Text> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
      </Text>

      <Text style={styles.sectionHeading}>4. Security of Your Information</Text>
      <Text style={styles.text}>
        We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
      </Text>

      <Text style={styles.sectionHeading}>5. Policy for Children</Text>
      <Text style={styles.text}>
        We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible. If you become aware of any data we have collected from children under age 13, please contact us at mohdsaqibmalik43@gmail.com.
      </Text>

      <Text style={styles.sectionHeading}>6. Changes to This Privacy Policy</Text>
      <Text style={styles.text}>
        We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page.
      </Text>

      <Text style={styles.sectionHeading}>7. Contact Us</Text>
      <Text style={styles.text}>
        If you have questions or comments about this Privacy Policy, please contact us at:
        {"\n"}Email: mohdsaqibmalik43@gmail.com
        {"\n"}
        {"\n"}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lastUpdated: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default PrivacyPolicyScreen;
