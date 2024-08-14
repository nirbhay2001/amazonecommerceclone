const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema"); // esko import esliye karna pada hai ki , jisase user find ho sake
const keysecret = process.env.KEY

const athenticate = async(req,res,next)=>{
    try {
        const token = req.cookies.Amazonweb; // yaha per token ko extract kiya ja raha hai jo client ke request ke sath jo cookie aya tha , aur us cookie me ye token tha
        
        const verifyToken = jwt.verify(token,keysecret); // yaha per jo token cookie se aya hai usko server usko security key se verify kar raha hai, ye security key server ke pas hi rahta hai , eska use digital Signature banane me help karta hai, aur jwt.verify(token,keysecret) ak _id ko return karega
        console.log(verifyToken);
     
        const rootUser = await USER.findOne({_id:verifyToken._id,"tokens.token":token}); // esase user mil jayega,jab ; jo database me token hai aur jo client side se token aya hai us dono ko verify kiya ja rha hai, aur jo client side ke token me user ka id aya hai aur database me user ke id ko verify karaya ja raha hai yadi dono match kar ja raha hai to user ko valid mana jayega aur us user ko valid user me save kar diya jayega

        // verifyToken._id --> esase jo id milega wah user ke document ke id hai n ki jo tokens array me id hai
       console.log(rootUser);

        if(!rootUser){ throw new Error("User Not Found") };

        req.token = token; // esase router ke page per ye cookie mil jayegi, /addcart/:id endpoint ke help se
        req.rootUser = rootUser;   
        req.userID = rootUser._id;   
    
        next();  


    } catch (error) {
        res.status(401).send("Unauthorized:No token provided");
        console.log(error);
    }
};

module.exports = athenticate;




/*

 Cookies web applications mein client-server communication mein use hone wale small text files hote hain jo client (jaise ki web browser) ke end par store kiye jate hain. Cookies typically server dwara client ke browser mein generate kiye jate hain aur client ke subsequent requests ke sath wapas server tak bheje jate hain. Yahan kuch common situations hain jab cookies generate hote hain aur unme kya hota hai:

    1. User Authentication: Cookies often use hote hain user authentication ke liye. Jab ek user login karta hai, server ek cookie generate karke client ke browser mein store karta hai. Is cookie mein user ke session ya authentication information hoti hai. Jab user dusri requests karta hai, to yeh cookie us request ke sath server tak bheji jati hai, jisse server user ko pehchan sakta hai aur usko authorized access provide kar sakta hai.

    2. Session Management: Cookies ka istemal user sessions ko maintain karne ke liye hota hai. Har user ke liye ek unique session identifier cookies mein store hota hai. Jab user web application mein navigate karta hai, to session identifier uske requests ke sath bheja jata hai, jisse server user ke session ko track kar sakta hai.

    3. Tracking User Preferences: Cookies ka istemal user preferences aur settings ko store karne ke liye hota hai. For example, ek website apne users ke preferred language, theme, ya font size ko cookies mein store kar sakta hai, taki jab user wapas aaye to unke preferences automatically apply ho.

    4. Shopping Carts: Online shopping websites shopping carts ko cookies mein store karte hain. Isse user ke selected items aur unke cart ka state save rehta hai, taki user alag-bagal mein bhi website par navigate kare to unke cart mein selected items wapas dikhai de.

    5. Personalization: Cookies aksar personalization aur targeted advertising ke liye istemal hote hain. Website aapke previous interactions aur preferences ko cookies mein store karke aapko customized content aur ads dikhate hain.

    6. Cookies chhote text files hote hain aur user ke device mein store kiye jate hain. Inme typically kuch data hota hai jaise ki keys, values, expiration timestamps, aur domain information. Cookies ki properties set hoti hain jaise ki domain (kis domain par cookie valid hai), path (kis path ke URLs ke liye cookie valid hai), secure flag (HTTPS par hi cookie use hoga), aur HttpOnly (JavaScript se access nahi ho sakta).

    Cookies user privacy aur security ke liye important hain. Developers ko cookies ka sahi istemal karke user data ko secure aur user privacy ka khayal rakhna hota hai


*/


