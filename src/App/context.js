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
					let lines = fileData.split('\n')
					let res = {}
					res.headers = lines[0].split(',')
					let colCount = res.headers.length;
					res.data = lines.reduce((resArr, curRowStr, rowIdx) => {
						if(rowIdx === 0) return []
							let hasQuote = curRowStr.split("\"").length > 1
							if(!hasQuote){
								return [...resArr, curRowStr.split(',')]
							}else{
								let splitAtQuote = curRowStr.split("\"")
								let splitAtCommas = curRowStr.split(',')
								return [...resArr, splitAtCommas.reduce((resArr, curItm, idx) => {
									if(!curItm.includes("\"")){
										return [...resArr, curItm]
									}else{
										if(curItm.indexOf("\"") !== 0){
											return [...resArr];
										}
										
										let fixedCurString = curItm.replace("\"","")
										let nextStr = splitAtCommas[idx + 1]
										let cleanNextStr = nextStr.replace("\"","")
										let finalStr = `${fixedCurString},${cleanNextStr}`
										return [...resArr, finalStr]
										
									}
								},[])]
							}
					},[])

					setFileData(res)
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