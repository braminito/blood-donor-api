GOOGLE_PROJECT_ID=$DEVSHELL_PROJECT_ID

gcloud builds submit --tag gcr.io/$GOOGLE_PROJECT_ID/blood_donor_api \
 --project=$GOOGLE_PROJECT_ID

gcloud run deploy blood-donor-api \
 --image gcr.io/$GOOGLE_PROJECT_ID/blood_donor_api \
 --platform managed \
 --region asia-southeast2 \
 --project=$GOOGLE_PROJECT_ID
