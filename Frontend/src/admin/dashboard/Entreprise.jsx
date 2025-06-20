import esi from "../../assets/ESI.svg";
import store from "../../assets/Store.svg";
import { ResponsiveTree } from "@nivo/tree";

function Entreprise() {
  const data = {
    name: "DG",
    color: "hsl(198, 70%, 50%)",
    children: [
      {
        name: "SG",
        color: "hsl(220, 70%, 50%)",
        children: [
          {
            name: "CPI",
            color: "hsl(240, 70%, 50%)",
            children: [
              {
                name: "Fetitah",
                color: "hsl(260, 70%, 50%)",
              },
              {
                name: "Si Mohammed",
                color: "hsl(280, 70%, 50%)",
              },
            ],
          },
          {
            name: "CS",
            color: "hsl(300, 70%, 50%)",
            children: [
              {
                name: "Kies",
                color: "hsl(320, 70%, 50%)",
              },
              {
                name: "Kechar",
                color: "hsl(340, 70%, 50%)",
              },
            ],
          },
          {
            name: "DED",
            color: "hsl(0, 70%, 50%)",
            children: [
              {
                name: "Amrane",
                color: "hsl(20, 70%, 50%)",
              },
              {
                name: "Benouzzane",
                color: "hsl(40, 70%, 50%)",
              },
            ],
          },
          {
            name: "DRE",
            color: "hsl(60, 70%, 50%)",
            children: [
              {
                name: "Zelmat",
                color: "hsl(80, 70%, 50%)",
              },
            ],
          },
          {
            name: "DFD",
            color: "hsl(100, 70%, 50%)",
            children: [
              {
                name: "Belfrid",
                color: "hsl(120, 70%, 50%)",
              },
            ],
          },
        ],
      },
    ],
  };

  const MyResponsiveTree = ({ data /* see data tab */ }) => (
    <ResponsiveTree
      data={data}
      identity="name"
      activeNodeSize={24}
      inactiveNodeSize={12}
      nodeColor={{ scheme: "tableau10" }}
      fixNodeColorAtDepth={1}
      linkThickness={2}
      activeLinkThickness={8}
      inactiveLinkThickness={2}
      linkColor={{
        from: "target.color",
        modifiers: [["opacity", 0.4]],
      }}
      margin={{ top: 90, right: 90, bottom: 90, left: 90 }}
      motionConfig="stiff"
      meshDetectionRadius={80}
    />
  );
  return (
    <div className="bg-white h-[400px] w-[1000px] rounded-3xl flex flex-col items-center gap-2">
      <MyResponsiveTree data={data} />
    </div>
  );
}

export default Entreprise;
