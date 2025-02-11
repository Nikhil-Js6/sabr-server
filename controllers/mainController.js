const UserData = require("../models/UserData")
const Visits = require("../models/Visits")

class MainController {
    async access (req, res) {
        const { userId } = req.body;
        const ipAddress = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.ip || req.connection.remoteAddress ;
        const userAgent = req.headers['user-agent'];

        try {
            let document = await UserData.findOne();
            const progress = 0;
            if (!document) {
            // Create new document:
                document = await UserData.create({ 
                    Users: [userId], 
                    Visits: 1, 
                    UnauthorizedRequests: 0 
                });

                await Visits.create({ 
                    userId, visitedAt: new Date(), ipAddress, userAgent, requestType: "Authorized", progress 
                });

                return res.status(201).json({ 
                    authorized: true, message: "First User added!"
                });
            }

            document.Visits += 1;
            const isAuthorized = document.Users.length < 2 || document.Users.includes(userId);
            const requestType = isAuthorized ? "Authorized" : "Unauthorized";
            
            if (document.Users.includes(userId)) {
            // Existing User:
                await document.save();
                await Visits.create({ 
                    userId, visitedAt: new Date(), ipAddress, userAgent, requestType, progress
                });

                return res.status(200).json({ 
                    authorized: true, message: "Welcome Back!"
                });
            }

            if (document.Users.length >= 2) {
            // Unauthorized Request: 
                document.UnauthorizedRequests += 1;
                await document.save();
                await Visits.create({ 
                    userId, visitedAt: new Date(), ipAddress, userAgent, requestType, progress 
                });

                return res.status(403).json({ 
                    authorized: false, message: "No New Users Allowed!"
                });
            }
            // New User: 
            await document.Users.push(userId);
            await document.save();
            await Visits.create({ 
                userId, visitedAt: new Date(), ipAddress, userAgent, requestType, progress
            });

            return res.status(200).json({ 
                authorized: true, message: "New User Added!" 
            });
        } 
        catch (err) {
            console.log(err);
            return res.status(500).send({ authorized: false });
        }
    }

    async getVisits(_, res) {
        try {
            const visits = await Visits.find().sort({ visitedAt: -1 }); // Sort by most recent
            return res.status(200).json({ visits });
        } 
        catch (err) {
            console.error("Error fetching visits:", err);
            return res.status(500).json({ error: "Failed to fetch visits" });
        }
    }

    async getProgress(req, res) {
        const { userId } = req.params;

        try {
            const latestVisit = await Visits.findOne({ userId }).sort({ visitedAt: -1 });
        
            if (!latestVisit) {
                return res.status(404).send({ error: "No progress found!" });
            }
            return res.status(200).send({ progress: latestVisit.progress });
        } 
        catch (err) {
          console.error("Error fetching user progress:", err);
          res.status(500).send({ err: "Failed to fetch progress" });
        }
    }

    async updateProgress (req, res) {
        const { userId, slideIndex } = req.body;
        const ipAddress = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.ip || req.connection.remoteAddress;
        const userAgent = req.headers['user-agent']

        try {
            const latestVisit = await Visits.findOne({ userId }).sort({ visitedAt: -1 });

            if (!latestVisit) {
                await Visits.create({
                    userId,
                    visitedAt: new Date(),
                    ipAddress,
                    userAgent,
                    requestType: "Authorized",
                    progress: 0,
                });
                res.status(201).json({
                    message: "New progress recorded!",
                });
            }

            if (slideIndex + 1 > latestVisit.progress) {
                latestVisit.progress = slideIndex + 1;
            }
            latestVisit.visitedAt = new Date();
            await latestVisit.save();  // Save the visit record

            return res.status(200).send({
                message: "Progress updated successfully!",
            });
        } 
        catch (err) {
            console.error("Error updating progress:", err);
            res.status(500).send({ err: "Failed to update progress" });
        }
    }
    async countUsers (_, res) {
        try {
            let document = await UserData.findOne();
            if (document) {
                return res.status(200).json({ count: document.Users.length });
            }
            return res.status(200).json({ count: 0 });
        } 
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = new MainController();
