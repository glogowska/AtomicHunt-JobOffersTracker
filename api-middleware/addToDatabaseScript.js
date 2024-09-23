import axios from 'axios';
import dotenv from 'dotenv';

// Loading environment variables from a .env file
dotenv.config();

// Function to add users using the register endpoint.
const addUsers = async () => {
  try {
    // Loop for creation of i users.
    for (let i = 1; i <= 10000; i++) {
      // Creating a user object with the required fields (every field has the loop execution number as the
      // firstname, lastname, username and password), the email is the loop.
      const user = {
        firstName: i.toString(),
        lastName: i.toString(),
        username: i.toString(),
        email: `${i}@example.com`,
        password: i.toString(),
      };

      // Send a POST request to the register endpoint (with the created user object).
      const response = await axios.post(`${process.env.API_URL}/api/auth/register`, user);
      console.log(`User ${i} registered successfully:`, response.data);
    }
  } catch (error) {
    if (error.response) {
      console.error('Error registering user:', error.response.data);
    } else {
      console.error('Error registering user:', error.message);
    }
  }
};


  // Function to add job offers for each user.
  const addJobOffersForUsers = async () => {

    try {
      for (let i = 1; i <= 10000; i++) { // Looping through users
        const username = i.toString(); // with a username as a string, e.g., "1", "2", etc.
  
        for (let j = 1; j <= 30; j++) { // Loop adding 30 job offers per user (one cycle adds one job offer to the current user).

        // Job offer template filling - with examplary data.
        const jobOfferTemplate = {
            status: "Interested",
            position: `Example_Position${j}`,
            location: `Example_Location${j}`,
            companyName: `Example_CompanyName${j}`,
            mode: "Remote",
            jobDescription: `Example_JobDescription${j}`,
            contactInfo: `Example_contactInformation${j}`,
            email: `Example_email${j}@example.com`,
            salary: `${j%5}0000`,
            dates: {
            "2024-08-08": ["First Interview"],
            "2024-08-15": ["Second Interview"]
            },
            url: `https://example${j}.com/job/software-engineer`,
            customNotes: "Follow up after first interview."
        };
            switch(j%5){
                case 0:
                    jobOfferTemplate.status="Interested";
                    break;
                case 1:
                    jobOfferTemplate.status="Applied";
                    break;
                case 2:
                    jobOfferTemplate.status="Offered";
                    break;
                case 3:
                    jobOfferTemplate.status="Interviewed";
                    break; 
                case 4:
                    jobOfferTemplate.status="Applied";
                    break;                     
            }
          // Send a POST request to the createJobOfferForUser endpoint (adding by username).
          const response = await axios.post(
            `${process.env.API_URL}/api/jobOffer/user/${username}`,
            jobOfferTemplate,
          );
          console.log(`Job offer ${j} for user ${username} added successfully:`, response.data);
        }
      }
    } catch (error) {
      if (error.response) {
        console.error('Error adding job offer:', error.response.data);
      } else {
        console.error('Error adding job offer:', error.message);
      }
    }
  };
  
  // Run both scripts.
  //addUsers();
  addJobOffersForUsers();