/*


 Tokens web applications mein authentication aur authorization ke liye use kiye jaate hain. Tokens ek security mechanism hote hain jo client (jaise ki web browser) aur server ke beech communication ke dauraan use hote hain. Token ek chhota piece of data hota hai, jo typically encrypted hota hai, aur isme kuch information hoti hai jo server use karta hai user ya client ko authenticate aur authorize karne ke liye. Token mein kuch common information hoti hai:

    1. User Identity: Token mein user ki identity information hoti hai jaise ki user ID, username, ya email address. Ye information server ko ye batata hai ki kaun user hai jo request kar raha hai.

    2. Expiration Time: Tokens mein ek expiration time hoti hai, jisse server ye jaan sakta hai ki token kab expire hoga. Isse security enhance hoti hai, kyunki ek token sirf limited time tak valid hota hai.

    3. Issuing Authority (Issuer): Token ka issuer kaun hai, ye bhi token mein hota hai. Issuer server ka naam ya identity hota hai, jo token ko create karta hai.

    4. Digital Signature: Tokens typically ek digital signature ke saath aate hain. Digital signature verify karne se ye confirm hota hai ki token sahi aur tamper nahi kiya gaya hai. Isse token ki authenticity ensure hoti hai.

    5. Access Permissions (Claims): Tokens mein user ke access permissions ya claims bhi hoti hain. Ye batata hai ki user kis resources ya services tak access kar sakta hai.

    6. Random Data (Nonce): Tokens mein random data (nonce) bhi hota hai, jo ek additional security layer provide karta hai.

    7. Token Type: Token type jaise ki JSON Web Token (JWT) ya OAuth token, bhi token mein specify kiya jata hai.

    8. Additional Custom Data: Tokens mein application specific custom data bhi include kiya ja sakta hai, jaise ki user ke profile information.

    Yeh information tokens ke security aur functionality ko define karti hai. Jab user ek request karta hai, to token ko server ke saath bheja jata hai, aur server us token ke information ko dekhtah hai, use validate karta hai, aur phir decide karta hai ki user ko request authorize kiya ja sakta hai ya nahi.

    Tokens typically secure hote hain aur server dwara generate kiye jate hain. Server unhein client ke browser ya device par store nahi karta, lekin client unhein apni requests ke sath include karta hai. Server us token ko validate karta hai aur phir request ko process karta hai. Is tarah se, tokens security aur authentication ko enhance karte hain web applications mein.


*/


/*

 Tokens me "payload" aur "security key" dono important components hote hain jo token ko define karte hain aur uske security aur functionality ko ensure karte hain.

 Payload:
 Payload token ka hissa hota hai jisme user ya application-specific data hoti hai. Payload me kuch common information hoti hai:

    1. User Identity: Payload me user ki identity information hoti hai, jaise ki user ID, username, ya email address. Ye information server ko batati hai ki token ke saath kon request kar raha hai.

    2. Access Permissions (Claims): Payload me user ke access permissions ya claims hoti hain. Ye batati hai ki user kis resources ya services tak access kar sakta hai.

    3. Custom Data: Payload me application specific custom data bhi ho sakti hai, jaise ki user ke profile information ya preferences.

    4. Payload typically JSON format me hota hai, lekin other formats bhi istemal kiye ja sakte hain. Payload client aur server ke beech data exchange aur communication ke liye use hota hai.

 Security Key:
 Security key ya token key token ki security ko ensure karta hai. Ye key token ke digital signature ke liye use hoti hai. Jab token generate hota hai, to server us token ko sign karta hai us security key ke saath, jisse token ki authenticity aur integrity assure hoti hai. Token verify karne ke liye server usi security key ka istemal karta hai.

 Security key typically secret hoti hai aur server ke pass hoti hai. Ye key token ko tamper-proof banati hai, kyun ki jab bhi token verify kiya jata hai, to server us security key ka istemal karke token ki digital signature ko verify karta hai. Agar token tampered ho gaya hota, to digital signature verify nahi hoti aur server us token ko reject kar deta hai.

 In dono components, payload aur security key, tokens ke security aur functionality ka vital hissa hote hain. Tokens ke design aur implementation mein inka sahi tarike se istemal karna important hota hai taki unauthorized access se bacha ja sake.

*/



/*

 Token-Based Authentication mein cookies me tokens store kiye ja sakte hain, lekin generally tokens me payload aur security key client-side (browser) me store nahi ki jati. Security tokens (such as JSON Web Tokens - JWTs) typically server dwara generate kiye jate hain aur client (browser) ke pass aate hain.

 Tokens typically do parts se compose hote hain:

    1. Header: Header token ke type (jaise ki JWT) aur signing algorithm (jaise ki HMAC SHA256 ya RSA) ko specify karta hai.

    2. Payload (Claims): Payload token ke main data hota hai jaise ki user ki identity aur access permissions (claims). Ye data JSON format me hota hai aur user-specific information ko represent karta hai.

    3. Signature: Token ka signature token ke content (header aur payload) ko digital signature ke saath combine karke generate hota hai. Signature ko server dwara verify kiya jata hai, aur iske liye ek security key ka istemal hota hai.

    Ye tokens typically server dwara generate kiye jate hain aur client ke pass aate hain, lekin client (browser) typically tokens me store nahi karta. Tokens ko client ke pass aane par server unhein secure cookies ke madhyam se client ke browser me store kar sakta hai. Ismein token ka content (header aur payload) hota hai, lekin security key typically server ke pass hoti hai. Security key se token ki digital signature verify hoti hai, jisse token ki authenticity aur integrity ensure hoti hai.

    Cookies me tokens ko store karna ek common practice hai token-based authentication me, lekin tokens ke security key ko client-side store nahi kiya jata. Tokens aur security keys typically server-side secure storage me rakhe jate hain taki unauthorized access se bacha ja sake.


*/


