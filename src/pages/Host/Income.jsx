import incomeGraph from '../../assets/income-graph.png';

export default function Income() {
  const transactions = [
    { id: 1, amount: 720, date: "Jan 3, '23" },
    { id: 2, amount: 560, date: "Dec 12, '22" },
    { id: 3, amount: 980, date: "Dec 3, '22" },
  ];

  return (
    <div className='income-page'>
      <div className='income-details'>
        <h1>Income</h1>
        <p>
          Last <span>30 days</span>
        </p>
        <h2>$2,260</h2>
        <img className='income-graph' src={incomeGraph} alt='graph' />
      </div>

      <div className='transaction-details'>
        <h2>Your transactions ({transactions.length})</h2>
        <p>
          Last <span>30 days</span>
        </p>
        <div className='transactions'>
          {transactions.map(transaction => (
            <div className='transaction' key={transaction.id}>
              <h3>${transaction.amount}</h3>
              <p>{transaction.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
