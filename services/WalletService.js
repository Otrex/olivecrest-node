exports.earnings = (wallet) => {
	let earning = 0
	return earning
}



exports.availableBalanceInApp = (wallet)=>{
	// wallet.populate(['transactions'])
	let transactions = wallet.transactions

	credits = transactions.reduce((total, cv)=>{
		if (cv.type === 'credit') {
			total += cv.amount
		}
	})

	debits = transactions.reduce((total, cv)=>{
		if (cv.type === 'debit') {
			total += cv.amount
		}
	})

	return credits - debits
}


exports.referalBonus = (wallet)=>{
	return 0
}

exports.gets = (wallet)=>{
	return 0
}