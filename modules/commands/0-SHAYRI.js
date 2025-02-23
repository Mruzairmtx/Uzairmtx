module.exports.config = {
    name: "shayri",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "uzairrajput", // Credit lock kiya gaya hai yahan
    description: "YEH BOT UZAIR RAJPUT NE BANAYA HAI",
    commandCategory: "SHAYRI+PROFILE",
    usePrefix: false,
    cooldowns: 0
};

module.exports.run = async function({ event, api, args, client, Currencies, Users, utils, __GLOBAL, reminder }) {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const axios = global.nodemodule['axios'];

    // Shayari ka array
    const shayariList = [
        "تیرے پیار میں کچھ خاص ہے تجھے مل جائے تو دنیا ہنسے گی۔",
        "تم میری عادت بن گئی ہو میں تمہارے خیالوں میں گم ہوں",
        "میں تمہاری ہر خواہش پوری کرنا چاہتا ہوں، تم جو مانگو گے میں دوں گا۔",
        "تیری ہنسی کی خوشبو میں کھو جانے دو تیری ہر مسکراہٹ کو میری",
        "آپ کی باتیں میرے دل کو چھوتی ہیں، آپ کی صحبت میری زندگی کی وجہ بن جاتی ہے۔",
        // Aur bhi Shayari jaise chahiye add karein
    ];

    // Random taur par ek Shayari select karein
    const randomShayari = shayariList[Math.floor(Math.random() * shayariList.length)];

    // Shayari aur profile picture ke saath message bhejne ka function
    const sendShayariWithProfilePic = (shayari, picture) => {
        api.sendMessage({
            body: shayari,
            attachment: fs.createReadStream(picture)
        }, event.threadID, () => fs.unlinkSync(picture), event.messageID);
    };

    // Profile picture fetch aur bhejne ka function
    const sendProfilePic = (uid, shayari) => {
        const callback = () => sendShayariWithProfilePic(shayari, __dirname + "/cache/1.png");
        return request(encodeURI(`https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
            .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
            .on('close', callback);
    };

    // Credit ko change karne par warning message bhejne ka function
    const sendWarningMessage = () => {
        api.sendMessage("DON'T CHANGE CREDIT FUCK YOUR MOTHER AND SISTER", event.threadID);
    };

    // Message kya ek reply hai yeh check karein
    if (event.type == "message_reply") {
        let name = await Users.getNameUser(event.messageReply.senderID);
        const uid = event.messageReply.senderID;
        sendProfilePic(uid, randomShayari);
    } else {
        // Profile picture provide karne ke alag-alag cases check karein
        let uid;
        if (!args[0]) {
            uid = event.senderID;
        } else if (args[0].indexOf(".com/") !== -1) {
            const res_ID = await api.getUID(args[0]);
            uid = res_ID;
        } else if (args.join().indexOf('@') !== -1) {
            uid = Object.keys(event.mentions)[0];
        }
        sendProfilePic(uid, randomShayari);
    }

    // Credit change hone par warning message bhejein
    if (event.name == "shayri" && args[0] == "credits") {
        sendWarningMessage();
    }
};
