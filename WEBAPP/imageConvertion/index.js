const encode = require("node-base64-image").encode;
const decode = require("node-base64-image").decode;
const fs = require('fs');

const URL = 'https://media.licdn.com/dms/image/D5603AQHa0429fwMdYw/profile-displayphoto-shrink_400_400/0/1702369159371?e=1712188800&v=beta&t=BeMwt5RpOgOKbVVjzdGK-lsNB70cAqJ3O5fsQl9W_F8';
const myfileName = "base64.txt";



async function convertURLtoBase64(URL, fileName) {
    try {
        const options = { string: true };
        const image = await encode(URL, options);
        fs.writeFileSync(fileName, image);
        console.log("Image converted and saved as base64:", fileName);
    } catch (error) {
        console.error("Error converting URL to base64:", error);
    }
}

async function convertURLtoImage(URL, imageName) {
    try {
        const options = { string: true };
        const image = await encode(URL, options);
        await decode(image, { fname: imageName, ext: "jpg" });
        console.log("Image converted and saved:", imageName);
    } catch (error) {
        console.error("Error converting URL to image:", error);
    }
}

async function base64toImageFromFile(filePath, imageName) {
    try {
        const base64Data = fs.readFileSync(filePath, 'utf-8');

         await decode(base64Data, { fname: imageName, ext: "jpg" });

        console.log("Image converted and saved:", imageName);
    } catch (error) {
        console.error("Error converting base64 to image:", error);
    }
}



// convertURLtoBase64(URL, myfileName);
// convertURLtoImage(URL, "rakesh");
base64toImageFromFile("base64.txt","rakesh");





//RAW Function without try and catch

/* 
const encode = require("node-base64-image").encode;
const decode = require("node-base64-image").decode;

// this is required to stored the file in the system 
const fs = require('fs');

const URL = 'https://media.licdn.com/dms/image/D5603AQHa0429fwMdYw/profile-displayphoto-shrink_400_400/0/1702369159371?e=1712188800&v=beta&t=BeMwt5RpOgOKbVVjzdGK-lsNB70cAqJ3O5fsQl9W_F8';
const myfileName = "base64.txt";



// this function take URL of the image and converts the image in the url into Base46
//remember first argument take url string and second takes the name of the file which will be create to store the base64
async function convertURLtoBase64(URL, fileName) {

    const url = URL
    const options = {
        string: true,
        headers: {
            "User-Agent": "my-app"
        }
    };

    // writing to file named 'example.jpg'
    const image = await encode(url, options);
    console.log(image);
    fs.writeFileSync(fileName, image)

}

async function convertURLtoImage(URL, imageName) {
    const url = URL;
    const options = {
        string: true,
        headers: {
            "User-Agent": "my-app"
        }
    };

    // writing to file named 'example.jpg'
    const image = await encode(url, options);
    await decode(image, { fname: imageName, ext: "jpg" });

}

async function base64toImage(base64, imageName) {
    
    // writing to file named 'example.jpg'
    const image = await encode(base64, options);
    await decode(image, { fname: imageName, ext: "jpg" });

}


// convertURLtoBase64(URL,myfileName);
// convertURLtoImage(URL, "rakesh");*/
