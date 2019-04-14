## Email api

### Prerequisites
- node 
- npm 
- ngrok : you can get this from the following url
  - https://ngrok.com/
- sendgrid API key

### Setting up application
> Assuming you already have a sendgrid account and an api key

#### setting up local environment
- clone the repository and navigate to the folder 
- open a terminal inside the folder
- on terminal: run `npm install` to install the dependencies 
- Create a .env file in the root folder, and add the environment variables sent via email
- on terminal: run `npm start` 

> Good, now we are all set, Moving on to setup the webhook
#### setting up the webhook
- install ngrok, i just extracted in my downloads folder, you can choose a proper place
- from the folder you have extracted ngrok, on your terminal run `./ngrok http 2010`
  > ngrok creates a tunnel to your localhost for a given port, 2010 in this case
- copy the http or https url given by ngrok  

- on sendgrid dashbord, find the setting on the left menu > Mail settings.
  `https://app.sendgrid.com/settings/mail_settings`
- find **Event Notifications** and switch it on
- Click edit 
- past the ngrok url `+ /v1/webhook` under INTEGRATION TESTING TOOL
  > Eg: https://51da87f1.ngrok.io/v1/webhook ()
- click the tick on the right, so the URL will be saved 

### Testing

#### sending emails
- call `/v1/emails` with a payload as following 
> Change the email address to your email address
`{
  "to": "somone@gmail.com",
  "subject": "Tesging the apo",
  "content": ""
}`

- Once you call the endpoint,
- You should see ACCEPTED status in the response
> if you see QUEUED status, your mail will be dilivered on the next shedule 
- An email will send to you.
- sendgrid will call the webhook
- you will see the webhook payload in the terminal 
- Your status will be 

#### Sheduling
- Check `/src/config` to adjust the shedule timing and shedule range

