# OneTapAuth

OneTapAuth is a secure and user-friendly authentication system built with **Next.js** and **Tailwind CSS**. It enables OTP-based login, allowing users to verify their phone numbers efficiently.

## Features
- Phone number authentication with OTP verification
- Country selection with automatic dialing code
- Interactive UI with Tailwind CSS
- Responsive design for all devices
- Secure OTP handling and validation

## Technologies Used
- **Next.js** – For building a fast and scalable front-end
- **Tailwind CSS** – For styling and responsive UI
- **libphonenumber-js** – For phone number validation
- **React Select** – For country selection dropdown

## Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/OneTapAuth.git
   cd OneTapAuth
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run the development server:**
   ```sh
   npm run dev
   ```
4. Open `http://localhost:3000` in your browser.

## How It Works
1. The user selects their country and enters a phone number.
2. Clicking **Get OTP** triggers OTP generation.
3. The user receives an OTP and enters it in the verification screen.
4. If the OTP is correct, authentication succeeds.

## Contributing
Feel free to contribute by forking the repository and submitting a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

