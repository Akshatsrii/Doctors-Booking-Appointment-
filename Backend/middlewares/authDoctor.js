import jwt from "jsonwebtoken";

const authDoctor = (req, res, next) => {
  try {
    const dtoken = req.headers.dtoken;

    if (!dtoken) {
      return res.status(401).json({
        success: false,
        message: "Doctor token missing",
      });
    }

    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

    // ✅ SAFE PLACE TO STORE ID
    req.docId = decoded.id;

    next();
  } catch (error) {
    console.error("AuthDoctor Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid doctor token",
    });
  }
};

export default authDoctor;
