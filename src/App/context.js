import React, { createContext, useState, useEffect } from 'react';

const fs = require('fs').promises;
const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = ({children}) => {

	const [uploadedFilePath, setUploadedFilePath] = useState(null)
	const [fileData, setFileData] = useState(null)

	useEffect(() => {
		if (uploadedFilePath && !fileData) { 
			console.log('HERE?!');
			console.log('uploadedFilePath')
			console.log(uploadedFilePath)
			console.log('!fileData')
			console.log(!fileData)
			
			
			const readFileFn = async () => {
				try{
					let fileData = await fs.readFile(uploadedFilePath, {encoding: 'utf-8'});
					console.log('readFileRes');
					console.log(fileData);
					setFileData(fileData)
				}catch(e){
					console.log('readFileFn e')
					console.log(e)
					
				}
			}
			console.log('CALLING readFileFn...');
			readFileFn()
		}
	}, [uploadedFilePath]) 

	return <Provider value={{
		uploadedFilePath, setUploadedFilePath,
		fileData, setFileData
	}}>
		{children}
	</Provider>
}

export { AppContext, AppProvider }