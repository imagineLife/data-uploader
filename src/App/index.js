import React, { useRef, useEffect } from 'react';
const { remote: { dialog }} = require('electron'); 
const path = require('path'); 
const fs = require('fs'); 

const App = () => {
	
	const uploadBtnRef = useRef() 
	  
	// Defining a Global file path Variable to store  
	// user-selected file 
	global.filepath = undefined; 
	
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
          // Updating the GLOBAL filepath variable  
          // to user-selected file. 
          global.filepath = dialogueFile.filePaths[0].toString(); 
          console.log(global.filepath); 
  
					if (global.filepath) { 
					  fs.readFile(global.filepath, {encoding: 'utf-8'}, function(err,data) { 
					     if (!err) { 
					          console.log('received data: ' + data); 
					     } else { 
					          console.log(err); 
					      } 
					   }); 
					 }
        }   
      }catch(e){ 
          console.log(e) 
      }; 
		});	
	}) 

	return (<main>
		<h2>Data Uploader</h2>
		<button id="upload-btn" ref={uploadBtnRef}>Upload File</button>
	</main>)
}
export default App;