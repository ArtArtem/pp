import React, {useState} from 'react';
import axios from "axios";
import SortingTable from "../components/SortingTable";

const data = [
  {
    "id": 1,
    "motherBoard": "msi-h510m-a-pro",
    "processor": "intel-core-i7-10700k",
    "videoCard": "msi-geforce-rtx-3060-ventus-2x-12g-oc",
    "ram": "kingston-hx316c10f4",
    "drive": "western-digital-my-passport-4-tb-wdbuax0040b",
    "motherBoardId": "7192",
    "processorId": "1473",
    "videoCardId": "5581",
    "ramId": "1543",
    "driveId": "12480",
    "createdAt": "2023-05-27T13:38:00.907Z",
    "updatedAt": "2023-05-27T13:38:00.907Z"
  }
]

const View = () =>{
  const [saves, setSaves] = useState([])
  const GetSaves = async () => {
    const saves = await axios.get(
      `http://localhost:4000/saves`
    ).then(res => setSaves(res.data));
  }

  return (
    <div>
      <h3>Готовые сборки</h3>
      <button onClick={()=>GetSaves()}>Загрузить сборки</button>
      <SortingTable saves={saves} />
    </div>
  );
}
export default View;
