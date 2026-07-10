import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "./models/doctorModel.js";
import appointmentModel from "./models/appointmentModel.js";

// Load Env
dotenv.config();

// Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const doctorsData = [
  { name: "Dr. Richard James", email: "richard@prescripto.com", speciality: "General physician", degree: "MBBS", experience: "4 Years", fees: 500, about: "Dr. Richard is committed to delivering comprehensive primary care with a focus on preventative medicine and lifestyle counseling.", imgIndex: 1 },
  { name: "Dr. Emily Larson", email: "emily@prescripto.com", speciality: "Gynecologist", degree: "MD - Obstetrics & Gynecology", experience: "6 Years", fees: 600, about: "Dr. Emily specializes in women's reproductive health, prenatal care, and modern gynecological treatments.", imgIndex: 2 },
  { name: "Dr. Sarah Patel", email: "sarah@prescripto.com", speciality: "Dermatologist", degree: "MD - Dermatology", experience: "5 Years", fees: 700, about: "Dr. Sarah is an expert in skin disorders, clinical dermatology, and aesthetic skincare solutions.", imgIndex: 3 },
  { name: "Dr. Christopher Lee", email: "christopher@prescripto.com", speciality: "Pediatricians", degree: "MD - Pediatrics", experience: "8 Years", fees: 500, about: "Dr. Christopher is dedicated to providing compassionate healthcare services to infants, children, and adolescents.", imgIndex: 4 },
  { name: "Dr. Jennifer Garcia", email: "jennifer@prescripto.com", speciality: "Neurologist", degree: "MD - Neurology", experience: "10 Years", fees: 800, about: "Dr. Jennifer focuses on diagnosing and treating complex disorders of the nervous system, brain, and spinal cord.", imgIndex: 5 },
  { name: "Dr. Andrew Williams", email: "andrew@prescripto.com", speciality: "Gastroenterologist", degree: "MD - Gastroenterology", experience: "7 Years", fees: 650, about: "Dr. Andrew provides advanced care for digestive diseases, liver health, and gastrointestinal clinical medicine.", imgIndex: 6 },
  { name: "Dr. Elizabeth Davis", email: "elizabeth@prescripto.com", speciality: "General physician", degree: "MBBS", experience: "3 Years", fees: 500, about: "Dr. Elizabeth is dedicated to clinical excellence and compassionate primary care for families and individuals.", imgIndex: 7 },
  { name: "Dr. Timothy Miller", email: "timothy@prescripto.com", speciality: "Gynecologist", degree: "MD - Gynecology", experience: "5 Years", fees: 600, about: "Dr. Timothy is a trusted gynecologist focusing on maternal care, family planning, and reproductive welfare.", imgIndex: 8 },
  { name: "Dr. Jessica Taylor", email: "jessica@prescripto.com", speciality: "Dermatologist", degree: "MD - Dermatology", experience: "4 Years", fees: 700, about: "Dr. Jessica provides state-of-the-art diagnostic and therapeutic options for clinical skin health.", imgIndex: 9 },
  { name: "Dr. Jeffrey Adams", email: "jeffrey@prescripto.com", speciality: "Pediatricians", degree: "MBBS, DCH", experience: "6 Years", fees: 550, about: "Dr. Jeffrey is passionate about child wellness, immunization tracking, and pediatric developmental checkups.", imgIndex: 10 },
  { name: "Dr. Zoe Connor", email: "zoe@prescripto.com", speciality: "Neurologist", degree: "MD - Neurology", experience: "9 Years", fees: 900, about: "Dr. Zoe specializes in neuromuscular medicine, headache therapies, and chronic neurological management.", imgIndex: 11 },
  { name: "Dr. Ryan Martinez", email: "ryan@prescripto.com", speciality: "Gastroenterologist", degree: "MD - Gastroenterology", experience: "8 Years", fees: 700, about: "Dr. Ryan specializes in advanced endoscopy, inflammatory bowel disease (IBD), and metabolic health.", imgIndex: 12 },
  { name: "Dr. Chloe Bennett", email: "chloe@prescripto.com", speciality: "General physician", degree: "MBBS", experience: "5 Years", fees: 500, about: "Dr. Chloe provides general medicine consultations, health checkups, and wellness counseling for adults.", imgIndex: 13 },
  { name: "Dr. Patrick Murphy", email: "patrick@prescripto.com", speciality: "Gynecologist", degree: "MD - Gynecology", experience: "12 Years", fees: 600, about: "Dr. Patrick has over a decade of experience in maternal fetal medicine and reproductive endocrinology.", imgIndex: 14 },
  { name: "Dr. Sophia Martinez", email: "sophia@prescripto.com", speciality: "Dermatologist", degree: "MD - Dermatology", experience: "7 Years", fees: 750, about: "Dr. Sophia specializes in cosmetic dermatology, laser treatments, and preventative skin cancer screenings.", imgIndex: 15 },
  { name: "Dr. Daniel Carter", email: "daniel@prescripto.com", speciality: "Pediatricians", degree: "MD - Pediatrics", experience: "5 Years", fees: 550, about: "Dr. Daniel is focused on adolescent healthcare, child nutrition, and early-childhood developmental progress.", imgIndex: 1 } // Reused image 1 for 16th doctor
];

const seedDB = async () => {
  try {
    console.log("⏳ Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Database Connected.");

    // Clear collections
    console.log("⏳ Cleaning existing Doctors and Appointments...");
    await doctorModel.deleteMany({});
    await appointmentModel.deleteMany({});
    console.log("✅ Existing data cleared.");

    // Encrypt Doctor Default Password
    const hashedPassword = await bcrypt.hash("doctorpassword123", 10);
    const uploadedImagesMap = {};

    console.log("⏳ Uploading doctor images to Cloudinary (this might take a few moments)...");

    // Loop through doctors and seed
    for (let i = 0; i < doctorsData.length; i++) {
      const doc = doctorsData[i];
      let imageUrl = "";

      // Check if image is already uploaded to avoid double upload for reused index
      if (uploadedImagesMap[doc.imgIndex]) {
        imageUrl = uploadedImagesMap[doc.imgIndex];
      } else {
        const localPath = path.join(process.cwd(), "../frontend/src/assets", `doc${doc.imgIndex}.png`);
        if (fs.existsSync(localPath)) {
          const uploadRes = await cloudinary.uploader.upload(localPath, {
            folder: "prescripto_seeder",
            resource_type: "image"
          });
          imageUrl = uploadRes.secure_url;
          uploadedImagesMap[doc.imgIndex] = imageUrl;
          console.log(`Uploaded image for doc${doc.imgIndex}`);
        } else {
          console.warn(`⚠️ Warning: Image not found at ${localPath}. Using fallback placeholder.`);
          imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&size=300&background=5f6FFF&color=fff`;
        }
      }

      const doctorRecord = {
        name: doc.name,
        email: doc.email,
        password: hashedPassword,
        image: imageUrl,
        speciality: doc.speciality,
        degree: doc.degree,
        experience: doc.experience,
        about: doc.about,
        fees: doc.fees,
        available: true,
        address: {
          street: "Main Street, Sector 12",
          city: "Jaipur",
          state: "Rajasthan",
          pincode: 302021
        },
        date: Date.now()
      };

      await doctorModel.create(doctorRecord);
      console.log(`✅ Seeded ${doc.name} (${doc.speciality})`);
    }

    console.log("\n🎉 Database successfully seeded with 16 professional doctors!");
    process.exit(0);

  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedDB();
