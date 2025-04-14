
### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Emanuele-Sgroi/My-Wedding-Invitation-Website.git

   ```

   ```bash
   cd My-Wedding-Invitation-Website

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. **Set Up Firebase:**

   - Create a Firebase project and Firestore database.
   - Set up authentication for Google Sign-In.
   - In Firestore, create collections to store data. **View Example Below**

4. **Set Up Spotify API:**

   - Create a Spotify developer account and set up a new app to get your **Client ID** and **Client Secret**.
   - In yuor normal Spotify account, create a Spotify playlist where song suggestions will be added.

5. **Environment Variables:**

   Create a `.env.local` file in the root directory and add your environment variables:

```bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_public_firebase_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_public_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_public_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_public_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_public_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_public_firebase_app_id
FIREBASE_PRIVATE_KEY=your_private_firebase_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PROJECT_ID=your_firebase_project_id
# Email js
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_public_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_public_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_emailjs_public_key
# Spotify
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_PLAYLIST_ID=your_spotify_playlist_id
SPOTIFY_REDIRECT_URI=e.g. http://localhost:3000/api/auth/callback
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
# Other
GUEST_ACCESS_PASSWORD=e.g. TempPassword123
NEXT_PUBLIC_ADMIN_ACCESS_PASSWORD=e.g. AdminPassword123
NEXT_PUBLIC_ALLOWED_ADMIN_EMAIL=example@youradminemail.com
```

4.  **Run the Application:**
    To start the development server:

```bash
 npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the website locally.

---

### Example Firestore Structure

Below is an example of the Firestore structure:

#### **Guests Collection**

- **Collection**: `guests`
  - **Document ID**: `guest_id` (e.g., `1`, `2`, `3`)
    - `id`: _Number_ (e.g., `1`)
    - `name`: _String_ (e.g., `"John Doe"`)
    - `attending`: _String_ (`"Yes"`, `"No"`, `"Unknown"`)
    - `note`: _String_ (e.g., `""`)
    - `relationshipIds`: _Array of Numbers_ (e.g., `[2, 3]`)

#### **Relationships (Managed via `relationshipIds` in Guests)**

- Relationships are managed through the `relationshipIds` field in each guest document, referencing the `id`s of related guests.

#### **Payment Data Collection**

- **Collection**: `payment_data` (or `bank_details`)
  - **Document ID**: `currencies`
    - **Fields**:
      - **EUR**: _Map_
        - `iban`: _String_ (e.g., `"DE12345678901234567890"`)
        - `accountHolder`: _String_ (e.g., `"John Doe"`)
        - `bankName`: _String_ (e.g., `"Example Bank"`)
        - `bic`: _String_ (e.g., `"EXAMPLEDX"`)
      - **GBP**: _Map_
        - `sortCode`: _String_ (e.g., `"12-34-56"`)
        - `accountNumber`: _String_ (e.g., `"12345678"`)
        - `accountHolder`: _String_ (e.g., `"John Doe"`)
        - `bankName`: _String_ (e.g., `"Example Bank UK"`)
      - **PLN**: _Map_
        - `iban`: _String_ (e.g., `"PL27114020040000300201355387"`)
        - `accountHolder`: _String_ (e.g., `"John Doe"`)
        - `bankName`: _String_ (e.g., `"Example Bank Poland"`)
        - `bic`: _String_ (e.g., `"BREXPLPWXXX"`)

---