/*


 Server cookies ko verify karne ke liye security key ka istemal karta hai, lekin iske liye server-side code ki jarurat hoti hai. Yahan ek high-level overview hai ki kis tarah se server cookies ko verify karta hai:

 Security Key Generate Karo: Sabse pehle, server ek security key generate karta hai. Yeh key secret hoti hai aur server ke pass hi rakhi jati hai. Is key ka istemal cookies ke digital signatures ko verify karne ke liye hota hai.

 1. Client Se Cookie Receive Karo: Jab client (browser) server se request karta hai, to cookies bhi request ke sath bheji jati hain. Server cookies ko receive karta hai.

 2. Cookie Parse Karo: Server cookies ko parse karta hai taki usme se token aur signature ko alag kiya ja sake.

 3. Token Verify Karo: Server security key ka istemal karke cookies ke signature ko verify karta hai. Signature verify nahi hota agar token ya cookies me kuch bhi modify kiya gaya hai.

 4. Payload Decode Karo: Signature verify hone ke baad, server token ke payload (claims) ko decode karta hai. Isse server user ki identity aur access permissions ko jaan leta hai.

 5. User Authentication: Payload se user ki identity ko extract karke server user ko authenticate karta hai. Server check karta hai ki user token me specified roles ya permissions ke sath authorized hai ya nahi.

 6. Request Process Karo: Agar token verify aur user authentication successful hote hain, to server request ko process karta hai aur user ko authorized access provide karta hai.

 7. Expiration Check Karo: Server token ke expiration time ko bhi check karta hai taki expired tokens ko reject kiya ja sake.

 8. Error Handling: Server invalid token, expired token, ya kisi anya issue ke case mein error handling karta hai aur request ko reject kar sakta hai.

 Is tarah se, server cookies ke security key ka istemal karke cookies ko verify karta hai aur user ko authenticate aur authorize karta hai. Yeh process server-side code mein implement kiya jata hai aur security key ki secrecy ko maintain karke cookies ke security ko ensure karta hai.


*/



/*


 tokens to database me save hota hai aur tokens me paylaod aur security key bhi hota hai to es tarah se to security key database me save hona chahiye

 ChatGPT
 I understand your concern, but it's important to clarify a few key concepts regarding tokens and security keys in token-based authentication:

    1. Security Key vs. Token: Security keys (also known as private keys) and tokens are different entities. The security key is used to create digital signatures, while the token contains user information (payload) and a digital signature created using the security key. The security key is a confidential piece of information and is never stored in the database or shared with clients.

    2. Token Creation: When a token is created, the server uses the security key to generate the digital signature, which is then attached to the token. The token, including the payload and the signature, is sent to the client or stored in the database.

    3. Token Verification: When a client sends a token with a request, the server uses the security key (which it keeps secret) to verify the digital signature on the token. If the signature is valid, the server trusts the payload data and considers the token as authentic.

    4. Database Storage: While tokens may be stored in a database for various purposes (e.g., session management, revocation, or auditing), the security key should not be stored in the database alongside tokens. The security key must remain securely stored on the server and never shared or exposed.

    In summary, the security key used to create digital signatures is a critical piece of server-side information and should not be stored in the database. Storing the security key in the database would expose it to potential security risks. The tokens themselves, which include the payload and the signature, are typically stored in the database if needed, but the security key remains a closely guarded secret on the server.


*/

