# beanify - my coffee bean mobile app

## Description

beanify is a mobile application to find, rate and store your favourite coffee beans. Note that this application was created for educational purposes and therefore not all data may be accurate.

### WHY I created this app

As a coffee aficionado, I like to try out different coffee beans on my endeavour to make the perfect espresso. However, I find it hard to keep track of which beans I like, which beans work well / not well on my machine, and what is the best way to prepare them, and I have not yet found a suitable tool that helps me do this. This is why I want to create my own mobile app that helps me (and potentially others too) to manage my coffee preferences effectively.

### WHAT this app offers

1. **profile section** with the ability to
  * add and edit *profile information* (e.g. profile image)
  * view list of **rated/reviewed coffee beans**
  * add *preferences* with regards to flavour profile and bean type, and get *recommendations* based on these preferences            
  * add own *setup*, i.e. machine and grinder
2. **curated list of coffee beans** incl. user ratings and reviews, including search and sort functionality
3. **detail page** per product, including characteristics such as flavour profile (body, acidity, intensity), roaster and bean type (Arabica vs. Robusta)
  * existing user ratings and reviews
  * ability to add coffee beans to your list, **rate and review**
4. ability to **scan barcode** to find coffee beans
5. **map of curated coffee bean stores** in Vienna

Take a look at these screenshots for some impressions of the functionalities (order as above):

<p float="left">
  <img src="https://user-images.githubusercontent.com/77202477/126644796-8a4e75e6-ef23-488d-bc7a-3eaecff55fd0.png" width="160">
  <img src="https://user-images.githubusercontent.com/77202477/126640513-83bbf176-153a-4438-8f15-350048ec7348.png" width="160">
  <img src="https://user-images.githubusercontent.com/77202477/126642027-80180667-fd92-49d3-bc7d-515acae999b6.png" width="160">
  <img src="https://user-images.githubusercontent.com/77202477/126645406-55488328-63cf-4490-81d5-5a38e3f6a253.png" width="160">
  <img src="https://user-images.githubusercontent.com/77202477/126645890-e82086e1-4707-4fe6-be88-d34b6a74733e.png" width="160">
  <img src="https://user-images.githubusercontent.com/77202477/126645957-7b3eb866-d97b-4132-b08d-75dfd77f091f.png" width="160">
  <img src="https://user-images.githubusercontent.com/77202477/126646004-a410b6e4-0496-4478-b1e3-1e79393ad88b.png" width="160">
  <img src="https://user-images.githubusercontent.com/77202477/126645533-a8f6fb24-15b1-4cd2-b057-d2f9cc322337.png" width="160">
  <img src="https://user-images.githubusercontent.com/77202477/126645672-ffcd2d51-0914-422a-a9a2-239654bf8146.png" width="160">
</p>

## HOW this app was created, i.e. technologies used

- React Native with Expo for frontend, including
  - react-native-maps for mapview
  - Expo BarCodeScanner
- Next.js for API connection to database (deployed on Heroku)
- PostgreSQL database (see schema below)
- User authentication and authorization:
  - argon2 for password hashing
  - crypto for token generation
  - cookie for cookie serialization
- Jest for testing

### Database schema

![Screenshot 2021-07-22 at 12 44 35](https://user-images.githubusercontent.com/77202477/126639517-fd8c0ae2-ab60-4157-9ead-c570760a0613.png)
