import React, { useRef, useEffect, useState } from 'react';
const { remote: { dialog }} = require('electron'); 
const path = require('path'); 
const fs = require('fs').promises; 

const App = () => {
	
	const uploadBtnRef = useRef() 
	const [uploadedFilePath, setUploadedFilePath] = useState(null)
	const [fileData, setFileData] = useState(null)
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

	useEffect(() => {
		if (uploadedFilePath && !fileData) { 
			const readFileFn = async () => {
				try{
					let fileData = await fs.readFile(uploadedFilePath, {encoding: 'utf-8'});
					setFileData(fileData)
				}catch(e){

				}
			}
			readFileFn()
		}
	}, [uploadedFilePath]) 

	return (<main>
		<h2>Data Uploader</h2>
		<button id="upload-btn" ref={uploadBtnRef}>Upload File</button>
		{fileData && <p>{JSON.stringify(fileData)}</p>}
	</main>)
}
export default App;