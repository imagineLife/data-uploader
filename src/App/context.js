import React, { createContext, useState, useEffect } from 'react';

const fs = require('fs').promises;
const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = ({children}) => {

	const [uploadedFilePath, setUploadedFilePath] = useState(null)
	const [fileData, setFileData] = useState(null)

	//Read-File side-effect
	useEffect(() => {
		if (uploadedFilePath && !fileData) { 
			const readFileFn = async () => {
				try{
					let fileData = await fs.readFile(uploadedFilePath, {encoding: 'utf-8'});
					setFileData(fileData)
				}catch(e){
					console.log('readFileFn e')
					console.log(e)
				}
			}
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