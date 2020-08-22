import React, { useRef, useEffect, useContext } from 'react';
import { AppContext } from './context';
const { remote: { dialog }} = require('electron'); 
const path = require('path');  

const App = () => {

	const {
		uploadedFilePath, setUploadedFilePath,
		fileData, setFileData
	} = useContext(AppContext);
	
	const uploadBtnRef = useRef() 

	useEffect(() => {
		uploadBtnRef.current.addEventListener('click', async () => { 
			const electronFileDialogueObj = { 
        title: 'Select the File to be uploaded', 
        defaultPath: path.join(__dirname, '../assets/'), 
        buttonLabel: 'Upload', 
        // Restricting the user to only Text Files. 
        filters: [ 
            { 
                name: 'Text Files', 
                extensions: ['txt', 'docx', 'csv'] 
            }, ], 
        // Specifying the File Selector Property 
        properties: ['openFile'] 
      }

			// If the platform is 'win32' or 'Linux' 
	    if (process.platform == 'darwin') { 
	      electronFileDialogueObj.properties.push('openDirectory')
			}

	   try{
        const dialogueFile = await dialog.showOpenDialog(electronFileDialogueObj)
        if (!dialogueFile.canceled) { 
          setUploadedFilePath(dialogueFile.filePaths[0].toString());
        }   
      }catch(e){ 
          console.log(e) 
      }; 
		});	
	},[]) 

	return (<main>
		<h2>Data Uploader</h2>
		<button id="upload-btn" ref={uploadBtnRef}>Upload File</button>
		{fileData && <p>{JSON.stringify(fileData)}</p>}
	</main>)
}
export default App;