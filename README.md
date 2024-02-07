# VTEX Tech Case by Alex Paris
This is a tech case of VTEX made by Alex Paris.

**Node** v20.11.0
**Npm** v8.18.0
Path `http://localhost:3000/` \

## Instructions
1. Execute the command `npm install` \
2. Run the following command `npm run dev`. \

## Commands
`npm run dev`: to execute the NextJS on development mode \

## Packages
**Typing**: _Typescript, ESlint and @paristech/eslint-config._ \

### Coding Test
>Part 1

>VTEX will automate part of its service process, and for that, it will use Zendesk software as a ticket control tool. The VTEX customer who wishes to open a service ticket must access a VTEX internal web page and fill a form with the basic information for opening the ticket: 
>Account Name: 
>Requester Email: 
>Subject: 
>Detailing:
>After fill these fields, the customer will click on a button to create the ticket. This ticket will be available in the Zendesk software, with the information filled in. If the ticket is created successfully, the user will receive visual feedback with the ticket id.

>You are asked to develop a web service that meets the needs above. The service must have a functional front, with a button that sends the information to Zendesk. To test the Zendesk functionalities, create a trial support account here. The tickets created in the form must be available on the Zendesk platform, with the basic information filled in. The Zendesk ticket API documentation is available here.


>Part 2

>A modification was requested in the previous service. Now, is expected that a dynamic form is generated based on the Subject of the ticket. The Subject field will open as a dropdown, showing the main VTEX modules that receive calls. Each Subject will bring a specific configuration of fields. To validate this functionality, we will make an initial version with only 3 of the main VTEX modules, plus an open option: 
>Orders 
>Payments 
>Catalog 
>Others
>The fields “account name” and “requester email” will stay fixed. The Subject field will also remain, but as a dropdown. In addition, there will also be the following fields, depending on the requested module:
>Orders: 
>Order number 
>Affecting all users? 
>Detailing 

>Payments: 
>Transaction number 
>Transaction status 
>Payment Acquirer 
>Detailing 

>Catalog: 
>SkuId 
>Print of the page
>Detailing 

>Others: 
>Detailing

>You are requested to create a form page with dynamic fields, which vary according to the selected Subject. Consider that all the information filled in the form must be sent in an intelligible and organized way to Zendesk.

>You will present the developed service in local mode, on your PC. You will have between 5 and 10 minutes to present the solution, in a Review model. No graphic presentation is required, just screen sharing. Real-time sharing of the functional service, the developed code, and the Zendesk portal with the created ticket will be requested. We also ask that you make the code available in a public repository for later evaluation.
>Tips: 
>Try to go through all the steps of developing the functionality; 
>If you get stuck in any part of the development, move on; 
>There is no right solution for this case;
>Feel free to use any development stacks, but be aware that your choice may be questioned by the evaluators.

