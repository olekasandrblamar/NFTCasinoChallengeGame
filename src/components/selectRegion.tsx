import React from 'react';
import { regions } from "@/data/regions";

type SelectRegionProps ={
    region: string; 
    setRegion: React.Dispatch<React.SetStateAction<string>>
}

export default function SelectRegion({region, setRegion}: SelectRegionProps) {
  return (
    <div className="flex flex-col w-3/5 mt-5 ml-10">
        <h1>Players &quot;{region}&quot;</h1>
        <select className="h-10 rounded-lg pl-2" value={region} onChange={(e) => setRegion(e.target.value)}>
        {regions.map((region) => (
            <option key={region} value={region}>
            {region}
            </option>
        ))}
        </select>
    </div>
  )
}
