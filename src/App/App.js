import React, { useRef, useEffect, useContext, useState } from 'react';
import { AppContext } from './context';
import DataTable from './../Components/DataTable'
const { remote: { dialog, app }} = require('electron'); 
const path = require('path');  

const App = () => {

	const {
		uploadedFilePath, 
		setUploadedFilePath,
		fileData
	} = useContext(AppContext);
	
	const uploadBtnRef = useRef() 
	
	const [uploadFilePath] = useState(app.getAppPath());
	
	useEffect(() => {
		uploadBtnRef.current.addEventListener('click', async () => { 
			const electronFileDialogueObj = { 
        title: 'Select the File to be uploaded', 
        defaultPath: uploadFilePath, 
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
		{!fileData ? null : <DataTable />}
	</main>)
}
export default App;