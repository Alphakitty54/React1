
import React, { useEffect, useState } from 'react';

const Loading = () => <div>Loading...</div>;

export default function App() {

  const [card, setCardsData] = useState([]);

  const [page, setPage] = useState(1);
  const [loading, setloading] = useState(true);

   const cards = [
    {
      name: 'Mixmax',
      budget_name: 'Software subscription',
      owner_id: 1,
      spent: 
      {
      value: 100,
      currency: "SGD"
       },

      available:
        {
      value: 1000,
      currency: "SGD"
      },
      
      card_type: "burner",
      expiry: '9-feb',
      limit: 10,
      status: 'active'
    },
    {
       name: 'Quickbooks’',
       budget_name: 'Software subscription',
       owner_id: 2,
       spent: {

            value: 50,
            currency: "SGD"
       },

      available: {
        
           value: 250,
           currency: "SGD"
      },
     
      card_type: "subscription",
      limit:20,
      status: 'active'
},
    {
       name: 'Linkedln',
       budget_name: 'Membership Subscription',
       owner_id: 3,
       spent: {

            value: 50,
            currency: "SGD"
       },

      available: {
        
           value: 650,
           currency: "SGD"
      },
     
      card_type: "subscription",
      limit: 100,
      status: 'active'
},
     {
       name: 'Linkedln',
       budget_name: 'Membership Subscription',
       owner_id: 4,
       spent: {

            value: 500,
            currency: "SGD"
       },

      available: {
        
           value: 650,
           currency: "SGD"
      },
     
      card_type: "subscription",
      limit: 10,
      status: 'inactive'
},
     {
       name: 'Offsite Traveller',
       budget_name: 'Membership Subscription',
       owner_id: 5,
       spent: {

            value: 50,
            currency: "SGD"
       },

      available: {
        
           value: 650,
           currency: "SGD"
      },
     
      card_type: "burner",
      limit: 20,
      status: 'active'
}
    ,
     {
       name: 'AWS Card',
       budget_name: 'Membership Subscription',
       owner_id: 6,
       spent: {

            value: 50,
            currency: "SGD"
       },

      available: {
        
           value: 650,
           currency: "SGD"
      },
     
      card_type: "subscription",
      limit: 10,
      status: 'inactive'
}
];

  const getCardsData = async () => {
  try {
    const res = await fetch('./src/data.json');
    const data = await res.json();
    const cardData = data.cards;
    setCardsData((prev) => [...prev, ...cardData]);
    setloading(false);
  } catch (error) {
    console.log(error);
  }
};


  useEffect(() => {
    getCardsData();
  }, [page]);

  const infiniteScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollHeight >=
        document.documentElement.scrollTop
      ) {
        setloading(true);
        setPage((prev) => prev + 1);
      } 
  };

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, []);

    return (
    <div>
      <section>
        <div className="container">
          <h1>Card List</h1>
          <div className="cards">
            {cards.map((card, i) => (
              <div key={i} className="card">
                <h2>{card.name}</h2>
                <div className="top-right">
                  <div
                    className={`card-type ${
                      card.card_type === 'burner'
                        ? 'highlight-pink'
                        : 'highlight-yellow'
                    }`}
                  >
                    {card.card_type}
                  </div>
                </div>
                <p>{card.budget_name}</p>
                <p>Owner ID: {card.owner_id}</p>
                <div className="info-row">
                  <p>Spent: {card.spent.value}</p>
                  <p>Available: {card.available.value}</p>
                  {card.card_type === 'burner' && <p>Expiry: {card.expiry}</p>}
                  {card.card_type === 'subscription' && (
                    <p>Limit: {card.limit}</p>
                  )}
                </div>
                <p className={`status ${card.status}`}>{card.status}</p>
              </div>
            ))}
          </div> 
         
        </div> 
      
      </section>
      {loading && <Loading />}
    </div> 
   
  );
} ;