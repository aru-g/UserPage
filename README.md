# UserPage
1. Download and extract the code
2. Create a MongoDb Database called prop, and a collection in it called property with the following attributes - 
  pid : contains the property id
  reg_date : in the form "dd/mm/yyyy"
  type : either building/agriculture
  location : in the form "CITY_STATE"
  status : either "Created", "Registered", or "Intended for Sale"
  view_type : either "None", "Public", or "Private"
  dimensions : in the form ddddxdddd
  geo : latitude and longitude
  owner : names of the owner(s)
  private : either "None" or usernames of people the property is on sale for
3. go to root directory on cmd prompt and run npm install
4. run node server.js cmd
5. on browser, browse to "localhost:8081"
