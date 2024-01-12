'use client';

import { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../context/firebase';
import { getRecevaibleAmountForRow } from '../utils/rentUtils';

const LeftWithoutPaying = () => {
	const firebase = useContext(FirebaseContext);
	//const [result, setResult] = useState([]);
	const [items, setItems] = useState([]);

	console.log(items, 'items data is here');
	useEffect(() => {
		const fetchData = async () => {
			try {
				const localStorageData = JSON.parse(localStorage.getItem('closedData'));
				console.log(localStorageData, 'this is hey data');
				const fetchedItems = await Promise.all(
					localStorageData.map(async (item) => {
						console.log(item.id, 'id of rentdetails');
						const allotmentDoc = await firebase.getAllotmentById(item.id);

						const rentDetailsDoc = await firebase.getRentDetailsByQuery(
							allotmentDoc.userId
						);
						console.log(rentDetailsDoc, 'This is rentDetails doc');

						return {
							...item,
							rentDetailsData: rentDetailsDoc,
							allotmentData: allotmentDoc,
						};
					})
				);

				setItems(fetchedItems);
			} catch (error) {
				throw new Error('Error in fetching localstorage data');
			}
		};
		fetchData();
	}, []);

	const filteredItems = items.filter((item) => {
		const receivableAmount = getRecevaibleAmountForRow(
			item.rentDetailsData,
			item.allotmentData.deposit
		);
		return receivableAmount > 0;
	});
	return <></>;
};

export default LeftWithoutPaying;
