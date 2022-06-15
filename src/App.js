import './App.css';
import pinataSDK from '@pinata/sdk';

const toBuffer = require('it-to-buffer');  


const pinata = pinataSDK('b54a78cef8f629114ce6', 'c68b1ba58c98a96b942f8b5ce267a742c1a47a7fee6331c1892d1e46aa3e40f3');

function App() {

    const metadata = {
        pinataMetadata: {
            name: "vuonghung"
        },
        pinataContent: {
            title: "thu lais",
            type: "object",
            properties: {
                name: {
                    type: "string",
                    description: "Identifies the asset to which this NFT represents"
                },
                description: {
                    type: "string",
                    description: "Describes the asset to which this NFT represents"
                },
                image: {
                    type: "string",
                    description: "A URI pointing to a resource with mime type image/* representing the asset to which this NFT represents. Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive."
                }
            }
        }
    };
    console.log(pinata);

    pinata.pinJSONToIPFS(metadata).then(async (result) => { // handle results here
        console.log(result);
        const response = await fetch("https://gateway.pinata.cloud/ipfs/" + result.IpfsHash);
        if (response.ok) { // if HTTP-status is 200-299
          // get the response body (the method explained below)
          let json = await response.json();
          console.log(json);
        } else {
          alert("HTTP-Error: " + response.status);
        }
    }).catch((err) => { // handle error here
        console.log(err);
    });

    return (
        <div className="App">
            <header className="App-header"></header>
        </div>
    );
}

export default App;