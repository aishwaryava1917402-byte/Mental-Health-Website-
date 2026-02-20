# How to Deploy "One Thought for Therapy" on Render.com

This guide will help you deploy your mental health assessment website for FREE on Render.com.

---

## Step 1: Create a Render Account

1. Go to [render.com](https://render.com)
2. Click **"Get Started for Free"**
3. Sign up using your GitHub account (easiest option)

---

## Step 2: Create a Free MongoDB Database

Since your app needs a database, you'll need a free MongoDB:

1. Go to [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Click **"Build a Database"** → Select **"FREE" (M0 Sandbox)**
4. Choose any cloud provider and region
5. Click **"Create Cluster"**
6. Set up database access:
   - Go to "Database Access" → "Add New Database User"
   - Create a username and password (save these!)
7. Allow network access:
   - Go to "Network Access" → "Add IP Address"
   - Click **"Allow Access from Anywhere"** (0.0.0.0/0)
8. Get your connection string:
   - Go to "Database" → "Connect" → "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.xxxxx.mongodb.net/`)
   - Replace `<password>` with your actual password

---

## Step 3: Deploy the Backend (API)

1. In Render, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure the service:
   - **Name:** `one-thought-api`
   - **Region:** Choose the closest to your users
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Python`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`

4. Under **"Environment Variables"**, add:
   - `MONGO_URL` = Your MongoDB connection string from Step 2
   - `DB_NAME` = `one_thought_db`
   - `CORS_ORIGINS` = `*`

5. Select **"Free"** instance type
6. Click **"Create Web Service"**
7. Wait for deployment (2-5 minutes)
8. **Copy the URL** (e.g., `https://one-thought-api.onrender.com`)

---

## Step 4: Deploy the Frontend

1. Click **"New +"** → **"Static Site"**
2. Connect the same GitHub repository
3. Configure:
   - **Name:** `one-thought-therapy`
   - **Branch:** `main`
   - **Root Directory:** `frontend`
   - **Build Command:** `yarn install && yarn build`
   - **Publish Directory:** `build`

4. Under **"Environment Variables"**, add:
   - `REACT_APP_BACKEND_URL` = The backend URL from Step 3 (e.g., `https://one-thought-api.onrender.com`)

5. Click **"Create Static Site"**
6. Wait for deployment (3-5 minutes)

---

## Step 5: Configure Routing (Important!)

After the frontend deploys:

1. Go to your frontend service in Render
2. Click **"Redirects/Rewrites"** in the left menu
3. Add this rule:
   - **Source:** `/*`
   - **Destination:** `/index.html`
   - **Action:** `Rewrite`
4. Click **"Save Changes"**

This ensures the app works correctly when users navigate directly to pages like `/assessment/phq9`.

---

## You're Done!

Your website is now live at your frontend URL (e.g., `https://one-thought-therapy.onrender.com`)

### Important Notes:

- **Free tier limitations:** Services may spin down after 15 minutes of inactivity. The first visit after spin-down takes ~30 seconds to load.
- **Custom domain:** You can add your own domain in Render settings for free.
- **Automatic deploys:** Any push to your GitHub `main` branch will automatically update the site.

---

## Troubleshooting

**Q: My site shows a blank page**
- Make sure REACT_APP_BACKEND_URL is set correctly (no trailing slash)
- Check the Redirects/Rewrites rule is configured

**Q: API calls fail**
- Verify the backend deployed successfully
- Check CORS_ORIGINS is set to `*`
- Ensure MONGO_URL is correct

**Q: Database errors**
- Verify MongoDB Atlas allows access from 0.0.0.0/0
- Check your MONGO_URL password is correct

---

## Support

If you have questions, reach out on Instagram [@onethoughtformentalhealth](https://www.instagram.com/onethoughtformentalhealth)
