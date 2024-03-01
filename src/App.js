import React from 'react';
import './App.css';

function App() {
  const [items, setItems] = React.useState([]);
  const [name, setName] = React.useState('');
  const [cost, setCost] = React.useState(0);
  const [weight, setWeight] = React.useState(0);
  const [delivery, setDelivery] = React.useState(0);
  const [parcelWeight, setParcelWeight] = React.useState(0);

  React.useEffect(() => {
   // Получаем сохраненную строку из localStorage
  const storedArrayString = localStorage.getItem('ARR');

  // Преобразуем строку JSON обратно в массив
  const storedArray = JSON.parse(storedArrayString);

  if(Array.isArray(storedArray)){
    setItems(storedArray);
  }
  
  if(localStorage.getItem("DELIVERY") && localStorage.getItem("PARCELWEIGHT")){
    setDelivery(localStorage.getItem("DELIVERY"));
    setParcelWeight(localStorage.getItem("PARCELWEIGHT"));
  }
  }, []);

  const addItem = () => {
    const fc = (Number(cost) + Number((delivery / parcelWeight) * weight)).toFixed(2);

    setItems([...items,       
      {
        name: name, 
        cost: cost, 
        weight: weight, 
        finallycost: fc
      }
    ]);

    const myArray = [...items,       
      {
        name: name, 
        cost: cost, 
        weight: weight, 
        finallycost: fc
      }
    ];

    // Преобразуем массив в строку JSON
    const arrayString = JSON.stringify(myArray);

    // Сохраняем строку в localStorage под определенным ключом
    localStorage.setItem('ARR', arrayString);
  }
  return (
    <div className="App">
      <div className='calculator-wrapper'>
        <h1>Данные посылки:</h1>
        <div className='calculator-data'>
          <input placeholder='Стоимость доставки' value={delivery} onChange={(event) => {setDelivery(event.target.value); localStorage.setItem("DELIVERY", event.target.value)}}/>
          <input placeholder='Вес посылки: g' value={parcelWeight} onChange={(event) => {setParcelWeight(event.target.value); localStorage.setItem("PARCELWEIGHT", event.target.value)}}/>
          <button onClick={() => {localStorage.removeItem("ARR"); setItems([])}}>Очистить Таблицу</button>
        </div>
        <h1>Добавить вещь:</h1>
        <div className='add-item'>
          <label>Название вещи</label>
          <input placeholder='Название вещи' value={name} onChange={(event) => {setName(event.target.value)}}/>
          <label>Стоимость вещи</label>
          <input placeholder='¥' value={cost} onChange={(event) => {setCost(event.target.value)}}/>
          <label>Вес вещи</label>
          <input placeholder='g' value={weight} onChange={(event) => {setWeight(event.target.value)}}/>
          <button onClick={() => {addItem();}}>Add</button>
        </div>
        <table className='table' border={'1px'}>
          <caption>Таблица</caption>
          <thead>
            <tr>
              <th>Название</th>
              <th>Стоимость без доставки</th>
              <th>Вес</th>
              <th>Себестоимость</th>
            </tr>
          </thead>
          <tbody>
            {
              items ? 
              items.map((item, iter) => {
                return (
                  <tr key={iter}>
                    <td>{item.name}</td>
                    <td>{item.cost}</td>
                    <td>{item.weight}</td>
                    <td>{item.finallycost}</td>
                  </tr>
                )
              })
              : 'нет данных'
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
