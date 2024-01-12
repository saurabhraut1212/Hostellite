export const getRecevaibleAmountForRow = (rent, totalDeposit) => {
	try {
		const totalAmount = Number(totalDeposit) + Number(rent.mrate);
		const paidAmount =
			(Number(rent.bookingAmount) || 0) +
			(Number(rent.miscellaneous) || 0) +
			(Number(rent.advancedeposit) || 0);
		const amountToPay = totalAmount - paidAmount;
		return amountToPay;
	} catch (error) {
		throw new Error('Error in getting receivable amount');
	}
};
