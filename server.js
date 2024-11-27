const express = require("express");
const wbm = require("./src/index");

const app = express();
const PORT = 7733;

// Route to send a WhatsApp message
app.get("/send-message", async (req, res) => {
    // Extract query parameters
    const phone = req.query.phone; // Single phone number
    const message = req.query.message; // Message to send

    // Debugging: Log the parameters
    console.log("Phone:", phone);
    console.log("Message:", message);

    // Validate parameters
    if (!phone || !message) {
        return res.status(400).json({
            error: "Both 'phone' and 'message' query parameters are required.",
        });
    }

    try {
        await wbm.start({ showBrowser: true, session: true });
        await wbm.send([phone], message); // Wrap phone in an array as `wbm.send` expects an array
        await wbm.end();

        res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Failed to send message" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