/*


 Yeh code ek authentication middleware ko represent karta hai, jo ek Express.js application mein token-based authentication ke liye istemal hota hai. Main aapko code ke kuch important parts ke baare mein explain karunga:

 const token = req.cookies.Amazonweb;: Is line se client (browser) se request aane par Amazonweb naam ke cookie ko extract kiya jata hai, jisme authentication token store hota hai. Yani, client ne apne cookies mein authentication token rakha hai.

  verifyToken = jwt.verify(token,keysecret);: Is line mein jwt.verify() method ka istemal kiya jata hai token ko verify karne ke liye. token argument token ko represent karta hai, aur keysecret server ke secret key ko represent karta hai. Agar token valid hai, to verifyToken mein token ke payload ka decoded version store ho jata hai. Is decoded payload mein typically user ke ID ya aur information hoti hai.

 const rootUser = await USER.findOne({_id:verifyToken._id,"tokens.token":token});: Is line mein server database se user ko retrieve karne ke liye MongoDB query ka istemal kiya jata hai. Query ke jariye _id aur tokens.token ke matching records ko find kiya jata hai. Agar user mil jata hai, to rootUser mein user ka object store ho jata hai.

 if(!rootUser){ throw new Error("User Not Found") };: Agar user database mein nahi milta, to ek error throw kiya jata hai, jo client ko unauthorized access ka response deta hai.

 req.token, req.rootUser, aur req.userID ko set karke, user ke data ko request object mein add kiya jata hai taki is data ko request handlers aur routes mein istemal kiya ja sake.

 next();: Agar authentication successful hoti hai, to next() function ko call kiya jata hai, jisse control next middleware ya route handler tak jata hai.

 Agar koi error aati hai, to catch block mei error handle kiya jata hai, aur client ko unauthorized access ka response diya jata hai.

 Yeh middleware authentication process ko handle karta hai, jisse server users ko verify karke authorize kar sakta hai aur protected routes tak pahunchne de sakta hai.






 const rootUser = await USER.findOne({_id:verifyToken._id,"tokens.token":token});: Is line mein server database se user ko retrieve karne ke liye MongoDB query ka istemal kiya jata hai. Query ke jariye _id aur tokens.token ke matching records ko find kiya jata hai. Agar user mil jata hai, to rootUser mein user ka object store ho jata hai.
 esko detail me explain karo aur verifyToken._id se jo id milega wah token ke sath _id rahata hai o hoga ki user ki id hoga

 ChatGPT
 Ji, aapne bilkul sahi samjha. Is line of code mein MongoDB query ka istemal kiya ja raha hai database se user ko retrieve karne ke liye, lekin query specific conditions ke sath kiya ja raha hai:

 USER collection se data retrieve karne ke liye USER.findOne() ka istemal kiya jata hai. Yani, ek user document ko find karne ke liye query chala ja raha hai.

 Query ka pahla condition _id: verifyToken._id hai. Yeh condition user document ka _id field ke sath match karta hai. verifyToken._id token ke payload se aaya hua user ID hai, jise server verify kar chuka hai. Agar token sahi hai aur user valid hai, to _id condition ke sath user document ko search kiya jata hai.

 Query ka doosra condition "tokens.token": token hai. Yeh condition user document ke tokens array ke andar se token field ke sath match karta hai. Is condition se verifyToken se aaya hua token server ke records ke sath match karta hai. Isse user ke tokens mein verify kiya gaya token dhunda ja raha hai.

 Agar dono conditions ke sath ek user document milta hai jo verifyToken ke _id aur token ke sath match karta hai, to yeh user document rootUser mein store ho jata hai. Is document mein user ke sari details, jaise ki username, email, roles, permissions, etc., store hoti hain. Isi tarah se server verify kar leta hai ki request karne wala user sahi hai aur uska token valid hai.

 Jab user document mil jata hai, to server us document ke sath further processing kar sakta hai aur user ko authorize karke protected routes tak pahuncha sakta hai.





 verifyToken._id  esase jo id milega 

 _id
 6511f10617eb85cb6410d07f
 fname
 "Rohit Gupta"
 email
 "rohit@gmail.com"
 mobile
 "8235338060"
 password
 "$2a$12$R69YbO9YAO/Su3wppaB7U.4SMF.CK/mkuB45FxHsdyaz0dB5PnKA6"
 cpassword
 "$2a$12$GEgIIE6dAfeqUyfl9ceumOQ/u6ZY2B8sDryp0Bu6/LooAKWsQWXO."

 carts
 Array

 0
 Object

 tokens
 Array

 0
 Object
 token
 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTExZjEwNjE3ZWI4NWNiN…"
_id
 6511f12e17eb85cb6410d082 esme se koun id hoga 

 ChatGPT
 Aapke diye gaye data snippet me verifyToken._id se jo ID milta hai, wo _id field ka value hoga. In this case, _id field ka value hai "6511f10617eb85cb6410d07f".

 _id field typically MongoDB documents ke unique identifier ke roop mein istemal hota hai. Har document ka apna unique _id hota hai, jo unike identifier ke taur par kaam karta hai. Isse har document ko uniquely identify kiya ja sakta hai.


*/