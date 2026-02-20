# 🚀 Deploy Your Mental Health Website on Render.com (FREE)

## What You'll Get:
- ✅ Free hosting for your full-stack app
- ✅ All 11 assessments working
- ✅ Backend + Frontend + Database
- ✅ Your own URL

---

## STEP 1: Set Up MongoDB Database (5 minutes)

### Go to MongoDB Atlas (Free Database):
1. Visit: **https://www.mongodb.com/cloud/atlas/register**
2. Sign up with Google or Email (it's free)
3. Choose **FREE M0 Cluster** (don't pick paid options)
4. Select closest region to India (e.g., Mumbai)
5. Click **Create Cluster** (takes 3-5 minutes)

### Get Your Connection String:
1. After cluster is ready, click **Connect**
2. Click **Connect Your Application**
3. Copy the connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.xxxxx.mongodb.net/
   ```
4. **Save this!** You'll need it later

---

## STEP 2: Deploy Backend on Render.com (10 minutes)

### A. Sign Up for Render:
1. Go to: **https://render.com**
2. Click **Get Started** (top right)
3. Choose **Sign Up with GitHub**
4. Authorize Render to access your GitHub

### B. Create Backend Service:
1. On Render Dashboard, click **New +** (top right)
2. Select **Web Service**
3. Find and select your repo: **mental-health-website-**
4. Click **Connect**

### C. Configure Backend:
Fill in these settings:

- **Name:** `mental-health-backend` (or any name you like)
- **Region:** Singapore (closest to India)
- **Branch:** `main`
- **Root Directory:** Leave empty (or put `backend`)
- **Runtime:** `Python 3`
- **Build Command:** 
  ```
  cd backend && pip install -r requirements.txt
  ```
- **Start Command:**
  ```
  cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT
  ```
- **Plan:** Select **Free**

### D. Add Environment Variables:
Click **Add Environment Variable** and add these:

1. **Key:** `MONGO_URL`  
   **Value:** (Paste your MongoDB connection string from Step 1)

2. **Key:** `DB_NAME`  
   **Value:** `mental_health_db`

3. **Key:** `CORS_ORIGINS`  
   **Value:** `*` (we'll update this later)

### E. Deploy Backend:
1. Click **Create Web Service**
2. Wait 5-10 minutes for deployment
3. You'll get a URL like: `https://mental-health-backend.onrender.com`
4. **Copy this URL!** You'll need it for frontend

### F. Test Backend:
Visit: `https://your-backend-url.onrender.com/api/assessments`
You should see JSON with all 11 assessments!

---

## STEP 3: Deploy Frontend on Render (10 minutes)

### A. Create Frontend Service:
1. On Render Dashboard, click **New +** again
2. Select **Static Site**
3. Connect your **mental-health-website-** repo again

### B. Configure Frontend:
Fill in these settings:

- **Name:** `mental-health-app` (or any name)
- **Branch:** `main`
- **Root Directory:** `frontend`
- **Build Command:**
  ```
  yarn install && yarn build
  ```
- **Publish Directory:** `build`

### C. Add Environment Variable for Frontend:
Click **Add Environment Variable**:

**Key:** `REACT_APP_BACKEND_URL`  
**Value:** `https://your-backend-url.onrender.com` (from Step 2E)

⚠️ **Important:** Replace with YOUR actual backend URL!

### D. Deploy Frontend:
1. Click **Create Static Site**
2. Wait 5-10 minutes
3. You'll get a URL like: `https://mental-health-app.onrender.com`

---

## STEP 4: Update CORS (Security Fix)

### Go Back to Backend Settings:
1. Click on your **backend service** in Render dashboard
2. Go to **Environment** tab
3. Find `CORS_ORIGINS` variable
4. Update value to: `https://mental-health-app.onrender.com` (your frontend URL)
5. Click **Save Changes**
6. Backend will auto-redeploy

---

## STEP 5: Test Your Website! 🎉

1. Visit your frontend URL: `https://mental-health-app.onrender.com`
2. Click on any assessment
3. Complete it
4. See results with Instagram follow gate!

---

## 🎉 SUCCESS! Your Website is Live!

**Your URLs:**
- 🌐 **Website:** https://mental-health-app.onrender.com (share this!)
- 🔧 **Backend API:** https://mental-health-backend.onrender.com

---

## ⚠️ Important Notes:

### Free Tier Limitations:
- ✅ **Completely FREE forever**
- ⏰ **Sleep after inactivity:** Site sleeps after 15 minutes of no use
- 🐌 **First load slow:** Takes 30-60 seconds to wake up (then fast)
- 🔄 **750 hours/month:** More than enough for your use

### Keep It Awake (Optional):
Use a service like **UptimeRobot.com** to ping your site every 10 minutes

---

## 🚨 Troubleshooting:

**Backend not working?**
- Check MongoDB connection string is correct
- Make sure environment variables are saved
- Check backend logs in Render dashboard

**Frontend not loading data?**
- Make sure REACT_APP_BACKEND_URL points to correct backend
- Check CORS is updated with frontend URL
- Clear browser cache

**Need help?**
- Check Render logs (click on service → Logs tab)
- Test backend URL directly in browser

---

## 🎯 Next Steps After Deployment:

1. **Share your URL** with Instagram followers!
2. **Custom Domain (Optional):**
   - Go to Render → Settings → Custom Domain
   - Add your domain (e.g., mentalhealth.com)
3. **Monitor usage** in Render dashboard
4. **Update anytime:** Just push to GitHub, Render auto-deploys!

---

## Need Help?

If you get stuck, take a screenshot of the error and I can help you debug!

**Ready to start? Begin with STEP 1!** 🚀
