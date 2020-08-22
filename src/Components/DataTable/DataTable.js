import React, { useContext } from 'react';
import { AppContext } from './../../App/context';

const DataTable = () => {
	const { fileData } = useContext(AppContext)
	return(<table>
		<thead>
			<tr>
				{fileData.headers.map((h,idx) => (
					<th key={`table-header-${idx}`}>{h}</th>
				))}
			</tr>
		</thead>
		<tbody>
			{fileData.data.map((rowData,rowIdx) => (
				<tr key={`table-row-${rowIdx}`}>
					{rowData.map((cell,cellIdx) => (
						<td key={`cell-key-${cellIdx}-${rowIdx}`}>{cell}</td>
					))}
				</tr>
			))}
		</tbody>
	</table>)
};

export default DataTable;
