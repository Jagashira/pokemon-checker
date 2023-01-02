import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
interface PokemonType { }

export default function Home() {
  const [search, setSearch] = useState<PokemonType | string | any>("");
  const [ID, setID] = useState<string | number>("");
  const [ChartData, setChartData] = useState({
    labels: ["Thing 1", "Thing 2", "Thing 3", "Thing 4", "Thing 5", "Thing 6"],
    datasets: [
      {
        label: "# of Votes",
        data: [2, 9, 3, 5, 2, 3],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  });
  const handleClick = async () => {
    handleFetch(ID);
  };
  const handleFetch = async (ID: string | number) => {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${ID}`)
      .then((res) => res.json())
      .then((data) => {
        //console.log(JSON.stringify(data, null, 3))
        const stats = data.stats;
        console.log(stats);
        const HP = stats[0].base_stat;
        const attack = stats[1].base_stat;
        const defense = stats[2].base_stat;
        const special_attack = stats[3].base_stat;
        const special_defense = stats[4].base_stat;
        const speed = stats[5].base_stat;
        const name = data.forms[0].name;
        const png = data.sprites.front_default;
        const stats_json = {
          HP,
          attack,
          defense,
          special_attack,
          special_defense,
          speed,
          name
        };
        setSearch(stats_json);
        const chartData = {
          labels: [
            "体力",
            "攻撃",
            "防御",
            "特殊",
            "特防",
            "素早さ",
          ],
          datasets: [
            {
              label: `${ID} ${stats_json.name}`,
              data: [stats_json.HP, stats_json.attack, stats_json.defense, stats_json.special_attack, stats_json.special_defense, stats_json.speed],
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        };
        // @ts-ignore
        setChartData(chartData);

        console.log(stats_json);

        return stats_json;
      });
  };
  // const ChangeID = (e) => {

  // }

  return (
    <>


      <div >


        <div style={{ float: "left", width: "50%" }}><button onClick={handleClick}>検索</button>
          <input
            type="string"
            value={ID}
            onChange={(e) => {
              setID(e.target.value);
            }}
          /><img src={search.png} alt={search.name} /><Radar data={ChartData} /></div>
        <div style={{ float: "right", width: "50%" }}><button onClick={handleClick}>検索</button>
          <input
            type="string"
            value={ID}
            onChange={(e) => {
              setID(e.target.value);
            }}
          /><Radar data={ChartData} /></div>
      </div>
    </>
  );
}
