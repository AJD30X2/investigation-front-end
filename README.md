# Investigation front end

Design Autonomous Financial Crime Investigation mutli-agent responsive website with html , css and react.js. At first, design the webpage for authentication identitfying themselves as junior/senior. Whereas , the suspected signal from the bank with primary alert reason is passed onto junior. Junior analysis the each and every case on click , analyses with help of Dectection Agent to detect further it is false postive or fraud transaction . Agent gather up the evidences of particular client from the database as per the level of authentication, if junior then only devices and geo-location evidences are fetch, orelse authenticated as senior then fetch compeleted detail as in beneficiary , history , KYC , devices and geo-location. Whereas after detection the client history is analysed by two hypothesis agent one arguing as genuine transaction and other arguing agent as fraud/scam. Later, to resolve the contradiction with each of the hypothesis there is an Contradiction agent. Further with the completeness the Investigator Agent returns the details regarding case completion , along with regulatory risk occured. Later, Next-Best Action agent recommeds the to block the account , monitor or escalate to senior with judiciary explanation. Aduit trail/Replay log generates the SAR/STR password protected document summarzing the fraud.
Build the website fronted in such a manner that it shows vertical nav tabs with named suspected alerts, audit-ready-explanation cases, cases stored for later reference , for junior cases raise to the seniors tab listing all escalated cases. With the horizontal nav bar with filter setting such as block , monitor and escalte , all futher setting according to you.
Styling and tone of website simple, calm, pleasant and professional with curved button instead of solid edge, instead to much overdone. Mixture of a cold dark coffee and its gradient ,make sure its not eye straining with mixture of dark and light mode. Generate web page screens for authentication page , Suspected alert tab, Escalated Cases tab Page, audit-ready cases tab page and Reference cases tab Page.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b2868f83-313a-4147-a0f9-93745d26a91a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
