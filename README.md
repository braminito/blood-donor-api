# blood-donor-api
An API for accessing data in firestore backend to fulfill Bangkit 2021 Capstone Project

This API was created using node.js with express framework

## Deploying API
1. Create Firestore collection named oraganizations
2. Create Index
3.  1. Go to Firestore -> Indexes
    2. Create Index
    3. Fill collection ID with _**organizations**_
    4. Fill field path with _**bloodType**_ and _**supply**_
    5. Choose Collection as Query scope
    6. Click Create
4. Copy blood-donor-api to GCP console
5. Go to blood-donor-api folder
6. Run deploy.sh
   * deploy.sh will failed the first few times due to services that haven't been enabled, just follow the message instruction in the console to enable service and rerun deploy.sh
7. Wait a few minutes, after completion the API is ready to use

## API usage
This API is deployed through Cloud Run.

Go to Cloud Run in GCP and click _**blood-donor-api**_ then copy the URL. This URL will be used to access the API and will be reffered as **[url]**.

_**Rule of Thumb**_: except **[url]**, change everything that have **[]** (bracket) with the appropriate value. 

### POST Request
To add data to Firestore use: **[url]/organizations/**

POST request in json and must contain:
**{
    "code": "[organization code]",
    "organizationName": "[organization name]",
    "subDistrict": "[sub-district]",
    "contact": "[contact]",
    "bloodType": "[blood type]",
    "supply": [supply amount]
}**

### GET Request
1. To fetch all data in collection use: **[url]/organizations/**
2. To fetch all data for specifed organization use: **[url]/organizations/[organization code]**
   * change [organization code] with target organization code
3. To fetch all data for specified blood type use: **[url]/organizations/blood-type/[blood type]**
   * change [blood type] with target blood type
   * to filter out empty supply use: **[url]/organizations/blood-type/[blood type]?excludeSupply=0**
4. To fetch specified blood type in an organization use: **[url]/organizations/[organization code]/[blood type]**
   * change [organization code] with target organization code
   * change [blood type] with target blood type

### DELETE Request
1. To delete specified organization data use: **[url]/organizations/[organization code]**
   * change [organization code] with target organization code
2. To delete specified blood type in an organization use: **[url]/organizations/[organization code]/[bloodtype]**
   * change [organization code] with target organization code
   * change [blood type] with target blood type
  
### PUT Request
To update data use: **[url]/organizations/[organization code]/[blood type]**
  * This request only able to update data with specified organization and blood type
  * change [organization code] with target organization code
  * change [blood type] with target blood type

PUT Request in json and must conain:
**{
    "code": "[organization code]",
    "organizationName": "[organization name]",
    "subDistrict": "[sub-district]",
    "contact": "[contact]",
    "bloodType": "[blood type]",
    "supply": [supply amount]
}**

## Reference

1. https://www.youtube.com/watch?v=M53VqNtioxE&t=371s
2. https://stackoverflow.com/questions/52100103/getting-all-documents-from-one-collection-in-firestore
