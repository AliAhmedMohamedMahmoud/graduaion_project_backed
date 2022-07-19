import { useEffect, useState } from 'react'
import {edit, get} from '../../Services/WeightSetting'

export default function WeightSetting(params) {

 
  let[deafultWeight, setdeafultWeight] = useState(0)
  let[deafultCost, setdeafultCost] = useState(0)
  let[exreaCost, setexreaCost] = useState(0)
    function HandeSaveWeight(params) {
        
        edit({
            deafultWeight: +deafultWeight,
            deafultCost: +deafultCost,
            exreaCost: +exreaCost
        })
        alert("saved");
    }

    useEffect(()=>{
        get().then(
            ({data})=>{
                setdeafultWeight(data.deafultWeight);
                setdeafultCost(data.deafultCost);
                setexreaCost(data.exreaCost);
            }
        )
    },
    [])
    return (
        <div className="col-6 m-auto mt-3">
            <div className="form-group">
                <label for="exampleInputEmail1">Deafault Weight</label>
                <input type="number" value={deafultWeight} onChange ={(e)=>{setdeafultWeight(e.target.value)}} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Weight"/>
            </div>

            <div className="form-group">
                <label for="exampleInputEmail1">Deafault Cost</label>
                <input type="number" value={deafultCost} onChange ={(e)=>{setdeafultCost(e.target.value)}} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Cost"/>
            </div>

            <div className="form-group">
                <label for="exampleInputEmail1">Extra Cost</label>
                <input type="number" value={exreaCost} onChange ={(e)=>{setexreaCost(e.target.value)}} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Cost"/>
            </div>

            <button onClick={HandeSaveWeight} class="btn btn-primary">Save</button>
        </div>
    )
}