# MendPath | Self Care, Anywhere

MendPath, a community-based empathic-central therapeutic app that helps you find yourself by connecting you with people who are going through the same struggles, specialized therapists, local therapy group sessions, and similar betterment communities that uplift each other. MendPath keeps track of your progress in a fun and visual way, which makes self betterment fun, realistic, and achievable. 

## Features
![ios-app](/assets/images/ios-app.png)

Test our empathic voice therapist [www.mendpath.us](https://www.mendpath.us/) (Use the voice-to-voice)

Our main features are on iOS, this was a work around to not dealing with iOS builds and the apple developer reviewing process, more details in the slide deck.

## Tech Stack
![tech-stack](/assets/images/tech-stack.png)

(Chat Page)  
1. Chat with our Empathic Virtual Therapist Assistant (Voice or Text)
- With the new Accessibility feature, you can open this in one click of a button. In case of an emergency, you can describe your current situation and emotions, this will connect you with local state patrol, the local suicide hotline, or connect with private/public therapists if needed.
- BECKS assessment, Mental Physical and Social Assessment. Empathically asks users with questions and understands the user when signing up, learning about their symptoms, triggers, medication, past childhood trauma, a way to understand the user to tailor certain groups and communities for the user and connect with specialized therapists for a diagnosis if severe.
- AI Assistant is trained with 12 Steps of AA (Anonymous Alcoholism), breathing techniques and grounding exercises, paired with walking the patient through the exercise and not only just giving them instructions. Broad way to calm the user down, help improve mental wellness, and if needed, contact the local state hotlines with a summary of the patients symptoms and severity, and prompts the user if they want to talk to an agent.
- Suggesting, Communities, Therapy Groups, where you can RSVP to, and will send an email to the host.
- Suggesting Activities to add a sense of accountability and ownership in the users actions, helps with procrastination and overcoming challenges step by step

(Activities Page)  

2. A page, specifically for setting and reaching realistic goals for self betterment.
- Examples can be, breathing techniques, self affirmations, talking to an amount of people (social anxiety), add a tally every night for sobriety, shows a streak of everyday actions. (Could tie this to the book atomic habits, where it helps build habits.  
- Will be populated from Chat Page, or added by suggestions from communicating through the chat page through RAG. 

(Notes Page)  

3. A page dedicated for self reflection, AI Chat can ask upon the homework and after completion, learn about the user and how the user felt, achieved and reflected upon to track their mental wellness.
- After each completion, could be stored into a different page or with homework page. Button to click after completion if user wants to reflect upon it (Highly Suggested)
- Data Visualization of how the user improved over time, track record of sobriety, people talked to, confidence in talking, how empathic the user is, depending on the user's symptoms.

(Explore Page)  

4. Page dedicated for users to find a sense of belonging in communities that are similar, sobriety, social anxiety, depression, domestic violence victims, bpd, multiple personality disorder.
- Advertises public/private therapeutic practices (a way to connect local businesses to users, charge a transaction) 
- Therapy group sessions, 
- Events,
- Groups of people who struggles on the same boat, promoting sense of belonging and uplifting individuals,

(Profile Page)  

5. A Page where user can customize their profile picture, name, number, bio, streaks, etc...


This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
